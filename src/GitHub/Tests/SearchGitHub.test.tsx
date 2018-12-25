import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import SearchGitHub from '../SearchGitHub';
import IGitHubSearchState from "../IGitHubSearchState";
import IGitHubSearchProps from "../IGitHubSearchProps";

describe("SearchGitHub component", () => {
    describe("search term entered", () => {
        describe("when search term is under three character", () => {
            let searchGitHub: ShallowWrapper<IGitHubSearchState, IGitHubSearchProps, SearchGitHub>;
            let onRepositoryUrlSelectedMock =  jest.fn();
            beforeAll(() => {
                fetch.resetMocks();     
                fetch.mockResponseOnce(JSON.stringify({ data: 'does not matter' }));
                searchGitHub = shallow(<SearchGitHub searchTerm="ab" onRepositoryUrlSelected = { onRepositoryUrlSelectedMock } ></SearchGitHub>);
                fetch.resetMocks();
            });
            
            it("should not make any API calls to the github API", () => {
                expect(fetch.mock.calls.length).toEqual(0);
            });

            it("should not render any results", () => {
                expect(searchGitHub.find(".searchGitHub-resultitem").length).toBe(0);
            });

            describe("when search term is over three characters", () => {
                test((""), () => {

                });
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
                    const results = searchGitHub.find(".searchGitHub-resultitem");
                    expect(results.length).toEqual(2);
                });
    
                it("should render each result with name and url", () => {
                    expect(searchGitHub.childAt(0).text()).toContain("User: user 1 - Url: url 1");
                    expect(searchGitHub.childAt(1).text()).toContain("User: user 2 - Url: url 2");
                });

                describe("when 1st search result is clicked", () => {
                    it("should call a method on prop with url as a parameter", () => {
                        searchGitHub.childAt(0).simulate('click');
                        expect(onRepositoryUrlSelectedMock).toHaveBeenCalledWith("url 1");
                    });
                });
            });
        });        
    })
})

