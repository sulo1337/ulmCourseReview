import { Box, Button, Heading, Image, Text } from 'grommet';
import React from 'react';
import { RouterContext } from '../App';
const Home = () => {
    const { push } = React.useContext(RouterContext)

    return (
        <Box align="center" justify="center" height="large" background={{ "color": "white" }}>
            <Box align="center" justify="center">
                <Image src="https://www.ulm.edu/_resources/images/ulm-academic-logo-circle.png" />
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