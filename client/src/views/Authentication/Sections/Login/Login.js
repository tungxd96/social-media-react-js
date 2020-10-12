import React, { Component } from 'react';
import {
    Card,
    CardBody,
    FormGroup,
    FormInput,
    Button,
    FormCheckbox,
    CardTitle,
    Container,
    Row,
    Col,
} from 'shards-react';
import { login } from '../../../../components/Function/UserParser';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeRemember = this.onChangeRemember.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            remembered: false,
            email: undefined,
            password: undefined,
        }
    }

    onChangeRemember(e) {
        this.setState({
            remembered: !this.state.remembered
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onLogin(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            remembered: this.state.remembered
        };

        login(user)
            .then(res => {
                if (!res.error) {
                    console.log(res);
                    this.props.history.push('/');
                    window.location.reload(true);
                }
                else {
                    console.log(res.error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Card className='no-shadow'>
                <CardBody>
                    <CardTitle className='pb-3 center'>Login</CardTitle>
                    <FormGroup>
                        <FormInput className='text-field' id='email1' placeholder='Email' onChange={this.onChangeEmail} />
                    </FormGroup>
                    <FormGroup>
                        <FormInput type='password' className='text-field' id='password1' placeholder='Password' onChange={this.onChangePassword} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormCheckbox checked={this.state.remembered} onChange={this.onChangeRemember}>Remember me</FormCheckbox>
                            </FormGroup>
                        </Col>
                        <div className='mr-3'>
                            <Button onClick={this.props.onToggle} size='sm' outline>Sign up</Button>
                        </div>
                    </Row>
                    <Container className='center'>
                        <Button onClick={this.onLogin}>Login</Button>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(Login);