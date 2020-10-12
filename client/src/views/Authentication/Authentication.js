import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'shards-react';
import Login from './Sections/Login/Login';
import Register from './Sections/Register/Register';

export default class Authentication extends Component {
    constructor(props) {
        super(props);

        this.onToggle = this.onToggle.bind(this);

        this.state = {
            toggled: false
        }
    }

    componentDidMount() {
        localStorage.usertoken = undefined;
    }

    onToggle(e) {
        e.preventDefault();

        this.setState({
            toggled: !this.state.toggled
        })
    }

    loginOrRegister() {
        if (!this.state.toggled) {
            return (
                <Col>
                    <Login onToggle={this.onToggle} />
                </Col>
            );
        }
        return (
            <Col>
                <Register onToggle={this.onToggle} />
            </Col>
        );
    }

    render() {
        return (
            <Container className='relative center'>
                <img className='img-blur' src='https://images.unsplash.com/photo-1555819207-d089c9205ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt='new' />
                <Row className='absolute center w-50'>
                    {this.loginOrRegister()}
                </Row>
            </Container>
        );
    }
}