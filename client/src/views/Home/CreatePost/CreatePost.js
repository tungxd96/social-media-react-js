import React, { Component } from 'react';
import {
    FormTextarea,
    Row,
    Col,
    Button,
    Card,
    Container
} from 'shards-react';

import AvatarProfile from '../../../components/AvatarProfile/AvatarProfile';
import { profile } from '../../../components/Function/UserParser';
import { userToken } from '../../../components/Function/Function';
import { createPost } from '../../../components/Function/PostParser';
import { toTimestampString } from '../../../components/Function/DateFormatter';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onPost = this.onPost.bind(this);

        this.state = {
            caption: null,
            user: null,
        };
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
            });
    }

    onChangeCaption(e) {
        if (e.target.value === '') {
            this.setState({
                caption: null
            });
        }
        else {
            this.setState({
                caption: e.target.value
            });
        }
    }

    onPost(e) {
        e.preventDefault();

        const post = {
            userId: this.state.user.userid,
            caption: this.state.caption,
            createdTime: toTimestampString(new Date()),
        };

        createPost(post)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        window.location.reload(true);
    }

    render() {
        return (
            <Container>
                <Container className='w-75'>
                    <Row>
                        <Card small className='p-4 w-100'>
                            <Row className='pb-2 px-2'>
                                <Col className='px-3 py-2'>
                                    <AvatarProfile user={this.state.user} size={48} />
                                </Col>
                            </Row>
                            <Row className='mb-3 px-2'>
                                <FormTextarea className='text-field' onChange={this.onChangeCaption} placeholder='Write something...' />
                            </Row>
                            <Row className='px-2'>
                                <Col></Col>
                                <div>
                                    <Button size='sm' onClick={this.onPost}>Post</Button>
                                </div>
                            </Row>
                        </Card>
                    </Row>
                </Container>
            </Container>
        );
    }
}