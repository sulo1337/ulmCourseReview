import axios from 'axios';
import { Box, Button, Heading, TextInput, Text } from 'grommet';
import { Lock, Mail, Alert, Checkmark } from 'grommet-icons';
import React, { useState } from 'react';
import { RouterContext } from '../App';
import { connect } from 'react-redux';
import Logo from '../logo.png';
import Loading from 'react-fullscreen-loading';
const Register = (props) => {
    const { push } = React.useContext(RouterContext)
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [middle, setMiddle] = useState(undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const loading = props.loading;
    const dispatch = props.dispatch;
    const reset = () => {
        setSuccess(false);
        setInvalid(false);
        setInvalidMessage("");
    }
    const handleClick = () => {
        const url = process.env.REACT_APP_BASE_URL + "/api/student/register";
        reset();

        if (!fname) {
            setInvalid(true);
            setInvalidMessage("First name cannot be empty!");
            return;
        }

        if (!lname) {
            setInvalid(true);
            setInvalidMessage("Last name cannot be empty!");
            return;
        }

        if (!email) {
            setInvalid(true);
            setInvalidMessage("Email cannot be empty!");
            return;
        }

        if (!email.endsWith('@warhawks.ulm.edu')) {
            setInvalid(true);
            setInvalidMessage("Email must end with @warhawks.ulm.edu!");
            return;
        }

        if (!password) {
            setInvalid(true);
            setInvalidMessage("Password cannot be empty!");
            return;
        }

        if (password.length < 6) {
            setInvalid(true);
            setInvalidMessage("Password must be at least 6 characters long!");
            return;
        }

        if (password !== cpassword) {
            setInvalid(true);
            setInvalidMessage("Passwords do not match!");
            return;
        }
        dispatch({
            type: "LOADING",
        });
        axios.post(url, { fname, lname, middle, email, password })
            .then(response => {
                setSuccess(true);
                setTimeout(() => {
                    push('/login');
                }, 4000);
                dispatch({
                    type: "NOT_LOADING",
                });
            })
            .catch(err => {
                if (err.response === undefined) {
                    setInvalid(true);
                    setInvalidMessage("No internet connection");
                    return;
                }
                if (err.response.status === 409) {
                    setInvalid(true);
                    setInvalidMessage("User with given email is already registered!");
                }
                if (err.response.status === 400) {
                    setInvalid(true);
                    setInvalidMessage("There is some error with the form!");
                }
                dispatch({
                    type: "NOT_LOADING",
                });
            });
    }
    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }} animation={[{ "type": "zoomIn", "size": "large", "duration": 600 }, { "type": "fadeIn", "size": "large" }]}>
            <Loading loading={loading} background="#ddddddaa" loaderColor="#800029" />
            <Box align="center" justify="center">
                <img alt="logo" src={Logo} height="288px" width="288px" />
            </Box>
            <Box align="center" justify="center" direction="column">
                <Heading level="4" size="large" textAlign="center" truncate={false} margin={{ "bottom": "xsmall", "top": "xsmall" }}>
                    ULM Course Review<br />
                    {invalid ? <Button label={invalidMessage} plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                        : ""}
                    {success ? <Button label="Registered successfully, redirecting to login page..." plain disabled={false} color="status-ok" icon={<Checkmark color="status-ok" />} active={false} primary={false} reverse={false} secondary={false} />
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
                    <Text color="status-critical">
                        Please do not use your ULM Password.
                    </Text>
                    <TextInput reverse icon={<Lock />} name="password" placeholder="Password" type="password" value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                    <TextInput reverse icon={<Lock />} name="password" placeholder="Confirm password" type="password" value={cpassword} onChange={(event) => {
                        setCpassword(event.target.value);
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

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews,
    loading: state.loading,
});

export default connect(mapStateToProps)(Register);