import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import SearchGitHub from '../SearchGitHub';
import IGitHubSearchState from "../interface/IGitHubSearchState";
import IGitHubSearchProps from "../interface/IGitHubSearchProps";

describe("SearchGitHub component", () => {
    describe("search term entered", () => {
        describe("when search term is under four characters", () => {
            let searchGitHub: ShallowWrapper<IGitHubSearchProps, IGitHubSearchState, SearchGitHub>;
            let onRepositoryUrlSelectedMock =  jest.fn();
            beforeAll(() => {
                fetch.resetMocks();     
                fetch.mockResponseOnce(JSON.stringify({ data: 'does not matter' }));
                searchGitHub = shallow(<SearchGitHub searchTerm="abc" onRepositoryUrlSelected = { onRepositoryUrlSelectedMock } ></SearchGitHub>);
                fetch.resetMocks();
            });
            
            it("should not make any API calls to the github API", () => {
                expect(fetch.mock.calls.length).toEqual(0);
            });

            it("should not render any results", () => {
                expect(searchGitHub.find(".searchGitHub-resultitem").length).toBe(0);
            });

            describe("when search term is four characters or over", () => {
                // let searchResults;
                beforeAll(() => {        
                    fetch.resetMocks();     
                    fetch.mockResponseOnce(JSON.stringify({ items: 
                        [ 
                            { login: "user 1", url: "url 1" },
                            { login: "user 2", url: "url 2" },
                        ] 
                    }));                    

                    searchGitHub.setProps({
                        searchTerm: "abcs"
                    });            
                });
                
                it("should make an API calls to the github API", () => {
                    expect(fetch.mock.calls.length).toEqual(1);
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
                    it("should call a method on prop with url as a parameter", () => {
                        const searchResults = searchGitHub.find(".searchGitHub-resultItem");
                        const resultItem1 = searchResults.at(0);
                        resultItem1.simulate('click');
                        expect(onRepositoryUrlSelectedMock).toHaveBeenCalledWith("url 1");
                    });
                });
            });
        });        
    })
})

