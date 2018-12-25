export default interface IGitHubSearchState {
    searchTerm: string,
    results: IGitHubResult[],
    resultsHeaderMessage: string
}

export interface IGitHubResult {
    username: string,
    url: string 
}
