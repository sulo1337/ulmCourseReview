import { Box, Button, Grid, Heading } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { RouterContext } from '../App';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';

const Dashboard = () => {
    const { push } = React.useContext(RouterContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const authtoken = localStorage.getItem('x-auth-token');
        const url = "http://localhost:5000/api/review/my";

        if (!authtoken) {
            push('/index');
            return;
        }

        axios.get(url, {
            headers: {
                "x-auth-token": authtoken,
            }
        })
            .then(response => {
                setReviews(response.data);
            })
            .catch(err => {
                push('/index');
            })
    }, [push])

    return (
        <Box overflow="scroll" align="center" flex="grow" wrap={false}>
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false} overflow="visible" height="xxlarge">
                <SearchBar />
                <Box align="start" justify="center">
                    <Box align="start" justify="start" direction="column">
                        <Heading level="3" textAlign="start" margin="small">
                            Hi Sulochan, here are your reviews
              </Heading>
                        <Button label="Add a Review" margin={{ "left": "small" }} plain color="brand" icon={<Add />} active={false} onClick={() => push("/addreview")} />
                    </Box>
                    <Box align="center" justify="center">
                        <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="small">
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