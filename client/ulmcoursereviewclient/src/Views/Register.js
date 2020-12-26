import { Box, Button, Heading, Image, TextInput } from 'grommet';
import { Lock, Mail } from 'grommet-icons';
import React, { useState } from 'react';
import { RouterContext } from '../App';
const Register = () => {
    const { push } = React.useContext(RouterContext)
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [middle, setMiddle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        <Button label="Register" hoverIndicator={false} primary margin="xsmall" fill="horizontal" onClick={() => console.log('here')} />
                        <Button label="Login Instead" margin="xsmall" fill="horizontal" hoverIndicator={false} primary onClick={() => push("/login")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;