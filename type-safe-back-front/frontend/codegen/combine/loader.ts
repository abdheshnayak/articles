import fs from "fs";

import { DocumentNode, print } from "graphql";

export const loader = (
  handler: () => {
    [key: string]: {
      Query(): DocumentNode;
    };
  },
  prefix: string,
) => {
  const gqlQueries = handler();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updatedQueries: { [name: string]: DocumentNode } = {};
  const entries: any = Object.entries(gqlQueries);

  for (let i = 0; i < entries.length; i += 1) {
    const key = entries[i][0];
    const query: DocumentNode = entries[i][1].Query();

    // @ts-ignore
    query.definitions[0].name.value = `${prefix}${capitalize(key)}`;
    updatedQueries[key] = query;
  }

  const values = Object.values(updatedQueries);
  const resp = values.map((v) => {
    return print(v);
  });

  return resp.join("\n\n");
};

export const ensureDirectoryExistence = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const docPath = "generated/gql";
