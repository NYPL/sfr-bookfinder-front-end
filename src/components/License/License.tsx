/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import * as DS from "@nypl/design-system-react-components";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

type OwnProps = {
  location?: {
    [key: string]: any;
  };
};

type Props = OwnProps & typeof License.defaultProps;

class License extends React.Component<Props> {
  static defaultProps = {
    location: {},
  };

  static contextTypes = {
    router: PropTypes.objectOf(PropTypes.any),
  };

  // componentDidMount() {
  //   global.window.scrollTo(0, 0);
  // }

  render() {
    const { router } = this.context;

    return (
      <div className="layout-container">
        <main id="mainContent" className="main">
          <div className="content-header">
            <Breadcrumbs router={router} location={this.props.location} />
          </div>

          <div className="content-primary">
            <DS.Heading
              level={1}
              id="page-title-heading"
              blockName="page-title"
              text="License Explanations"
            />

            <h2 id="pd">Public Domain</h2>

            <p>
              Works in the public domain have no copyright (in most cases
              because the copyright term has expired) and you are free to use,
              adapt, share, and distribute the work in any way you wish.
            </p>

            <h2 id="pd_us">Public Domain (US Only)</h2>

            <p>
              Works may be in the public domain in the Unites States (where you
              can use and distribute them without restriction), but still
              subject to copyright laws and restrictions outside the United
              States.
            </p>

            <h2 id="cc">Creative Commons Licenses</h2>

            <p>
              <DS.Link href="https://creativecommons.org/">
                Creative Commons licenses
              </DS.Link>{" "}
              allow rights-holders to grant people the right to freely use their
              creations in certain ways and perhaps by meeting certain
              requirements. There are several licenses with different
              combinations of four basic clauses:
            </p>

            <dl>
              <dt>BY</dt>

              <dd>
                Attribution — You must give appropriate credit, provide a link
                to the license, and indicate if changes were made. You may do so
                in any reasonable manner, but not in any way that suggests the
                licensor endorses you or your use.
              </dd>

              <dt>NC</dt>

              <dd>
                NonCommercial — You may not use the material for commercial
                purposes.{" "}
              </dd>

              <dt>ND</dt>

              <dd>
                NoDerivatives — If you remix, transform, or build upon the
                material, you may not distribute the modified material.
              </dd>

              <dt>SA</dt>

              <dd>
                ShareAlike — If you remix, transform, or build upon the
                material, you must distribute your contributions under the same
                license as the original.
              </dd>
            </dl>

            <p>
              The following Creative Commons licenses are applied to materials
              in Digital Research Books Beta. Refer to linked license
              descriptions for specifics:
            </p>

            <ul>
              <li>
                <DS.Link href="https://creativecommons.org/licenses/by/3.0/">
                  Attribution 3.0 Unported (CC BY 3.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by/4.0/">
                  Attribution 4.0 International (CC BY 4.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-sa/3.0/">
                  Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-sa/4.0/">
                  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nd/3.0/">
                  Attribution-NoDerivs 3.0 Unported (CC BY-ND 3.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nd/4.0/">
                  Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nc/4.0/">
                  Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nc-sa/3.0/">
                  Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA
                  3.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                  Attribution-NonCommercial-ShareAlike 4.0 International (CC
                  BY-NC-SA 4.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nc-nd/3.0/">
                  Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND
                  3.0)
                </DS.Link>
              </li>

              <li>
                <DS.Link href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  Attribution-NonCommercial-NoDerivatives 4.0 International (CC
                  BY-NC-ND 4.0)
                </DS.Link>
              </li>
            </ul>

            <h2>CC0 Public Domain Dedication</h2>

            <p>
              The{" "}
              <DS.Link href="https://creativecommons.org/publicdomain/zero/1.0/">
                CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
              </DS.Link>{" "}
              waives all rights under worldwide copyright law. It allows you to
              use, adapt, share, and distribute the work as if it were in the
              Public domain.
            </p>

            <h2>GNU General Public License</h2>

            <p>
              For a work licensed under the{" "}
              <DS.Link href="http://www.gnu.org/licenses/gpl.html">
                GNU General Public License
              </DS.Link>
              , you may copy, distribute and modify the work as long as any
              modifications are also made available under the GPL.
            </p>
          </div>
        </main>
      </div>
    );
  }
}

export default License;
