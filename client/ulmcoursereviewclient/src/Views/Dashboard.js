import { Box, Button, Grid, Heading } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';
import { RouterContext } from '../App';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import SearchBar from '../Components/SearchBar';
const Dashboard = () => {
    const { push } = React.useContext(RouterContext)

    return (
        <Box overflow="scroll" align="center" flex="grow" wrap={false}>
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false}>
                <SearchBar />
                <Box align="start" justify="center">
                    <Box align="start" justify="start" direction="column">
                        <Heading level="3" textAlign="start" margin="small">
                            Hi Sulochan, here are your reviews
              </Heading>
                        <Button label="Add a Review" margin={{ "left": "small" }} plain color="brand" icon={<Add />} active={false} onClick={() => push("/addreview")} />
                    </Box>
                    <Box align="center" justify="center">
                        <Grid columns={{ "size": ["large", "large"], "count": "fit" }} gap="medium" pad="small">
                            <ReviewItem />
                            <ReviewItem />
                            <ReviewItem />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard;