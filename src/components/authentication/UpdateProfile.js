import React, { Fragment, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../../Context/AuthContext";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        } else if(passwordRef.current.value.length < 6 && passwordRef.current.value.length != 0) {
            return setError("Password must be at least 6 charaters long");
        }
        setLoading(true);
        setError("");
        const promises = [];    //create an array of promises that starts empty
        if(emailRef.current.value !== currentUser.email) {  //If email was changed in form
            promises.push(updateEmail(emailRef.current.value)); //Promise to update the user's email
        }
        if(passwordRef.current.value !== currentUser.password) {    //If password was changed in form
            promises.push(updatePassword(passwordRef.current.value));   //Promise to update the user's password
        }
        Promise.all(promises).then(() => {
            setLoading(false);
            history.push("/dashboard");
        }).catch(() => {
            setError("Failed to update account");
            setLoading(false);
        });
    }
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" autoComplete="off"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" autoComplete="off"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/dashboard">Cancel Update</Link>
            </div>
        </Fragment>
    )
}
