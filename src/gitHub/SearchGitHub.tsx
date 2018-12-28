import React, { Component } from 'react';
import IGithubSearchProps from './interface/IGitHubSearchProps';
import IGitHubSearchState, {IGitHubResult} from './interface/IGithubSearchState';
import './SearchGitHub.scss'

interface IGitHubApiResponse {
    total_count: number,
    incomplete_results: boolean,
    items: [{
        login: string,
        html_url: string
    }]
}

export default class SearchGitHub extends Component<IGithubSearchProps, IGitHubSearchState> {
    private static minimumCharRequiredToSearch = 4;

    constructor(props: IGithubSearchProps) {
        super(props);
        this.state = {
            results: [],
            searchTerm: "",
            resultsHeaderMessage: ""
        };    
    }

    private async search(searchTerm: string) : Promise<void> {
        if(!this.isApplicableToDisplayResults(searchTerm)) {
            return;
        }
        
        const response = await fetch("https://api.github.com/search/users?q=" + searchTerm);
        const data: IGitHubApiResponse = await response.json();
        const results = data.items.map(result => {
            return {
                username: result.login,
                url: result.html_url
            } as IGitHubResult;            
        });

        this.setState({
            results: results,
            resultsHeaderMessage: results.length > 0 ? "Please select a user from below" : "Sorry - no user found match your search"
        });
    }

    public static getDerivedStateFromProps(nextProps: IGithubSearchProps, prevState: IGitHubSearchState)  : IGitHubSearchState {
        if(nextProps.searchTerm !== prevState.searchTerm) {
            return {
                results: [],
                searchTerm: nextProps.searchTerm,
                resultsHeaderMessage: ""
            }
        }

        return prevState;
    }

    public componentDidUpdate(previousProps: IGithubSearchProps, prevState: IGitHubSearchState) {
        if(this.state.searchTerm !== prevState.searchTerm) {
            this.search(this.state.searchTerm);
        }
    }

    private isApplicableToDisplayResults(searchTerm: string) {
        return searchTerm.length >= SearchGitHub.minimumCharRequiredToSearch && 
        !searchTerm.startsWith("http")
    }

    public render() {
        const results = this.state.results.map((result, index )=> {
          return <div key={index} 
                    className="searchGitHub-resultItem" 
                    onClick={ () => this.props.onRepositoryUrlSelected(result.url) }>
                    <div className="searchGitHub-resultItemName">User: {result.username}</div>    
                    <div className="searchGitHub-resultItemUrl">Url: {result.url}</div>    
                </div>
        });
        
        return <div className="searchGitHub_results">
            <div>{this.state.resultsHeaderMessage}</div>
            {results}
        </div>
    }
}