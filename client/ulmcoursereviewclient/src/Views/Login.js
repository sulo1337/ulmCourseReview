import { Box, Button, Heading, Image, TextInput } from 'grommet';
import { Lock, Mail, Alert } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { RouterContext } from '../App';
import axios from 'axios';

const Login = () => {
    const { push } = React.useContext(RouterContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    useEffect(() => {
        const authtoken = localStorage.getItem('x-auth-token');

        if (authtoken) {
            push('/dashboard');
            return;
        }
    }, [push]);
    const handleClick = async () => {
        const url = 'http://localhost:5000/api/student/login'
        axios.post(url, { email, password })
            .then(response => {
                localStorage.setItem('x-auth-token', response.headers["x-auth-token"]);
                localStorage.setItem('fname', response.data.fname);
                push("/dashboard");
            })
            .catch(err => {
                console.log("invalid credentials");
                setError(true);
            })
    }
    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }}>
            <Box align="center" justify="center">
                <Image src="https://www.ulm.edu/_resources/images/ulm-academic-logo-circle.png" />
            </Box>
            <Box align="center" justify="center" direction="column">
                <Heading level="4" size="large" textAlign="center" truncate={false} margin={{ "bottom": "xsmall", "top": "xsmall" }}>
                    ULM Course Review
          </Heading>
            </Box>
            <Box align="center" justify="center">
                <Box align="center" justify="center" pad="small" gap="xsmall" direction="column" wrap={false} width="medium">
                    {error ? <Button label="Invalid email/password." plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                    <TextInput name="email" placeholder="Please enter your email." reverse icon={<Mail />} value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                    <TextInput reverse icon={<Lock />} type="password" name="password" placeholder="Please enter your password." value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                    <Box align="center" justify="center" width="small">
                        <Button label="Login" margin="xsmall" primary secondary={false} reverse={false} gap="xxsmall" fill="horizontal" onClick={handleClick} />
                        <Button label="Register Instead" hoverIndicator={false} primary margin="xsmall" fill="horizontal" onClick={() => push("/register")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;