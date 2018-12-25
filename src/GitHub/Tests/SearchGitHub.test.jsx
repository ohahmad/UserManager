import React from 'react';
import {shallow} from 'enzyme';
import SearchGitHub from '../SearchGitHub';

describe("SearchGitHub component", () => {
    describe("search term entered", () => {
        describe("when search term is under three character", () => {
            let searchGitHub;
            beforeAll(() => {
                fetch.resetMocks();     
                fetch.mockResponseOnce(JSON.stringify({ data: 'does not matter' }));
                searchGitHub = shallow(<SearchGitHub searchTerm="ab"></SearchGitHub>);
                fetch.resetMocks();
            });
            
            it("should not make any API calls to the github API", () => {
                expect(fetch.mock.calls.length).toEqual(0);
            });

            it("should not render any results", () => {
                expect(searchGitHub.find(".searchGitHub-resultitem").length).toBe(0);
            });
        });
        describe("when search term is over three characters", () => {
            let searchGitHub;
            beforeEach(() => {           
                fetch.resetMocks();     
                fetch.mockResponseOnce(JSON.stringify({ items: 
                    [ 
                        { login: "user 1", url: "url 1" },
                        { login: "user 2", url: "url 2" },
                    ] 
                }));
                searchGitHub = shallow(<SearchGitHub searchTerm="abcd"></SearchGitHub>);
            });
            
            it("should make an API calls to the github API", () => {
                expect(fetch.mock.calls.length).toEqual(1);
            });

            it("should render 2 results", () => {
                const results = searchGitHub.find(".searchGitHub-resultitem");
                // console.log(results.text());
                expect(results.length).toEqual(2);
                // const result1 = results.get(0);
                // console.log(result1.text());
                // expect(results.get(0).text()).toEqual(2);
                // expect(searchGitHub.find(".searchGitHub-resultitem").length).toEqual(2);
            });
        });
    })
})

