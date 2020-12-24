import { Box, Button, Header, Nav, Text } from 'grommet';
import React from 'react';
import { RouterContext } from '../App';

const NavBar = () => {
    const { push } = React.useContext(RouterContext)
    return (<Header align="center" direction="row-responsive" flex={false} justify="between" gap="medium">
        <Nav align="start" direction="row-responsive" justify="end" background={{ "color": "brand" }}>
            <Box align="center" justify="between" direction="row" width="large" margin="medium">
                <Box align="center" justify="center">
                    <Text>
                        ULM Course Review
          </Text>
                </Box>
                <Box align="center" justify="end" direction="row" width="medium">
                    <Box align="center" justify="center" margin={{ "right": "medium" }}>
                        <Button label="My Reviews" plain primary={false} color="white" onClick={() => push("/dashboard")} />
                    </Box>
                    <Box align="center" justify="center">
                        <Button label="Logout" active={false} disabled={false} color="white" hoverIndicator={false} plain onClick={() => push("/index")} />
                    </Box>
                </Box>
            </Box>
        </Nav>
    </Header>);
}

export default NavBar;