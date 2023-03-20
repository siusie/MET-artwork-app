import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../lib/authenticate";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [password2, setPassword2] = useState('');

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log("Form Submitted");

        try {
            await registerUser(userName, password, password2);
            router.push("/login");
        } catch (err) {
            console.log(err.message)
            setWarning(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label><Form.Control value={userName} onChange={e => setUserName(e.target.value)} type="text" id="userName" name="userName" required />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label><Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label><Form.Control value={password2} onChange={e => setPassword2(e.target.value)} type="password" id="password2" name="password2" required />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">Register</Button><br /><br />
                {warning && <Alert variant="info">{warning}</Alert>}
            </Form>
        </>
    );
}