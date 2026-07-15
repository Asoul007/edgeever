export const resolveGitHubRepositoryMetadata = async ({
  owner,
  repository,
  ownerId,
  repositoryId,
  fetchImpl = fetch,
}) => {
  if (ownerId && repositoryId) {
    return {
      id: repositoryId,
      name: repository,
      owner: { id: ownerId, login: owner },
    };
  }

  const response = await fetchImpl(`https://api.github.com/repos/${owner}/${repository}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  const metadata = await response.json().catch(() => ({}));
  if (!response.ok || !metadata.id || !metadata.owner?.id) {
    throw new Error(
      `Cannot read GitHub repository ${owner}/${repository}. Set EDGE_EVER_GITHUB_REPOSITORY_ID and EDGE_EVER_GITHUB_OWNER_ID, or run this command through an authenticated Agent.`,
    );
  }
  return metadata;
};
