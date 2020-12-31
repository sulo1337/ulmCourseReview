import { Box, Button, Heading, Text } from 'grommet';
import React, { useEffect } from 'react';
import { RouterContext } from '../App';
import Logo from '../ulm-academic-logo-circle.png';
const Home = () => {
    const { push } = React.useContext(RouterContext)

    useEffect(() => {

    }, []);

    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }} animation={[{ "type": "zoomIn", "size": "large", "duration": 600 }, { "type": "fadeIn", "size": "large" }]}>
            <Box align="center" justify="center">
                <img alt="logo" src={Logo} />
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
                    <Text>
                        Please login or register to view/create course reviews.
            </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;