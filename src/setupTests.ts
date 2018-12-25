import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// global.fetch = require('jest-fetch-mock')
// configure({ adapter: new Adapter() });


import {GlobalWithFetchMock} from "jest-fetch-mock";
 
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;


configure({ adapter: new Adapter() });