import { Box, Button, Heading, Image, TextInput } from 'grommet';
import { Lock, Mail } from 'grommet-icons';
import React from 'react';
import { RouterContext } from '../App';

const Login = () => {
    const { push } = React.useContext(RouterContext)
    return (
        <Box align="center" justify="center" height="xlarge" background={{ "color": "white" }}>
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
                    <TextInput name="email" placeholder="Please enter your email." reverse icon={<Mail />} />
                    <TextInput reverse icon={<Lock />} name="password" placeholder="Please enter your password." />
                    <Box align="center" justify="center" width="small">
                        <Button label="Login" margin="xsmall" primary secondary={false} reverse={false} gap="xxsmall" fill="horizontal" onClick={() => push("/dashboard")} />
                        <Button label="Register Instead" hoverIndicator={false} primary margin="xsmall" fill="horizontal" onClick={() => push("/register")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;