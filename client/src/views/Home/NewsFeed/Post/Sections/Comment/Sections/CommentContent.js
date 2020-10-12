import React, { Component } from 'react';

import SubComment from './SubComment';

export default class CommentContent extends Component {
    render() {
        if (
            this.props.commentBody.length === 0
            || this.props.commentUsers.length === 0
            || this.props.commentBody.error
        ) {
            return '';
        }

        return this.props.commentBody.map((data, index) => {
            return (
                <SubComment
                    key={index}
                    commentBody={this.props.commentBody}
                    commentUsers={this.props.commentUsers}
                    data={data}
                    onMore={this.props.onMore}
                />
            );
        });
    }
}