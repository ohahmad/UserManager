import React, { FunctionComponent } from 'react';
import HeaderProps from './IHeaderProps';
import './Header.scss'

const Header: FunctionComponent<HeaderProps> = ({ name }) => {
 return <div className="header">
            <div className = "header_userContainer">Hello { name }!</div>
            <ul className="header_linksContainer">
                <li><a href="#">Home</a></li>
                <li><a href="#">Users</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </div>
}

export default Header;