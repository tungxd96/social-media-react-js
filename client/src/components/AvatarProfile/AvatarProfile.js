import React, { Component } from 'react';

import {
    Row,
    Col
} from 'shards-react';

import Avatar from 'react-avatar';
import ReactTimeAgo from 'react-time-ago';

import { blue } from '../Constant/Constant';

import { validateNull } from '../Function/Function';
import { toDate } from '../Function/DateFormatter';

export default class AvatarProfile extends Component {
    render() {
        if (this.props.user === undefined || this.props.user == null) {
            return '';
        }

        const fullName = this.props.user.firstname + ' ' + this.props.user.lastname;
        return (
            <Row className='center '>
                <Avatar name={fullName} src={this.props.user.avasrc} size={this.props.size} round={true} color={blue} />
                <Col className='ml-2'>
                    <Row className={`${!validateNull(this.props.bold) ? '' : 'bold'}`}>
                        {fullName}
                    </Row>
                    <Row className='w-200 f-14'>
                        {!validateNull(this.props.createdTime)
                            ? ''
                            : <ReactTimeAgo date={toDate(this.props.createdTime)} locale='en' />}
                    </Row>
                </Col>
            </Row>
        );
    }
}