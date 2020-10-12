import React, { Component } from 'react';

import {
    Row,
    Card,
    Col,
    Button,
    ButtonGroup,
} from 'shards-react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { profile } from '../../../../components/Function/UserParser';
import {
    like,
    unlike,
    likes
} from '../../../../components/Function/LikeParser';
import {
    comment,
    comments
} from '../../../../components/Function/CommentParser';
import { removePost, editPost } from '../../../../components/Function/PostParser';
import { validateNull } from '../../../../components/Function/Function';

import MyDropdown from '../../../../components/MyDropdown/MyDropdown';
import AvatarProfile from '../../../../components/AvatarProfile/AvatarProfile';
import CommentSection from './Sections/Comment/CommentSection';
import PostStat from './Sections/PostStat/PostStat';
import { toTimestampString } from '../../../../components/Function/DateFormatter';
import PostEditor from './Sections/PostEditor/PostEditor';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.onLike = this.onLike.bind(this);
        this.onComment = this.onComment.bind(this);
        this.onShare = this.onShare.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onKeyDownComment = this.onKeyDownComment.bind(this);
        this.onSendComment = this.onSendComment.bind(this);
        this.onDropdown = this.onDropdown.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.updateLikes = this.updateLikes.bind(this);
        this.onChangeEditedPost = this.onChangeEditedPost.bind(this);
        this.onCancelEditedPost = this.onCancelEditedPost.bind(this);
        this.onSubmitEditedPost = this.onSubmitEditedPost.bind(this);

        this.state = {
            user: null,
            isLike: false,
            isComment: false,
            isShare: false,
            likeData: null,
            likedUsers: [],
            likes: [],
            commentContent: '',
            commentBody: [],
            commentUsers: [],
            postEdited: false,
            postCaption: '',
        };
    }

    componentDidMount() {
        if (validateNull(this.props.post)) {
            this.updateLikes();
            this.updateComments();

            profile(this.props.post.userid)
                .then(res => {
                    this.setState({
                        user: res
                    });
                })
                .catch(err => {
                    console.log(err);
                });

            this.setState({
                postCaption: this.props.post.caption
            });
        }
    }

    updateLikes() {
        likes(this.props.post.postid)
            .then(res => {
                var likedUsers = [];
                this.setState({
                    likes: res,
                })
                for (const i in res) {
                    if (res[i].userid === this.props.post.userid) {
                        this.setState({
                            isLike: true,
                            likeData: res[i],
                        });
                    }
                    if (validateNull(res[i].userid)) {
                        profile(res[i].userid)
                            .then(res => {
                                likedUsers.push(res);

                                this.setState({
                                    likedUsers: likedUsers
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
                if (res.error) {
                    this.setState({
                        likeList: []
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateComments() {
        if (validateNull(this.props.post)) {
            comments(this.props.post.postid)
                .then(res => {
                    var commentUsers = []
                    for (const i in res) {
                        if (validateNull(res[i].userid)) {
                            profile(res[i].userid)
                                .then(res => {
                                    commentUsers[res.userid] = res;
                                    this.setState({
                                        commentUsers: commentUsers
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    }

                    this.setState({
                        commentBody: res
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    onComment(e) {
        e.preventDefault();

        this.setState({
            isComment: !this.state.isComment
        });

        this.updateComments();
    }

    onLike(e) {
        e.preventDefault();

        if (!this.state.isLike) {
            const likeData = {
                userId: this.props.post.userid,
                postId: this.props.post.postid,
                createdTime: toTimestampString(new Date()),
            }
            like(likeData)
                .then(_ => {
                    this.updateLikes();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            unlike(this.state.likeData.likeid)
                .then(_ => {
                    this.updateLikes();
                })
                .catch(err => {
                    console.log(err);
                });
        }

        this.setState({
            isLike: !this.state.isLike
        });
    }

    onChangeComment(e) {
        this.setState({
            commentContent: e.target.value
        });
    }

    onKeyDownComment(e) {
        if (e.key === 'Enter') {
            this.postComment();
        }
    }

    onSendComment(e) {
        e.preventDefault();

        this.postComment();
    }

    onShare(e) {
        e.preventDefault();

        this.setState({
            isShare: !this.state.isShare
        });
    }

    postComment() {
        const commentBody = {
            userId: this.state.user.userid,
            postId: this.props.post.postid,
            content: this.state.commentContent,
            imageSrc: null,
            createdTime: toTimestampString(new Date()),
        }

        this.setState({
            commentContent: ''
        });

        comment(commentBody)
            .then(_ => {
                this.updateComments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    onDropdown(data) {
        if (data === 'Edit') {
            this.setState({
                postEdited: !this.state.postEdited
            });
        }
        else if (data === 'Delete') {
            removePost(this.props.post.postid)
                .then(_ => {
                    window.location.reload(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    onChangeEditedPost(e) {
        this.setState({
            postCaption: e.target.value
        });
    }

    onCancelEditedPost(e) {
        e.preventDefault();

        this.setState({
            postEdited: !this.state.postEdited
        });
    }

    onSubmitEditedPost(e) {
        e.preventDefault();

        const postData = {
            postId: this.props.post.postid,
            userId: this.props.post.userid,
            locationId: this.props.post.locationid,
            caption: this.state.postCaption,
            mediaId: this.props.post.mediaid,
            createdTime: this.props.post.createdtime,
            updatedTime: toTimestampString(new Date())
        }

        editPost(postData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        this.setState({
            postEdited: !this.state.postEdited
        });
    }

    render() {
        if (!validateNull(this.props.post)) {
            return '';
        }

        return (
            <Row className='bg-main mt-4'>
                <Card small className='p-4 w-100'>
                    <Row className='mb-3 px-3'>
                        <Col>
                            <AvatarProfile
                                user={this.state.user}
                                size={48}
                                createdTime={this.props.post.createdtime}
                                bold
                            />
                        </Col>
                        <div>
                            <MyDropdown
                                icon={faChevronDown}
                                dropdownItems={['Edit', 'Delete']}
                                onDropdown={this.onDropdown}
                            />
                        </div>
                    </Row>

                    <PostEditor
                        postCaption={this.state.postCaption}
                        postEdited={this.state.postEdited}
                        onChangeEditedPost={this.onChangeEditedPost}
                        onSubmitEditedPost={this.onSubmitEditedPost}
                        onCancelEditedPost={this.onCancelEditedPost}
                    />

                    <Row className='mb-3 mt-1'>
                        <PostStat
                            postId={this.props.post.postid}
                            likes={this.state.likes}
                            likedUsers={this.state.likedUsers}
                            commentBody={this.state.commentBody}
                        />
                    </Row>

                    <Row className='mb-3'>
                        <Col>
                            <ButtonGroup>
                                <Button size='sm' theme={this.state.isLike ? 'primary' : 'light'} onClick={this.onLike}>Like</Button>
                                <Button size='sm' theme='light' onClick={this.onComment}>Comment</Button>
                                <Button size='sm' theme='light' onClick={this.onShare}>Share</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>

                    <CommentSection
                        user={this.state.user}
                        isComment={this.state.isComment}
                        commentBody={this.state.commentBody}
                        commentUsers={this.state.commentUsers}
                        commentContent={this.state.commentContent}
                        onChangeComment={this.onChangeComment}
                        onKeyDownComment={this.onKeyDownComment}
                        onSendComment={this.onSendComment}
                    />

                </Card>
            </Row>
        );
    }
}