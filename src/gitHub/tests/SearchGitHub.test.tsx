import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import SearchGitHub from '../SearchGitHub';
import IGitHubSearchProps from "../interface/IGitHubSearchProps";
import {  FetchMock } from 'jest-fetch-mock/types';
import IGitHubSearchState from '../interface/IGithubSearchState';

describe("SearchGitHub component", () => {
    describe("search term entered", () => {
        describe("when search term is under four characters", () => {
            let searchGitHub: ShallowWrapper<IGitHubSearchProps, IGitHubSearchState, SearchGitHub>;
            let onRepositoryUrlSelectedMock =  jest.fn();
            beforeAll(() => {
                (fetch as FetchMock).resetMocks();     
                (fetch as FetchMock).mockResponseOnce(JSON.stringify({ data: 'does not matter' }));
                searchGitHub = shallow(<SearchGitHub searchTerm="abc" onRepositoryUrlSelected = { onRepositoryUrlSelectedMock } ></SearchGitHub>);
                (fetch as FetchMock).resetMocks();
            });
            
            it("should not make any API calls to the github API", () => {
                expect((fetch as FetchMock).mock.calls.length).toEqual(0);
            });

            it("should not render any results", () => {
                expect(searchGitHub.find(".searchGitHub-resultitem").length).toBe(0);
            });

            describe("when search term is four characters or over", () => {
                // let searchResults;
                beforeAll(() => {        
                    (fetch as FetchMock).resetMocks();     
                    (fetch as FetchMock).mockResponseOnce(JSON.stringify({ items: 
                        [ 
                            { login: "user 1", html_url: "url 1", avatar_url: "some avatar url 1" },
                            { login: "user 2", html_url: "url 2" },
                        ] 
                    }));                    

                    searchGitHub.setProps({
                        searchTerm: "abcs"
                    });            
                });
                
                it("should make an API calls to the github API", () => {
                    expect((fetch as FetchMock).mock.calls.length).toEqual(1);
                });
    
                it("should render 2 results", () => {
                    const searchResults = searchGitHub.find(".searchGitHub-resultItem");
                    expect(searchResults.length).toEqual(2);
                });
    
                it("should render each result with name and url", () => {
                    const searchResults = searchGitHub.find(".searchGitHub-resultItem");
                    const resultItem1 = searchResults.at(0);
                    const resultItem2 = searchResults.at(1);
                    expect(resultItem1.childAt(0).text()).toEqual("User: user 1");
                    expect(resultItem1.childAt(1).text()).toEqual("Url: url 1");
                    
                    expect(resultItem2.childAt(0).text()).toEqual("User: user 2");
                    expect(resultItem2.childAt(1).text()).toEqual("Url: url 2");
                });

                describe("when 1st search result is clicked", () => {
                    it("should call a method on prop with url and avatar as parameters", () => {
                        const searchResults = searchGitHub.find(".searchGitHub-resultItem");
                        const resultItem1 = searchResults.at(0);
                        resultItem1.simulate('click');
                        expect(onRepositoryUrlSelectedMock).toHaveBeenCalledWith("url 1", "some avatar url 1");
                    });
                });
            });
        });        
    })
})

