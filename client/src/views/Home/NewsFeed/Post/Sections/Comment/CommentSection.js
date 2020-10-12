import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    FormInput,
    Button
} from 'shards-react';
import Avatar from 'react-avatar';

import { blue } from '../../../../../../components/Constant/Constant';

import { validateNull } from '../../../../../../components/Function/Function';

import CommentContent from './Sections/CommentContent';

export default class CommentSection extends Component {
    render() {
        if (
            !this.props.isComment
            || !validateNull(this.props.user)
            || !validateNull(this.props.user.firstname)
            || !validateNull(this.props.user.lastname)
            || !validateNull(this.props.user.avasrc)
            || !validateNull(this.props.commentBody)
            || !validateNull(this.props.commentContent)
            || !validateNull(this.props.commentUsers)
            || !validateNull(this.props.onChangeComment)
            || !validateNull(this.props.onSendComment)
            || !validateNull(this.props.onKeyDownComment)
        ) {
            return '';
        }

        return (
            <Container className='p-0 mt-2'>
                <Row lg="12" md="12" sm="12" className='px-3'>
                    <Avatar
                        name={this.props.user.firstname + ' ' + this.props.user.lastname}
                        src={this.props.user.avasrc}
                        color={blue}
                        size='40'
                        round
                    />
                    <Col lg="10" md="12" sm="12">
                        <FormInput
                            className='text-field round'
                            placeholder='Write your comment...'
                            onChange={this.props.onChangeComment}
                            onKeyDown={this.props.onKeyDownComment}
                            value={this.props.commentContent}
                        />
                    </Col>
                    <Col lg="1" md="12" sm="12" className='center'>
                        <Button size='sm' onClick={this.props.onSendComment}>Send</Button>
                    </Col>
                </Row>
                <CommentContent
                    commentBody={this.props.commentBody}
                    commentUsers={this.props.commentUsers}
                />
            </Container>
        );
    }
}