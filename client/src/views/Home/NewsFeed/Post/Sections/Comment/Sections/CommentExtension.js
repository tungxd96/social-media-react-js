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

export default class CommentExtension extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            open: false,
            dropdownItems: ['Edit', 'Delete'],
        };
    }

    toggle() {
        this.setState(prevState => {
            return { open: !prevState.open };
        });
    }

    render() {
        return (
            <Col lg="1" md="12" sm="12" className='center'>
                <Dropdown open={this.state.open} toggle={this.toggle} className='d-table'>
                    <DropdownToggle pill outline size='sm'>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.dropdownItems.map((data, index) => {
                            return (
                                <DropdownItem key={index} onClick={() => this.props.onMore(data, this.props.commentData)}>{data}</DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </Col>
        );
    }
}