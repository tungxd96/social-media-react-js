import React, { Component } from 'react';

import { 
    Container, 
    Col, 
    Row 
} from 'shards-react';

import PropTypes from 'prop-types';

import MainNavbar from '../Navbar/MainNavbar/MainNavbar';

export default class DefaultLayout extends Component {
    render() {
        return (
            <Container fluid className='bg-main main'>
                <Row>
                    <Col
                        className='main-content p-0'
                        tag='main'
                        sm='12'
                        md='12'
                        lg='12'
                    >
                        {!this.props.noMainNavbar && <MainNavbar />}
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}

DefaultLayout.propTypes = {
    noMainNavbar: PropTypes.bool,
    noLeftNavbar: PropTypes.bool,
};

DefaultLayout.defaultProps = {
    noMainNavbar: false,
    noLeftNavbar: false,
};