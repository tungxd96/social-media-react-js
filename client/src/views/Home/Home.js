import React, { Component } from 'react';
import {
    Container
} from 'shards-react';

import CreatePost from './CreatePost/CreatePost';
import NewsFeed from './NewsFeed/NewsFeed';

export default class Home extends Component {
    render() {
        return (
            <Container className='py-4'>
                <CreatePost />
                <NewsFeed />
            </Container>
        );
    }
}