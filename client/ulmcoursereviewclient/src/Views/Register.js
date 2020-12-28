import axios from 'axios';
import { Box, Button, Heading, Image, TextInput } from 'grommet';
import { Lock, Mail, Alert, Checkmark } from 'grommet-icons';
import React, { useState } from 'react';
import { RouterContext } from '../App';
const Register = () => {
    const { push } = React.useContext(RouterContext)
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [middle, setMiddle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [formError, setFormError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [registered, setRegistered] = useState(false);

    const reset = () => {
        setInvalidEmail(false);
        setFormError(false);
        setSuccess(false);
        setRegistered(false);
    }
    const handleClick = () => {
        const url = "http://localhost:5000/api/student/register";
        reset();
        if (fname === "" || lname === "" || email === "" || password === "") {
            setFormError(true);
            return;
        }
        if (!email.endsWith("@warhawks.ulm.edu")) {
            setInvalidEmail(true);
            return;
        }

        axios.post(url, { fname, lname, middle, email, password })
            .then(response => {
                setSuccess(true);
                setTimeout(() => {
                    push('/login');
                }, 4000);
            })
            .catch(err => {
                if (err.response.status === 409) {
                    setRegistered(true);
                }
                if (err.response.status === 400) {
                    setFormError(true);
                }
            });
    }
    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }}>
            <Box align="center" justify="center">
                <Image src="https://www.ulm.edu/_resources/images/ulm-academic-logo-circle.png" />
            </Box>
            <Box align="center" justify="center" direction="column">
                <Heading level="4" size="large" textAlign="center" truncate={false} margin={{ "bottom": "xsmall", "top": "xsmall" }}>
                    ULM Course Review
                    {invalidEmail ? <Button label="Email must end with @warhawks.ulm.edu" plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                    <br />
                    {formError ? <Button label="Form Error" plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                    <br />
                    {success ? <Button label="Registered successfully, redirecting to login page..." plain disabled={false} color="status-ok" icon={<Checkmark color="status-ok" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                    <br />
                    {registered ? <Button label="This user is already registered!" plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                </Heading>
            </Box>
            <Box align="center" justify="center">
                <Box align="center" justify="center" pad="small" gap="xsmall" direction="column" wrap={false} width="medium">
                    <TextInput name="First Name" placeholder="First Name" value={fname} onChange={(event) => {
                        setFname(event.target.value);
                    }} />
                    <TextInput name="Middle" placeholder="Middle" value={middle} onChange={(event) => {
                        setMiddle(event.target.value);
                    }} />
                    <TextInput name="Last Name" placeholder="Last Name" value={lname} onChange={(event) => {
                        setLname(event.target.value);
                    }} />
                    <TextInput icon={<Mail />} name="email" placeholder="Email" reverse value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                    <TextInput reverse icon={<Lock />} name="password" placeholder="Password" type="password" value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                    <Box align="center" justify="center">
                        <Button label="Register" hoverIndicator={false} primary margin="xsmall" fill="horizontal" onClick={handleClick} />
                        <Button label="Login Instead" margin="xsmall" fill="horizontal" hoverIndicator={false} primary onClick={() => push("/login")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;