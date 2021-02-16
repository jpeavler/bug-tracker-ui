import React, { Fragment, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../../Context/AuthContext";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        } else if(passwordRef.current.value.length < 6) {
            return setError("Password must be at least 6 charaters long");
        }
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value).then((response) => {
                let newUser = {
                    name : nameRef.current.value,
                    admin : false,
                    available : true,
                    uid : response.user.uid
                }
                fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json'},
                    body : JSON.stringify(newUser)
                });
            });
            
            setLoading(false);
            history.push('/dashboard');
        } catch(error) {
            setError('Failed to create an account');
            setLoading(false);
        }
    }
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required autoComplete="off"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required autoComplete="off"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </Fragment>
    )
}
