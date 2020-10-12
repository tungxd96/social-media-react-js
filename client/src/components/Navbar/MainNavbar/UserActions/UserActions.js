import React, { Component } from 'react';

import {
    NavItem,
    DropdownToggle,
    Dropdown,
    Collapse,
    DropdownItem,
    DropdownMenu,
    NavLink
} from 'shards-react';

import { Link } from 'react-router-dom';

import { blue } from '../../../Constant/Constant';
import Avatar from 'react-avatar';

export default class UserActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggleUserActions = this.toggleUserActions.bind(this);
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return (
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                    <Avatar name={'Tung Dinh'} round size='40' color={blue} />
                </DropdownToggle>
                <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                    <DropdownItem tag={Link} to='/'>
                        <i className="material-icons">&#xE7FD;</i> Profile
                    </DropdownItem>
                </Collapse>
            </NavItem>
        );
    }
}