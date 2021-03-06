import { Box, Button, Heading } from 'grommet';
import React, { useEffect } from 'react';
import { RouterContext } from '../App';
import Logo from '../logo.png';
const Home = () => {
    const { push } = React.useContext(RouterContext)

    useEffect(() => {
        const authtoken = localStorage.getItem('x-auth-token');
        if (authtoken) {
            push('/dashboard');
            return;
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }} animation={[{ "type": "zoomIn", "size": "large", "duration": 600 }, { "type": "fadeIn", "size": "large" }]}>
            <Box align="center" justify="center">
                <img alt="logo" src={Logo} height="288px" width="288px" />
            </Box>
            <Box align="center" justify="center">
                <Heading level="4" size="large" textAlign="center" truncate={false} margin={{ "bottom": "none" }}>
                    ULM Course Review
          </Heading>
            </Box>
            <Box align="center" justify="center" direction="row">
                <Box align="center" justify="center" pad="small" gap="small" direction="column">
                    <Box align="center" justify="center">
                        <Button label="Login" margin="xsmall" primary secondary={false} reverse={false} gap="xxsmall" fill="horizontal" onClick={() => push("/login")} />
                        <Button label="Register" hoverIndicator={false} primary onClick={() => push("/register")} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;