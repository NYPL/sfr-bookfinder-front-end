#!/usr/bin/env python
#==============================================================================
# Copyright 2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Amazon Software License (the "License"). You may not use
# this file except in compliance with the License. A copy of the License is
# located at
#
#       http://aws.amazon.com/asl/
#
# or in the "license" file accompanying this file. This file is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or
# implied. See the License for the specific language governing permissions
# and limitations under the License.
#==============================================================================

#
# NYPL NOTE
# This file has been modified to patch issue with npm modules that output
# non-UTF-8 characters during installation.
# See lines starting at 167 and remove calls to stdout=devnull to restore.

from __future__ import with_statement
from optparse import OptionParser
from subprocess import check_call, Popen, PIPE

import os
import re
import sys
import shutil
import os.path
import ebconfig
import glob
import ast
import datetime

try:
    import simplejson as json
except ImportError:
    import json

config_manager = ebconfig.ConfigManager()

NODE_PROXY_PORT = config_manager.get_container_config('nodejs_proxy_port')
NODE_STANDALONE_PORT = config_manager.get_container_config('nodejs_standalone_port')
DEFAULT_HOMEPATH = config_manager.get_container_config('app_user_home')     # Home path of nodejs user

CONFIG_STAGING_DIR = config_manager.get_container_config('config_staging_dir')
APP_STAGING_DIR = config_manager.get_container_config('app_staging_dir')
APP_DEPLOY_DIR = config_manager.get_container_config('app_deploy_dir')

def error_exit(msg):
    print >> sys.stderr, msg
    exit(1)

def check_output(args):
    p1 = Popen(args, stdout=PIPE)
    (stdout, stderr) = p1.communicate()
    if p1.returncode:
        raise Exception('Failed to run command: %s' % stderr)
    else:
        return stdout


def write_event(msg, severity=None):
    print msg
    event = {'msg': msg}
    if severity:
        event['severity'] = severity

    if not 'EB_EVENT_FILE' in os.environ:
        print >> sys.stderr, 'No environment variable EB_EVENT_FILE found. Writing message to stderr.'
        print >> sys.stderr, 'Msg: %s' % event['msg']
    else:
        with open(os.environ['EB_EVENT_FILE'], 'a') as f:
            f.write(json.dumps(event))
            f.write('\n---\n')

def is_healthd_enabled():
    return os.path.exists('/etc/healthd/')

class NodeVersionManager():
    NODE_PACKAGE_NAME='node-v%s-linux-%s.tar.gz'

    def __init__(self, config_manager):
        self.config_manager = config_manager
        self.node_install_path = self.config_manager.get_container_config('nodejs_install_dir')


    def setup_iptables(self):
        instance_port = self.config_manager.get_container_config('instance_port')
        server_port = self.config_manager.get_container_config('server_port')

        check_output(['/sbin/iptables', '-t', 'nat', '-A', 'PREROUTING', '-i', 'eth0', '-p', 'tcp', '--dport', instance_port, '-j', 'REDIRECT', '--to-port', server_port])
        check_output(['/sbin/iptables', '-t', 'nat', '-A', 'OUTPUT', '-o', 'lo', '-p', 'tcp', '--dport', instance_port, '-j', 'REDIRECT', '--to-port', server_port])
        check_output(['/sbin/service', 'iptables', 'save'])

    def setup_node(self):
        version = self.get_desired_version()
        try:
            if not self.is_version_installed(version):
                print 'Selected node version %s is not installed. Installing.' % version
                self.install_node(version)
        except Exception, e:
            write_event('Encountered an error installing node version %s. Snapshot logs for more details.' % version, 'ERROR')
            raise e

    def is_version_installed(self, version):
        return self.get_version_path(version) is not None

    def get_version_path(self, version):
        path = glob.glob(os.path.join(self.node_install_path, 'node-v%s*' % version))
        return None if len(path) == 0 else path[0]

    def is_64bit(self):
        return sys.maxsize > 2**32

    def install_node(self, version):
        lib_url = self.config_manager.get_container_config('nodejs_download_url')
        arch = 'x64' if self.is_64bit() else 'x86'
        download_url = lib_url + NodeVersionManager.NODE_PACKAGE_NAME % (version, arch)
        download_file = os.path.join(self.node_install_path, 'node.tar.gz')

        print 'Installing version from', download_url
        check_output(['/usr/bin/curl', download_url, '-o', download_file])
        file_format = check_output(['file', download_file])
        if file_format.startswith(str.format("{0}: gzip compressed data", download_file)):
            check_output(['tar', '-xvzpf', download_file, '-C', self.node_install_path])
        else:
            raise RuntimeError(str.format("invalid download url: {0}", download_url))

    def get_desired_version(self):
        return self.config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs', 'NodeVersion')

    def get_desired_version_path(self):
        return self.get_version_path(self.get_desired_version())

    def get_node_bin_path(self):
        return os.path.join(self.get_desired_version_path(), 'bin')

    def run_npm_install(self, app_path):
        bin_path = self.get_node_bin_path()
        self.npm_install(bin_path, self.config_manager.get_container_config('app_staging_dir'))

    def npm_install(self, bin_path, app_path):
        if not os.path.exists(os.path.join(app_path, 'package.json')):
            print 'No package.json found, skipping npm install.'
            return

        npm_path = os.path.join(self, bin_path, 'npm')
        print 'Running npm install: ', npm_path
        try:
            npm_env = os.environ.copy()
            npm_env['HOME'] = DEFAULT_HOMEPATH   # add $HOME for npm packages
            npm_env['PATH'] = bin_path + ':' + npm_env['PATH']
            user_env = self.config_manager.get_user_env()
            npm_env.update(user_env)    # allow customer to override

            print 'Setting npm config jobs to 1'
            check_call("PATH=" + bin_path + ":$PATH" + " " + npm_path + " config set jobs 1", shell=True)
            print 'npm config jobs set to 1'

            if 'NPM_USE_PRODUCTION' not in npm_env:
                npm_env['NPM_USE_PRODUCTION'] = 'true'

            if npm_env['NPM_USE_PRODUCTION'] == 'true':
                print 'Running npm with --production flag'
                with (os.devnull, 'w') as devnull:
                    check_call([npm_path, '--production', 'install'], cwd=app_path, env=npm_env, stdout=devnull)
                    check_call([npm_path, '--production', 'rebuild'], cwd=app_path, env=npm_env, stdout=devnull)
            else:
                print 'Running npm without --production flag'
                with (os.devnull, 'w') as devnull:
                    check_call([npm_path, 'install'], cwd=app_path, env=npm_env, stdout=devnull)
                    check_call([npm_path, 'rebuild'], cwd=app_path, env=npm_env, stdout=devnull)

        except Exception, e:
            npm_debug_log = '/var/log/nodejs/npm-debug.log'
            app_npm_debug_log = os.path.join(app_path, "npm-debug.log")
            write_event('Failed to run npm install. Snapshot logs for more details.', 'ERROR')
            if not os.path.exists(app_npm_debug_log):
                utc_time_str = datetime.datetime.utcnow().strftime("UTC %Y/%m/%d %H:%M:%S")
                err_msg = str.format("{0} cannot find application npm debug log at {1} \n", utc_time_str, app_npm_debug_log)
                print(err_msg)
                with open(npm_debug_log, 'a') as f:
                    f.write(err_msg)
            else:
                shutil.copyfile(app_npm_debug_log, npm_debug_log)
            raise e


class UpstartManager(object):
    UPSTART_CONFIG_PATH='/etc/init'
    UPSTART_CONF_BASE="""
# {job_name} - {description}
#

description "{description}"
stop on runlevel [!2345]

respawn
respawn limit 30 60
{exec_line}
chdir {pwd}


# Environment Variables
{environment_vars}

"""

    def __init__(self, job_name, description, config_manager, staging_path):
        self.job_name = job_name
        self.description = description
        self.config_manager = config_manager
        self.staging_path = staging_path

    def generate_configuration(self):
        file_path = os.path.join(UpstartManager.UPSTART_CONFIG_PATH, '%s.conf' % self.job_name)
        file_path = re.sub('/', '#', file_path)

        with open(os.path.join(self.staging_path, file_path), 'w') as out_file:
            out_file.write(self.generate_config_contents())

    def generate_config_contents(self):
        """Generate the contents of the upstart file. """
        upstart_contents = UpstartManager.UPSTART_CONF_BASE
        environment_vars = self.get_process_env()
        upstart_contents = upstart_contents.format(job_name=self.job_name, description=self.description,
            exec_line=self.exec_line, pwd=self.pwd, environment_vars=environment_vars)

        return upstart_contents

    def start(self):
        check_call(['/sbin/initctl', 'reload-configuration'])
        try:
            status_line = check_output(['/sbin/status', self.job_name])
        except Exception, e:
            print 'Failed to find status of job.'
            raise e

        if 'start/running' in status_line:
            print 'Job already running. Not starting again.'
        else:
            try:
                check_call(['/sbin/start', self.job_name])
            except Exception, e:
                print 'Failed to start job.'
                raise e

    def is_stopped(self):
        try:
            status_line = check_output(['/sbin/status', self.job_name])
        except Exception, e:
            print 'Did not find to find status of init job. Assuming stopped.'
            return True

        if 'stop/waiting' in status_line:
            print 'Job already stopped. Not stopping again.'
            return True
        else:
            return False

    def stop(self):
        check_call(['/sbin/initctl', 'reload-configuration'])
        if not self.is_stopped():
            try:
                check_call(['/sbin/stop', self.job_name])
            except Exception, e:
                print 'Failed to stop job. Checking status'

        if not self.is_stopped():
            try:
                check_call(['/sbin/stop', self.job_name])
            except Exception, e:
                print 'Failed to stop job on second pass. Aborting.'
                raise e

class NodeUpstartManager(UpstartManager):

    EXEC_LINE = """
script
    echo $$ > /var/run/nodejs.pid
    if [ -f /etc/elasticbeanstalk/set-ulimit.sh ]; then
        . /etc/elasticbeanstalk/set-ulimit.sh
    fi
    exec su -s /bin/sh -c 'PATH=$PATH:$NODE_HOME/bin $EB_NODE_COMMAND 2>&1' nodejs >> /var/log/nodejs/nodejs.log
end script

post-stop script
if /usr/bin/pgrep -u nodejs; then
/usr/bin/pgrep -u nodejs | /usr/bin/xargs kill -9
fi
end script
"""

    def __init__(self, job_name, description, config_manager, node_version_manager,
                staging_path, port, app_staging_dir):
        super(NodeUpstartManager, self).__init__(job_name, description, config_manager, staging_path)
        self.node_version_manager = node_version_manager
        self.exec_line = NodeUpstartManager.EXEC_LINE
        self.pwd = self.config_manager.get_container_config('app_deploy_dir')
        self.port = port
        self.app_staging_dir = app_staging_dir

    def get_process_env(self):
        env = self.config_manager.get_user_env()
        env['PORT'] = self.port
        env['NODE_HOME'] = self.node_version_manager.get_desired_version_path()
        if 'HOME' not in env:
            env['HOME'] = DEFAULT_HOMEPATH   # add $HOME if not exists
        env['EB_NODE_COMMAND'] = self.config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs', 'NodeCommand')
        if not env['EB_NODE_COMMAND']:
            if os.path.exists(os.path.join(self.app_staging_dir, 'app.js')):
                env['EB_NODE_COMMAND'] = 'node app.js'
            elif os.path.exists(os.path.join(self.app_staging_dir, 'server.js')):
                env['EB_NODE_COMMAND'] = 'node server.js'
            else:
                env['EB_NODE_COMMAND'] = 'npm start'
                package_json_location = os.path.join(self.app_staging_dir, 'package.json')
                if os.path.exists(package_json_location):
                    try:
                        with open(package_json_location) as f:
                            package_json = json.loads(f.read())
                            if 'scripts' not in package_json \
                                    or 'start' not in package_json['scripts']:
                                write_event('No start scripts located in package.json. Node.js may have issues starting. Add start scripts or place code in a file named server.js or app.js.', 'ERROR')
                    except:
                        write_event('Failed to parse package.json. Node.js may have issues starting. Verify package.json is valid or place code in a file named server.js or app.js.', 'ERROR')
                else:
                    write_event('Failed to find package.json. Node.js may have issues starting. Verify package.json is valid or place code in a file named server.js or app.js.', 'ERROR')

        environment_vars = ""
        for (key, value) in env.iteritems():
            environment_vars += 'env %s="%s"\n' % (key, value)
        return environment_vars

class NginxUpstartManager(UpstartManager):

    EXEC_LINE = """
script
    if [ -f /etc/elasticbeanstalk/set-ulimit.sh ]; then
        . /etc/elasticbeanstalk/set-ulimit.sh
    fi
    exec /usr/sbin/nginx -c /etc/nginx/nginx.conf -g "daemon off;" 2>&1 >> /var/log/nginx/error.log
end script

pre-start script
if /usr/bin/pgrep nginx; then
  /usr/bin/pgrep nginx | /usr/bin/xargs kill -9
fi
end script

post-stop script
if /usr/bin/pgrep nginx; then
  /usr/bin/pgrep nginx | /usr/bin/xargs kill -9
fi
end script
"""

    def __init__(self, job_name, description, config_manager, node_version_manager, staging_path):
        super(NginxUpstartManager, self).__init__(job_name, description, config_manager, staging_path)
        self.node_version_manager = node_version_manager
        self.exec_line = NginxUpstartManager.EXEC_LINE
        self.pwd = self.config_manager.get_container_config('app_deploy_dir')

    def get_process_env(self):
        env = self.config_manager.get_user_env()
        env['NODE_HOME'] = self.node_version_manager.get_desired_version_path()

        environment_vars = ""
        for (key, value) in env.iteritems():
           environment_vars += 'env %s="%s"\n' % (key, value)
        return environment_vars


class ApacheUpstartManager(UpstartManager):
    EXEC_LINE = """
script
    if [ -f /etc/elasticbeanstalk/set-ulimit.sh ]; then
        . /etc/elasticbeanstalk/set-ulimit.sh
    fi
    exec /usr/sbin/httpd -DFOREGROUND 2>&1 >> /var/log/httpd/error_log
end script
pre-start script
if /usr/bin/pgrep httpd; then
  /usr/bin/pgrep httpd | /usr/bin/xargs kill -9
fi
end script

post-stop script
if /usr/bin/pgrep httpd; then
  /usr/bin/pgrep httpd | /usr/bin/xargs kill -9
fi
end script
"""

    def __init__(self, job_name, description, config_manager, node_version_manager, base_path):
        super(ApacheUpstartManager, self).__init__(job_name, description, config_manager, base_path)
        self.node_version_manager = node_version_manager
        self.exec_line = ApacheUpstartManager.EXEC_LINE
        self.pwd = self.config_manager.get_container_config('app_deploy_dir')

    def get_process_env(self):
        env = self.config_manager.get_user_env()
        env['NODE_HOME'] = self.node_version_manager.get_desired_version_path()

        environment_vars = ""
        for (key, value) in env.iteritems():
           environment_vars += 'env %s="%s"\n' % (key, value)
        return environment_vars


class ProxyManager(object):

    EB_MARKER='# Elastic Beanstalk Managed'

    def __init__(self, static_files, staging_dir, port=8080):
        self.static_files = static_files
        self.staging_dir = staging_dir
        self.port = port
        self.eb_marker = ProxyManager.EB_MARKER

    def generate_configuration(self):
        self.process_main_config()
        self.process_proxy_config()
        self.process_healthd_log_config() # only needed for apache right now

    def process_main_config(self):
        print 'Generating modifications to %s' % self.main_config_path
        with open(self.main_config_path) as f:
            contents = f.read()
        contents = self.process_main_contents(contents)
                self.write_staging_file(self.main_config_path, contents)

    def process_proxy_config(self):
        print 'Generating reverse proxy settings'
        contents = self.generate_eb_proxy_config()
        filename = os.path.join(self.proxy_config_path)
        self.write_staging_file(filename, contents)

    def process_main_contents(self, contents):
        pass

    def process_healthd_log_config(self):
        pass

    def get_mod_line(self, result, name):
        return '# Elastic Beanstalk Modification(%s)\n%s\n# End Modification\n' % (name, result)

    def generate_eb_proxy_config(self):
        proxy_config = self.proxy_contents
        mappings = self.static_files
        mappings_str = ''
        if mappings:
            for a_map in mappings:
                (key, sep, value) = a_map.partition('=')
                if len(key) > 0 and len(value) > 0:
                    mappings_str += self.mapping_entry.format(map_key=key,
                            map_value=value, app_base=APP_DEPLOY_DIR) + "\n"
        proxy_config = proxy_config.format(mappings=mappings_str, port=self.port, gzip=self.gzip_entry)
        return proxy_config

    def write_staging_file(self, filename, contents):
        if self.eb_marker not in contents:
            contents = '%s\n%s\n%s' % (self.eb_marker, self.eb_banner, contents)
        filename = re.sub('/', '#', filename)
        path = os.path.join(self.staging_dir, filename)
        with open(path, 'w') as out_file:
            out_file.write(contents)


class NginxProxyManager(ProxyManager):

    MAIN_CONFIG_PATH='/etc/nginx/nginx.conf'
    PROXY_CONFIG_PATH = '/etc/nginx/conf.d/00_elastic_beanstalk_proxy.conf'

    GZIP_ENTRY="""
gzip on;
gzip_comp_level 4;
gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
"""


    EB_BANNER="""
# Elastic Beanstalk managed configuration file
# Some configuration of nginx can be by placing files in /etc/nginx/conf.d
# using Configuration Files.
# http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/customize-containers.html 
# 
# Modifications of nginx.conf can be performed using container_commands to modify the staged version
# located in /tmp/deployment/config/etc#nginx#nginx.conf
"""

    MAPPING_ENTRY="""
location {map_key} {{
    alias {app_base}{map_value};
}}
"""
    PROXY_CONTENTS_TEMPLATE="""
upstream nodejs {{
    server 127.0.0.1:8081;
    keepalive 256;
}}

server {{
    listen {port};

    HEALTHD_SERVER_SNIPPET

    location / {{
        proxy_pass  http://nodejs;
        proxy_set_header   Connection "";
        proxy_http_version 1.1;
        proxy_set_header        Host            $host;
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    }}
    {gzip} 
    {mappings}
}}
"""
    HEALTHD_SERVER_SNIPPET="""
    if ($time_iso8601 ~ "^(\d{{4}})-(\d{{2}})-(\d{{2}})T(\d{{2}})") {{
        set $year $1;
        set $month $2;
        set $day $3;
        set $hour $4;
    }}
    access_log /var/log/nginx/healthd/application.log.$year-$month-$day-$hour healthd;
    access_log  /var/log/nginx/access.log  main;
"""

    HEALTHD_LOGGING_FORMAT="""
    log_format healthd '$msec"$uri"'
                       '$status"$request_time"$upstream_response_time"'
                       '$http_x_forwarded_for';
"""

    def __init__(self, static_files, staging_dir, gzip, port=8080):
        super(NginxProxyManager, self).__init__(static_files, staging_dir, port)

        NginxProxyManager.PROXY_CONTENTS = NginxProxyManager.PROXY_CONTENTS_TEMPLATE.replace("HEALTHD_SERVER_SNIPPET", '')
        NginxProxyManager.HEALTHD_BASED_PROXY_CONTENTS = NginxProxyManager.PROXY_CONTENTS_TEMPLATE.replace("HEALTHD_SERVER_SNIPPET", NginxProxyManager.HEALTHD_SERVER_SNIPPET)

        self.eb_banner = NginxProxyManager.EB_BANNER
        self.main_config_path = NginxProxyManager.MAIN_CONFIG_PATH
        self.proxy_config_path = NginxProxyManager.PROXY_CONFIG_PATH
        self.mapping_entry = NginxProxyManager.MAPPING_ENTRY

        if is_healthd_enabled():
            self.proxy_contents = NginxProxyManager.HEALTHD_BASED_PROXY_CONTENTS
        else:
            self.proxy_contents = NginxProxyManager.PROXY_CONTENTS

        if 'true' == gzip:
            self.gzip_entry = NginxProxyManager.GZIP_ENTRY
        else:
            self.gzip_entry = ''

    def process_main_contents(self, contents):
        if 'EB_LISTENER' not in contents:
            listen_regex = re.compile(r'^(\s*)listen(\s+)80;(\s*)$', re.MULTILINE)
            contents = listen_regex.sub(self.get_mod_line(r'\1listen\2 %s;\3' % self.port, 'EB_LISTENER'), contents)
        if 'EB_INCLUDE' not in contents:
            # insert this after keepalive timeout so that include *.conf happens after all log_formats have been defined
            include_regex = re.compile(r'(^\s*keepalive_timeout(\s+)[0-9]*;\s*$)', re.MULTILINE)
            # insert healthd logging format always as it is harmless
            contents = include_regex.sub(r'\1 \n' + self.get_mod_line(NginxProxyManager.HEALTHD_LOGGING_FORMAT + '\ninclude /etc/nginx/conf.d/*.conf;', 'EB_INCLUDE'), contents)
        return contents

class ApacheProxyManager(ProxyManager):

    MAIN_CONFIG_PATH='/etc/httpd/conf/httpd.conf'
    PROXY_CONFIG_PATH='/etc/httpd/conf.d/00_elastic_beanstalk_proxy.conf'
    HEALTHD_CONFIG_PATH='/etc/httpd/conf.d/01_elastic_beanstalk_healthd.conf'
    GZIP_ENTRY='AddOutputFilterByType DEFLATE text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript'

    EB_BANNER="""
# Elastic Beanstalk managed configuration file
# Some configuration of httpd can be by placing files in /etc/httpd/conf.d/
# using Configuration Files.
# http://docs.amazonwebservices.com/elasticbeanstalk/latest/dg/customize-containers.html 
# 
# Modifications of httpd.conf can be performed using container_commands to modify the staged version
# located in /tmp/deployment/config/etc#httpd#conf#httpd.conf
"""


    PROXY_CONTENTS=r'''
Listen {port}
{gzip}
{mappings}
ProxyPass / http://127.0.0.1:8081/
ProxyPassReverse / http://127.0.0.1:8081/
ProxyPreserveHost On

LogFormat "%h (%{{X-Forwarded-For}}i) %l %u %t \"%r\" %>s %b \"%{{Referer}}i\" \"%{{User-Agent}}i\"" combined
'''

    MAPPING_ENTRY="""
ProxyPass {map_key} !
Alias {map_key} {app_base}{map_value}
<Directory {app_base}{map_value}>
  Require all granted
</Directory>
"""

    HEALTHD_CONFIG_CONTENTS="""
LogFormat "%{%s}t\\"%U\\"%s\\"%D\\"%D\\"%{X-Forwarded-For}i" healthd
CustomLog "|/usr/sbin/rotatelogs /var/log/httpd/healthd/application.log.%Y-%m-%d-%H 3600" healthd
"""

    def __init__(self, static_files, staging_dir, gzip, port=8080):
        super(ApacheProxyManager, self).__init__(static_files, staging_dir, port)
        self.eb_banner = ApacheProxyManager.EB_BANNER
        self.main_config_path = ApacheProxyManager.MAIN_CONFIG_PATH
        self.proxy_config_path = ApacheProxyManager.PROXY_CONFIG_PATH
        self.mapping_entry = ApacheProxyManager.MAPPING_ENTRY
        self.proxy_contents = ApacheProxyManager.PROXY_CONTENTS
        if 'true' == gzip:
            self.gzip_entry = ApacheProxyManager.GZIP_ENTRY
        else:
            self.gzip_entry = ''

    def process_main_contents(self, contents):
        if 'EB_LISTENER' not in contents:
            listen_regex = re.compile('^(\s*)Listen 80(\s*)$', re.MULTILINE)
            contents = listen_regex.sub(self.get_mod_line(r'\1#Listen 80\2', 'EB_LISTENER'), contents)
        # TODO: Performance improvements
        return contents

    def process_healthd_log_config(self):
        self.write_staging_file(ApacheProxyManager.HEALTHD_CONFIG_PATH, ApacheProxyManager.HEALTHD_CONFIG_CONTENTS)

def get_nodejs_manager(config_manager, node_version_manager, port, staging_dir, app_dir):
    return NodeUpstartManager('nodejs', 'Nodejs server', config_manager,
            node_version_manager, staging_dir, port, app_dir)

def get_nginx_managers(config_manager, node_version_manager, staging_dir):
    static_files = ast.literal_eval(config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs:staticfiles','NodeStaticFiles'))
    gzip = config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs', 'GzipCompression')
    return (NginxUpstartManager('nginx', 'Nginx server', config_manager, node_version_manager, staging_dir),
        NginxProxyManager(static_files, staging_dir, gzip))

def get_apache_managers(config_manager, node_version_manager, staging_dir):
    static_files = ast.literal_eval(config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs:staticfiles','NodeStaticFiles'))
    gzip = config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs', 'GzipCompression')
    return (ApacheUpstartManager('httpd', 'Apache server', config_manager, node_version_manager, staging_dir),
        ApacheProxyManager(static_files, staging_dir, gzip))


def main():
    parser = OptionParser()
    parser.add_option('--action')
    parser.add_option('--app-path', default=APP_STAGING_DIR)
    parser.add_option('--config-path', default=CONFIG_STAGING_DIR)
    (options, args) = parser.parse_args()

    if options.action is None:
        parser.print_usage()
        error_exit('Action is required.')

    config_manager = ebconfig.ConfigManager()
    node_version_manager = NodeVersionManager(config_manager)
    proxy_type = config_manager.get_optionsetting('aws:elasticbeanstalk:container:nodejs','ProxyServer')

    node_port = NODE_STANDALONE_PORT if (proxy_type == 'none' or proxy_type == 'false') else NODE_PROXY_PORT

    nodejs_upstart = get_nodejs_manager(config_manager, node_version_manager, node_port, options.config_path, options.app_path)
    (nginx_upstart, nginx_proxy) = get_nginx_managers(config_manager, node_version_manager, options.config_path)
    (apache_upstart, apache_proxy) = get_apache_managers(config_manager, node_version_manager, options.config_path)

    if proxy_type.lower() == 'nginx':
        (proxy_upstart, proxy_manager) = (nginx_upstart, nginx_proxy)
    elif proxy_type.lower() == 'apache':
        (proxy_upstart, proxy_manager) = (apache_upstart, apache_proxy)
    else:
        (proxy_upstart, proxy_manager) = (None, None)
        print 'Not using a reverse proxy'
    if options.action == 'iptables-install':
        node_version_manager.setup_iptables()
    elif options.action == 'node-install':
        node_version_manager.setup_node()
    elif options.action == 'npm-install':
        node_version_manager.run_npm_install(options.app_path)
    elif options.action == 'start-all':
        nodejs_upstart.start()
        if proxy_upstart:
            proxy_upstart.start()
    elif options.action == 'stop-all':
        nodejs_upstart.stop()
        # Need to stop all proxy manager in case the proxy config is changing
        nginx_upstart.stop()
        apache_upstart.stop()
    elif options.action == 'generate-config':
        nodejs_upstart.generate_configuration()
        if proxy_upstart:
            proxy_upstart.generate_configuration()
        if proxy_manager:
            proxy_manager.generate_configuration()

if __name__=='__main__':
    main()
