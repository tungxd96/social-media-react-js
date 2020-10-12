import React, { Component } from 'react';

import {
    Row,
    Tooltip,
    Col
} from 'shards-react';

import {
    faThumbsUp,
    faComments
} from '@fortawesome/free-solid-svg-icons';

import { validateNull, validateLength } from '../../../../../../components/Function/Function';

import LikeUsers from '../Like/LikeUsers';
import StatCount from './Sections/StatCount';

export default class PostStat extends Component {
    constructor(props) {
        super(props);

        this.likeTooltipToggle = this.likeTooltipToggle.bind(this);

        this.state = {
            likeTooltipOpen: false
        };
    }

    likeTooltipToggle() {
        this.setState({
            likeTooltipOpen: !this.state.likeTooltipOpen
        });
    }

    render() {
        if (
            !validateNull(this.props.likes)
            || !validateNull(this.props.postId)
            || !validateNull(this.props.likedUsers)
            || !validateNull(this.props.commentBody)
        ) {
            return '';
        }

        const lid = `like-${this.props.postId}`;

        return (
            <Row className='px-3'>
                {
                    !validateLength(this.props.likes)
                        ? ''
                        :
                        <Col id={lid}>
                            <StatCount
                                icon={faThumbsUp}
                                count={this.props.likes.length}
                            />
                            <Tooltip open={this.state.likeTooltipOpen} target={`#${lid}`} toggle={this.likeTooltipToggle}>
                                <LikeUsers
                                    likedUsers={this.props.likedUsers}
                                />
                            </Tooltip>
                        </Col>
                }
                {
                    !validateLength(this.props.commentBody)
                        ? ''
                        :
                        <Col>
                            <StatCount
                                icon={faComments}
                                count={this.props.commentBody.length}
                            />
                        </Col>
                }
            </Row>
        );
    }
}