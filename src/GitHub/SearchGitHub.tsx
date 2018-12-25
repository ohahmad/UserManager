import React, { Component } from 'react';
import IGithubSearchProps from './IGitHubSearchProps';
import IGitHubSearchState, {IGitHubResult} from './IGithubSearchState';

interface IGitHubApiResponse {
    total_count: number,
    incomplete_results: false,
    items: [{
        login: string,
        url: string
    }]
}

export default class SearchGitHub extends Component<IGithubSearchProps, IGitHubSearchState> {
    constructor(props: IGithubSearchProps) {
        super(props);
        this.state = {
            results: [],
            searchTerm: ""
        };    
    }

     public async search(searchTerm: string) : Promise<void> {
        const minimumCharRequiredToSearch = 3;
        
        if(searchTerm.length < minimumCharRequiredToSearch || searchTerm.startsWith("https://")) {
            return;
        }
        
        const response = await fetch("https://api.github.com/search/users?q=" + searchTerm);
        const data: IGitHubApiResponse = await response.json();
        const results = data.items.map(result => {
            return {
                username: result.login,
                url: result.url
            } as IGitHubResult;            
        });

        this.setState({
            results: results
        });
    }

    public static getDerivedStateFromProps(nextProps: IGithubSearchProps, prevState: IGitHubSearchState)  : IGitHubSearchState {
        if(nextProps.searchTerm !== prevState.searchTerm) {
            return {
                results: [],
                searchTerm: nextProps.searchTerm
            }
        }

        return prevState;
    }

    public componentDidUpdate(previousProps: IGithubSearchProps, prevState: IGitHubSearchState) {
        if(this.state.searchTerm !== prevState.searchTerm) {
            this.search(this.state.searchTerm);
        }
    }

    public componentDidMount() {
        this.search(this.props.searchTerm);
    }

    public render() {
        const results = this.state.results.map((result, index )=> {
          return <div key={index} className="searchGitHub-resultitem" onClick={ () => this.props.onRepositoryUrlSelected(result.url) }>User: {result.username} - Url: {result.url}</div>
        });
        
        return <div className="searchGitHub">
            {results}
        </div>
    }
}