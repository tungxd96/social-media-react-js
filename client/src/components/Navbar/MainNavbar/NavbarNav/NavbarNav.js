import React, { Component } from 'react';
import { Nav } from 'shards-react';
import UserActions from '../UserActions/UserActions';

export default class NavbarNav extends Component {
    render() {
        return(
            <Nav navbar className="border-left flex-row">
                <UserActions />
            </Nav>
        );
    }
}