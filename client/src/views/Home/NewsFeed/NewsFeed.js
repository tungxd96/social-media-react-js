import React, { Component } from 'react';
import {
    Col, Row, Container
} from 'shards-react';

import Post from './Post/Post';
import { userToken } from '../../../components/Function/Function';
import { profile } from '../../../components/Function/UserParser';
import { posts } from '../../../components/Function/PostParser';

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: null,
        }
    }

    componentDidMount() {
        const userId = userToken();

        profile(userId)
            .then(res => {
                this.setState({
                    user: res
                });
            })
            .catch(err => {
                console.log(err);
            })

        posts(userId)
            .then(res => {
                this.setState({
                    posts: res
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.posts == null || this.state.posts.error) {
            return (
                <Col className='mt-4'>
                    <Row className='center mt-4 bg-main'>
                        No posts
                    </Row>
                </Col>
            );
        }

        return (
            <Container className='mt-4'>
                <Container className='w-75'>
                    {this.state.posts.map((data, index) => {
                        return (
                            <Post key={index} post={data} />
                        );
                    })}
                </Container>
            </Container>
        );
    }
}