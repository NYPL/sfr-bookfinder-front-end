import React from "react";
import { ApiSearchQuery } from "~/src/types/SearchQuery";
import Link from "~/src/components/Link/Link";
import { Agent } from "~/src/types/DataModel";

const AuthorsList: React.FC<{ authors: Agent[] }> = ({ authors }) => {
  if (!authors || authors.length === 0) return undefined;

  return (
    <>
      {authors.map((author: Agent, i: number) => {
        const authorLinkText = author.name;
        const query: ApiSearchQuery = {
          query: author.viaf ? `viaf:${author.viaf}` : `author:${author.name}`,
        };
        if (author.viaf) {
          query.display = `author:${author.name}`;
        }
        return (
          <React.Fragment
            key={
              author.viaf ? `author-${author.viaf}` : `author-${author.name}`
            }
          >
            <Link
              to={{
                pathname: "/search",
                query: query,
              }}
              className="link"
            >
              {authorLinkText}
            </Link>
            {i < authors.length - 1 && ", "}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default AuthorsList;
