export default interface IGithubSearchProps {
    searchTerm: string,
    onRepositoryUrlSelected: (repositoryUrl: string) => void
}
