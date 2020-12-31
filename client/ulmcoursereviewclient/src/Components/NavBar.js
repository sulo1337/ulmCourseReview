import { Box, Button, Header, Nav, Heading } from 'grommet';
import React from 'react';
import { RouterContext } from '../App';
import { connect } from 'react-redux';

const NavBar = (props) => {
    const { push } = React.useContext(RouterContext)
    return (<Header align="center" direction="row-responsive" flex={false} justify="between" gap="medium">
        <Nav align="start" direction="row-responsive" justify="end" background={{ "color": "brand" }}>
            <Box align="center" justify="between" direction="row" width="large" margin="medium">
                <Box align="center" justify="center">
                    <Heading level="4" textAlign="start" margin="xsmall">
                        ULM Course Review
              </Heading>
                </Box>
                <Box align="center" justify="end" direction="row-responsive" width="medium">
                    <Box align="center" justify="center" margin={{ "right": "medium" }}>
                        <Button label="Dashboard" plain primary={false} color="white" onClick={() => push("/dashboard")} size="large" />
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
                            props.dispatch({
                                type: "NOT_LOADING",
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