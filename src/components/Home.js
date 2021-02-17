import React, { Fragment, useState, useRef } from 'react';
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
    const submitterRef = useRef();
    const softwareRef = useRef();
    const descRef = useRef();

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            setMessage("");
            const newBugReport = {
                desc: descRef.current.value,
                software: softwareRef.current.value,
                submitter: submitterRef.current.value
            }
            fetch(`${process.env.REACT_APP_API_URL}/api/bugReports`, {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(newBugReport)
            }).then(response => response.json()).then(res => {
                setMessage(`The bug report written by ${res.insertedItem.submitter} was added to the pending bug report list`);
            });
        } catch (error) {
            setError(error);
        }
        setLoading(false);
        setModal(false);
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Bug Tracking App</h2>
                    {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
                    {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
                    <Button className="w-100" onClick={handleShow}>Report Bug</Button>
                    <Modal show={modal} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton><h3>Report A Bug</h3></Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="submitter">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" ref={submitterRef} required/>
                                </Form.Group>
                                <Form.Group id="software">
                                    <Form.Label>Software</Form.Label>
                                    <Form.Control type="text" ref={softwareRef} required/>
                                </Form.Group>
                                <Form.Group id="desc">
                                    <Form.Label>Bug Description</Form.Label>
                                    <Form.Control as="textarea" ref={descRef} rows={4} required/>
                                </Form.Group>
                                <Button disabled={loading} type="submit" className="w-100">Submit Bug Report</Button>
                            </Form>
                            
                        </Modal.Body>
                    </Modal>
                    <div className="text-center w-100 m-2">
                        <Link className="text-center" to="/login">Developer Login</Link>
                    </div>
                    
                </Card.Body>
            </Card>
        </Fragment>
    )
}
