import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import IApplicationAuthorData from './IApplicationAuthorData';

const authorData: IApplicationAuthorData = {
    Age: 32,
    FirstName: "Ommer",    
    Surname: "Ahmad",
    RepositoryUrl: "https://bitbucket.org/ommer-ahmad"
}

ReactDOM.render(<App {...authorData}  />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
