import React from 'react';
import {shallow} from 'enzyme';
import SearchGitHub from '../SearchGitHub';

describe("SearchGitHub component", () => {
    describe("search term entered", () => {
        describe("when search term is under three character", () => {
            let searchGitHub;
            beforeAll(() => {
                searchGitHub = shallow(<SearchGitHub searchTerm="ab"></SearchGitHub>);
                console.log(searchGitHub);
            });
            
            it("should not make any API calls to the github API", () => {

            });

            it("should not render any results", () => {
                expect(searchGitHub.find(".searchGitHub-resultitem").length).toBe(0);
            });

        })
    })
})

