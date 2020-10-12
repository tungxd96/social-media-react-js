import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Form,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from "shards-react";

import { search } from '../../../Function/UserParser';
import { validateNull, validateLength } from '../../../Function/Function';
import AvatarProfile from '../../../AvatarProfile/AvatarProfile';
import { withRouter } from 'react-router-dom';

class NavbarSearch extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSearchItem = this.onSearchItem.bind(this);

        this.state = {
            open: false,
            searchResult: undefined,
        };
    }

    onChangeSearch(e) {
        if (e.target.value !== '') {
            search(e.target.value)
                .then(res => {
                    this.setState({
                        searchResult: res
                    });
                })
                .catch(err => {
                    console.log(err);
                });

            this.setState({
                open: true
            });
        }
        else {
            this.setState({
                open: false
            });
        }
    }

    onSearchItem(data) {
        this.props.history.push(`profile/${data.userid}`);
        window.location.reload(true);
    }

    render() {
        return (
            <Dropdown open={this.state.open} toggle={this.onChangeSearch} className='w-100'>
                <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex p-2">
                    <InputGroup seamless>
                        <InputGroupAddon type="prepend">
                            <InputGroupText>
                                <i className="material-icons">search</i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <FormInput className="navbar-search text-field" placeholder="Search..." onChange={this.onChangeSearch} />
                    </InputGroup>
                </Form>
                {
                    (!validateNull(this.state.searchResult) || !validateLength(this.state.searchResult))
                        ? ''
                        :
                        <DropdownMenu className='w-100 no-border'>
                            {
                                this.state.searchResult.notFound
                                ? 
                                <DropdownItem>No search results</DropdownItem>
                                :
                                this.state.searchResult.map((data, index) => {
                                    return (
                                        <DropdownItem key={index} onClick={() => this.onSearchItem(data)}>
                                            <div className='px-2'>
                                                <AvatarProfile user={data} size={40} />
                                            </div>
                                        </DropdownItem>
                                    );
                                })
                            }
                        </DropdownMenu>
                }
            </Dropdown>
        );
    }
}

export default withRouter(NavbarSearch);