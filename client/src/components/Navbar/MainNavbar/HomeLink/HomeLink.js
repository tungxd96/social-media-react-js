import React, { Component } from 'react';
import { Container, Col, Row, CardTitle } from 'shards-react';
import { Link } from 'react-router-dom';

export default class HomeLink extends Component {
    constructor(props) {
        super(props);

        this.onHome = this.onHome.bind(this);
    }

    onHome(e) {
        e.preventDefault();

        window.location.reload(true);
    }

    render() {
        return (
            <Container className='h-100 p-0'>
                <Col>
                    <Row className='center pt-3'>
                        <Link onClick={this.onHome} to='/' style={{ textDecoration: 'none' }}>
                            <CardTitle>Social Media</CardTitle>
                        </Link>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Container>
        );
    }
}