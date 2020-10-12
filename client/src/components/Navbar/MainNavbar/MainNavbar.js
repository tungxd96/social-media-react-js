import React, { Component } from 'react';
import {
    Navbar,
    Container,
} from 'shards-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import NavbarSearch from './NavbarSearch/NavbarSearch';
import HomeLink from './HomeLink/HomeLink';
import NavbarNav from './NavbarNav/NavbarNav';

export default class MainNavbar extends Component {
    constructor(props) {
        super(props);

        this.onLogOut = this.onLogOut.bind(this);
    }

    onLogOut(e) {
        e.preventDefault();

        localStorage.usertoken = undefined;

        window.location.reload(true);
    }

    render() {
        const classes = classNames(
            "main-navbar",
            "bg-white",
            this.props.stickyTop && "sticky-top"
        );
        return (
            <div className={classes}>
                <Container className='p-0'>
                    <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
                        <HomeLink />
                        <NavbarSearch />
                        <NavbarNav />
                    </Navbar>
                </Container>
            </div>
        );
    }
}

MainNavbar.propTypes = {
    layout: PropTypes.string,
    stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
    stickyTop: true
};