export default interface IGithubSearchProps {
    searchTerm: string,
    onRepositoryUrlSelected: (repositoryUrl: string, repositoryAvatarUrl: string) => void
}
