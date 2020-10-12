import React, { Component } from 'react';

import {
    Row,
    Col
} from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { validateNull } from '../../../../../../../components/Function/Function';

export default class StatCount extends Component {
    render() {
        if (
            !validateNull(this.props.icon)
            || !validateNull(this.props.count)
        ) {
            return '';
        }

        return (
            <Row className={this.props.className}>
                <Col className='pr-2'>
                    <FontAwesomeIcon icon={this.props.icon} color='#147EFB' />
                </Col>
                <Col className='pl-2'>
                    {this.props.count}
                </Col>
            </Row>
        );
    }
}