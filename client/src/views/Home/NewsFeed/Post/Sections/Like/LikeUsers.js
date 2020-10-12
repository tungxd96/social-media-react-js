import React, { Component } from 'react';

import { Row } from 'shards-react';

import AvatarProfile from '../../../../../../components/AvatarProfile/AvatarProfile';

export default class LikeUsers extends Component {
    render() {
        return this.props.likedUsers.map((data, index) => {
            return (
                <Row key={index} className='px-4'>
                    <AvatarProfile user={data} size={32} />
                </Row>
            );
        });
    }
}