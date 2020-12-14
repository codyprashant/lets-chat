import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup, InputGroupAddon } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../redux/actions';
//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

/**
 * Forget Password component
 * @param {*} props 
 */
const ForgetPassword = (props) => {

    const clearError = () => {
        props.apiError("");
    }

    useEffect(clearError, []);

    // validation
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            props.forgetPassword(values.email);
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Redirect to="/" />;
    }

    return (
        <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <div className="text-center mb-4">
                            <Link to="/" className="auth-logo mb-2 d-block">
                                <img src={logodark} alt="" height="60" className="logo logo-dark"/>
                                <img src={logolight} alt="" height="60" className="logo logo-light" />
                            </Link>

                            <h4>{('Reset Password')}</h4>
                            <p className="text-muted mb-4">{('Reset Password With Lets-Chat.')}</p>
                            
                        </div>

                        <Card>
                            <CardBody className="p-4">
                                <div className="p-3">
                                        {
                                            props.error && <Alert variant="danger">{props.error}</Alert>
                                        }
                                        {
                                            props.passwordResetStatus ? <Alert variant="success" className="text-center mb-4">{props.passwordResetStatus}</Alert>
                                            : <Alert variant="success" className="text-center mb-4">{('Enter your Email and instructions will be sent to you')}!</Alert>
                                        }
                                    <Form onSubmit={formik.handleSubmit}>
    
                                        <FormGroup className="mb-4">
                                            <Label>{('Email')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <InputGroupAddon addonType="prepend">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    className="form-control bg-soft-light border-light"
                                                    placeholder="Enter email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    invalid={formik.touched.email && formik.errors.email ? true : false}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </FormGroup>

                                        <div>
                                            <Button color="primary" block className="waves-effect waves-light" type="submit">{('Reset')}</Button>
                                        </div>

                                    </Form>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="mt-5 text-center">
                            <p>{('Remember It')} ? <Link to="login" className="font-weight-medium text-primary"> {('Signin')} </Link> </p>
                            <p>© {('2020 lets-chat')}. {('Crafted with')} <i className="mdi mdi-heart text-danger"></i> {('by codyPrashant')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error, passwordResetStatus } = state.Auth;
    return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(ForgetPassword);