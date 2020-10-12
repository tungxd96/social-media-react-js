import React, { Component } from 'react';

import {
    Row,
    Col,
    FormInput,
    Button
} from 'shards-react';
import { validateNull } from '../../../../../../components/Function/Function';

export default class PostEditor extends Component {
    render() {
        if (
            !validateNull(this.props.postCaption)
            || !validateNull(this.props.onChangeEditedPost)
            || !validateNull(this.props.onSubmitEditedPost)
            || !validateNull(this.props.onCancelEditedPost)
        ) {
            return '';
        }

        if (this.props.postEdited) {
            return (
                <Row className='mb-1'>
                    <Col>
                        <Row className='px-2'>
                            <FormInput
                                className='text-field'
                                placeholder='Edit post...'
                                value={this.props.postCaption}
                                onChange={this.props.onChangeEditedPost}
                            />
                        </Row>
                        <Row className='mt-3 px-2'>
                            <Col></Col>
                            <div>
                                <Button
                                    size='sm'
                                    onClick={this.props.onSubmitEditedPost}
                                >Edit</Button>
                                <Button
                                    className='ml-2'
                                    size='sm'
                                    outline
                                    onClick={this.props.onCancelEditedPost}
                                >Cancel</Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            );
        }

        return (
            <Row className='mb-1'>
                <Col>
                    {this.props.postCaption}
                </Col>
            </Row>
        );
    }
}