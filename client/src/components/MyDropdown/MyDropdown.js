import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col
} from "shards-react";

import {
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { validateNull } from '../Function/Function';

export default class CommentExtension extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            open: false,
        };
    }

    toggle() {
        this.setState(prevState => {
            return { open: !prevState.open };
        });
    }

    render() {
        if (
            !validateNull(this.props.dropdownItems)
            || !validateNull(this.props.onDropdown)
        ) {
            return '';
        }

        return (
            <Col lg="1" md="12" sm="12" className='center'>
                <Dropdown open={this.state.open} toggle={this.toggle} className='d-table'>
                    <DropdownToggle pill outline size='sm'>
                        <FontAwesomeIcon icon={ !validateNull(this.props.icon) ? faEllipsisH : this.props.icon } />
                    </DropdownToggle>
                    <DropdownMenu right={ !validateNull(this.props.right) ? false : true }>
                        {this.props.dropdownItems.map((data, index) => {
                            return (
                                <DropdownItem key={index} onClick={() => this.props.onDropdown(data)}>{data}</DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </Col>
        );
    }
}