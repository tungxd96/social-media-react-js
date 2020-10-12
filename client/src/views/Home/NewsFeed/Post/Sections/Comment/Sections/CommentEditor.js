import React, { Component } from 'react';

import {
    Row,
    FormInput,
    Col,
    Button
} from 'shards-react';

export default class CommentEditor extends Component {
    render() {
        if (!this.props.edited) {
            return (
                <Row className='p-2'>
                    {this.props.data.content}
                </Row>
            );
        }

        return (
            <Row className='p-2'>
                <Col>
                    <Row>
                        <FormInput className='text-field-white' value={this.props.commentContent} onChange={this.props.onChangeEditedComment} />
                    </Row>
                    <Row className='mt-2'>
                        <Col></Col>
                        <div>
                            <Button onClick={this.props.onSubmitEditedComment} size='sm'>Edit</Button>
                            <Button className='ml-2' onClick={this.props.onCancelEditedComment} size='sm' outline >Cancel</Button>
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}