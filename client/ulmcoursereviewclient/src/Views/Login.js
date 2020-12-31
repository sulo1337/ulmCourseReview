import { Box, Button, Heading, TextInput } from 'grommet';
import { Lock, Mail, Alert } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { RouterContext } from '../App';
import { connect } from 'react-redux';
import axios from 'axios';
import Logo from '../ulm-academic-logo-circle.png';
import Loading from 'react-fullscreen-loading';
const Login = (props) => {
    const { push } = React.useContext(RouterContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const loading = props.loading;
    const dispatch = props.dispatch;
    useEffect(() => {
        const authtoken = localStorage.getItem('x-auth-token');

        if (authtoken) {
            push('/dashboard');
            return;
        }
    }, [push]);
    const handleClick = async () => {
        setError(false);
        const url = process.env.REACT_APP_BASE_URL + '/api/student/login'
        dispatch({
            type: "LOADING",
        });
        axios.post(url, { email, password })
            .then(response => {
                localStorage.setItem('x-auth-token', response.headers["x-auth-token"]);
                localStorage.setItem('fname', response.data.fname);
                localStorage.setItem('id', response.data._id);
                push("/dashboard");
            })
            .catch(err => {
                setError(true);
                if (err.response === undefined) {
                    setErrorMessage("No internet connection");
                    return;
                }
                setErrorMessage("Invalid Email/Password!");
                dispatch({
                    type: "NOT_LOADING",
                });
            })
    }
    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }} animation={[{ "type": "zoomIn", "size": "large", "duration": 600 }, { "type": "fadeIn", "size": "large" }]}>
            <Loading loading={loading} background="#ddddddaa" loaderColor="#800029" />
            <Box align="center" justify="center">
                <img alt="logo" src={Logo} />
            </Box>
            <Box align="center" justify="center" direction="column">
                <Heading level="4" size="large" textAlign="center" truncate={false} margin={{ "bottom": "xsmall", "top": "xsmall" }}>
                    ULM Course Review
          </Heading>
            </Box>
            <Box align="center" justify="center">
                <Box align="center" justify="center" pad="small" gap="xsmall" direction="column" wrap={false} width="medium">
                    {error ? <Button label={errorMessage} plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
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

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews,
    loading: state.loading,
});

export default connect(mapStateToProps)(Login);