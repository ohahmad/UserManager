export default interface IGitHubSearchState {
    searchTerm: string,
    results: IGitHubResult[]
}

export interface IGitHubResult {
    username: string,
    url: string 
}
