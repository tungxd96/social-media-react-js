import React, { Component } from 'react';

import {
    Row,
    Col,
    ButtonGroup,
    Button,
    Container,
    FormInput
} from 'shards-react';

import Avatar from 'react-avatar';
import ReactTimeAgo from 'react-time-ago';

import { blue } from '../../../../../../../components/Constant/Constant';

import {
    editComment,
    removeComment
} from '../../../../../../../components/Function/CommentParser';

import CommentEditor from './CommentEditor';
import CommentExtension from './CommentExtension';
import { validateNull } from '../../../../../../../components/Function/Function';
import { toTimestampString, toDate } from '../../../../../../../components/Function/DateFormatter';

export default class SubComment extends Component {
    constructor(props) {
        super(props);

        this.onLikeComment = this.onLikeComment.bind(this);
        this.onReplyComment = this.onReplyComment.bind(this);
        this.onChangeReplyComment = this.onChangeReplyComment.bind(this);
        this.onSendReplyComment = this.onSendReplyComment.bind(this);
        this.onChangeEditedComment = this.onChangeEditedComment.bind(this);
        this.onCancelEditedComment = this.onCancelEditedComment.bind(this);
        this.onSubmitEditedComment = this.onSubmitEditedComment.bind(this);
        this.onExtension = this.onExtension.bind(this);

        this.state = {
            isLikeComment: false,
            isReplyComment: false,
            replyCommentContent: '',
            commentEdited: false,
            commentContent: '',
            data: undefined,
        };
    }

    componentDidMount() {
        this.setState({
            commentContent: this.props.data.content,
            data: this.props.data,
        });
    }

    onLikeComment(e) {
        e.preventDefault();

        this.setState({
            isLikeComment: !this.state.isLikeComment
        });
    }

    onReplyComment(e) {
        e.preventDefault();

        this.setState({
            isReplyComment: !this.state.isReplyComment
        });
    }

    onChangeReplyComment(e) {
        this.setState({
            replyCommentContent: e.target.value
        });
    }

    onSendReplyComment(e) {
        e.preventDefault();
    }

    onExtension(selected, data) {
        if (selected === 'Delete') {
            removeComment(data.commentid)
                .then(_ => {
                    this.setState({
                        data: {
                            deleted: true
                        },
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (selected === 'Edit') {
            this.setState({
                commentEdited: !this.state.commentEdited,
            });
        }
    }

    onChangeEditedComment(e) {
        this.setState({
            commentContent: e.target.value
        });
    }

    onCancelEditedComment(e) {
        e.preventDefault();

        this.setState({
            commentEdited: false
        });
    }

    onSubmitEditedComment(e) {
        e.preventDefault();

        const commentData = {
            commentId: this.props.data.commentid,
            userId: this.props.data.userid,
            postId: this.props.data.postid,
            content: this.state.commentContent,
            imageSrc: null,
            createdtime: this.props.data.createdtime,
            updatedTime: toTimestampString(new Date())
        };

        editComment(commentData)
            .then(_ => {
                this.setState({
                    commentEdited: !this.state.commentEdited,
                    data: commentData,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (validateNull(this.state.data)) {
            if (this.state.data.deleted) {
                return '';
            }
        }

        const data = validateNull(this.state.data) ? this.state.data : this.props.data;
        const fullName = this.props.commentUsers[this.props.data.userid].firstname + ' ' + this.props.commentUsers[this.props.data.userid].lastname;

        return (
            <Row lg="12" md="12" sm="12" className='mt-4 pl-3'>
                <div className='mr-3'>
                    <Avatar
                        name={fullName}
                        src={this.props.commentUsers[this.props.data.userid].avasrc}
                        size='40'
                        round
                        color={blue}
                    />
                </div>
                <Col lg="10" md="12" sm="12" className='bg-main round'>
                    <Row className='bold pl-2 pt-2 pr-2'>
                        {fullName}
                    </Row>
                    <CommentEditor
                        data={data}
                        edited={this.state.commentEdited}
                        commentContent={this.state.commentContent}
                        onChangeEditedComment={this.onChangeEditedComment}
                        onCancelEditedComment={this.onCancelEditedComment}
                        onSubmitEditedComment={this.onSubmitEditedComment}
                    />
                    <Container className='p-0'>
                        <Row>
                            <ButtonGroup size='sm' className='p-2'>
                                <Button
                                    theme={this.state.isLikeComment ? 'primary' : 'light'}
                                    onClick={this.onLikeComment}
                                >
                                    Like
                            </Button>
                                <Button
                                    theme='light'
                                    onClick={this.onReplyComment}
                                >
                                    Reply
                            </Button>
                            </ButtonGroup>
                        </Row>
                        {
                            !this.state.isReplyComment
                                ?
                                ''
                                :
                                <Row className='p-2'>
                                    <Avatar
                                        name={fullName}
                                        src={this.props.commentUsers[this.props.data.userid].avasrc}
                                        size='40'
                                        round
                                        color={blue}
                                    />
                                    <Col>
                                        <FormInput
                                            className='text-field-white'
                                            placeholder='Write your reply...'
                                            onChange={this.onChangeReplyComment}
                                            value={this.state.replyCommentContent}
                                        />
                                    </Col>
                                    <div className='center'>
                                        <Button size='sm' pill onClick={this.onSendReplyComment}>Send</Button>
                                    </div>
                                </Row>
                        }
                        {
                            !validateNull(data.createdtime)
                                ?
                                ''
                                :
                                <Row className='px-2 mb-2'>
                                    <ReactTimeAgo date={toDate(data.createdtime)} locale='en' className='w-200 f-12'/>
                                </Row>
                        }
                    </Container>
                </Col>
                <CommentExtension
                    commentData={data}
                    onMore={this.onExtension}
                />
            </Row>
        );
    }
}