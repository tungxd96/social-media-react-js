import React, { Component } from 'react';

import { profile } from '../../components/Function/UserParser';

import jwtDecode from 'jwt-decode';
import { Container } from 'shards-react';
import AvatarProfile from '../../components/AvatarProfile/AvatarProfile';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            otherUser: undefined,
        };
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwtDecode(token);

        profile(decoded._id)
            .then(res => {
                this.setState({
                    currentUser: res
                });
            })
            .catch(err => {
                console.log(err);
            });

        const id = this.props.match.params.id;

        profile(id)
            .then(res => {
                this.setState({
                    otherUser: res
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Container className='p-4'>
                <AvatarProfile user={this.state.otherUser} size={48}/>
            </Container>
        );
    }
}