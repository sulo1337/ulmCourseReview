import { Box, Button, Header, Nav, Text } from 'grommet';
import React from 'react';
import { RouterContext } from '../App';
import { connect } from 'react-redux';

const NavBar = (props) => {
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
                        <Button label="Logout" active={false} disabled={false} color="white" hoverIndicator={false} plain onClick={() => {
                            localStorage.removeItem('x-auth-token');
                            localStorage.removeItem('fname');
                            localStorage.removeItem('id');
                            props.dispatch({
                                type: "UPDATE_COURSES",
                                payload: []
                            });
                            props.dispatch({
                                type: "UPDATE_PROFESSORS",
                                payload: []
                            });
                            props.dispatch({
                                type: "UPDATE_MYREVIEWS",
                                payload: []
                            });
                            push('/index');
                        }} />
                    </Box>
                </Box>
            </Box>
        </Nav>
    </Header>);
}

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews
});

export default connect(mapStateToProps)(NavBar);