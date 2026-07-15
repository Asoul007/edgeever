import { expect, test } from "bun:test";

import { resolveGitHubRepositoryMetadata } from "../scripts/github-repository-metadata.mjs";

test("Workers Builds setup uses configured GitHub IDs without an API request", async () => {
  let requested = false;
  const metadata = await resolveGitHubRepositoryMetadata({
    owner: "Asoul007",
    repository: "edgeever",
    ownerId: "57949265",
    repositoryId: "1301246855",
    fetchImpl: async () => {
      requested = true;
      throw new Error("GitHub API should not be called");
    },
  });

  expect(requested).toBe(false);
  expect(metadata).toEqual({
    id: "1301246855",
    name: "edgeever",
    owner: { id: "57949265", login: "Asoul007" },
  });
});
