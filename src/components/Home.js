import React, { Fragment, useState, useRef } from 'react';
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
    const submitterRef = useRef();
    const softwareRef = useRef();
    const descRef = useRef();

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const newBugReport = {
                desc: descRef.current.value,
                software: softwareRef.current.value,
                submitter: submitterRef.current.value
            }
            fetch(`${process.env.REACT_APP_API_URL}/api/bugReports`, {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(newBugReport)
            })
        } catch (error) {
            setError(error);
        }
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Bug Tracking App</h2>
                    <Button className="w-100" onClick={handleShow}>Report Bug</Button>
                    <Modal show={modal} onHide={handleClose}>
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
                            </Form>
                            <Button disabled={loading} type="submit" className="w-100">Submit Bug Report</Button>
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
