import { Box, Button, Heading, Image, TextInput } from 'grommet';
import { Lock, Mail } from 'grommet-icons';
import React from 'react';
import { RouterContext } from '../App';
const Register = () => {
    const { push } = React.useContext(RouterContext)

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
                    <TextInput name="First Name" placeholder="First Name" />
                    <TextInput name="Middle" placeholder="Middle" />
                    <TextInput name="Last Name" placeholder="Last Name" />
                    <TextInput icon={<Mail />} name="email" placeholder="Email" reverse />
                    <TextInput reverse icon={<Lock />} name="password" placeholder="Password" />
                    <Box align="center" justify="center">
                        <Button label="Register" hoverIndicator={false} primary margin="xsmall" fill="horizontal" onClick={() => push("/register")} />
                        <Button label="Login Instead" margin="xsmall" fill="horizontal" hoverIndicator={false} primary onClick={() => push("/login")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Register;