import React, { Component } from 'react';
import {
    Card,
    CardBody,
    FormGroup,
    FormInput,
    Button,
    CardTitle,
    Container,
    Row,
    Col,
    DatePicker,
    FormSelect,
} from 'shards-react';
import { register } from '../../../../components/Function/UserParser';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            dob: undefined,
            gender: 'Male',
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeDob(e) {
        if (e != null) {
            const date = e.toLocaleDateString().split('/');
            this.setState({
                dob: new Date(date[2], date[0] - 1, date[1])
            });
        }
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            gender: this.state.gender
        }

        register(user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Card className='no-shadow'>
                <CardBody>
                    <CardTitle className='pb-3 center'>Register</CardTitle>

                    <Row>
                        <Col>
                            <FormGroup>
                                <FormInput className='text-field' id='first-name' placeholder='First name' onChange={this.onChangeFirstName} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormInput className='text-field' id='last-name' placeholder='Last name' onChange={this.onChangeLastName} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormGroup>
                                <FormInput className='text-field' id='email2' placeholder='Email' onChange={this.onChangeEmail} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormInput type='password' className='text-field' id='password2' placeholder='Password' onChange={this.onChangePassword} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormSelect className="mb-2 text-field" value={this.state.gender} onChange={this.onChangeGender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </FormSelect>

                    <Row>
                        <Col>
                            <DatePicker
                                size="sm"
                                selected={this.state.dob}
                                onChange={this.onChangeDob}
                                placeholderText="Date of Birth"
                                dropdownMode="select"
                                className="text-left mt-2 py-2 text-field mb-3"
                            />
                        </Col>
                        <div className='mr-3 center'>
                            <Button onClick={this.props.onToggle} outline size='sm'>Login</Button>
                        </div>
                    </Row>

                    <Container className='center'>
                        <Button onClick={this.onSubmit}>Sign up</Button>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}