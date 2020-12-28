import axios from 'axios';
import { Box, Button, Grid, Heading } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { RouterContext } from '../App';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import SearchBar from '../Components/SearchBar';

const Dashboard = (props) => {
    const { push } = React.useContext(RouterContext);
    //eslint-disable-next-line
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const reviewItems = reviews.map((review) => {
        return (<ReviewItem key={review._id} review={review} />);
    });

    const [prof, setProf] = useState([]);
    const [course, setCourse] = useState([]);

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
                setName(localStorage.getItem('fname'));
            })
            .catch(err => {
                localStorage.removeItem('x-auth-token');
                localStorage.removeItem('fname');
                push('/index');
                return;
            });

        const profurl = "http://localhost:5000/api/professor";
        const courseurl = "http://localhost:5000/api/course";

        const profReq = axios.get(profurl);
        const courseReq = axios.get(courseurl);

        axios.all([profReq, courseReq]).then(axios.spread((...responses) => {
            const profRes = responses[0];
            const courseRes = responses[1];
            const profArray = profRes.data.map(prof => {
                return ({
                    id: prof._id,
                    name: prof.fname + " " + prof.lname,
                    type: "professor"
                })
            });

            const courseArray = courseRes.data.map(course => {
                return ({
                    id: course._id,
                    name: course.ccode,
                    type: "course"
                })
            });

            setProf(profArray);
            setCourse(courseArray);
        })).catch(err => {
            console.log(err.message);
        });
    }, [push]);

    const handleSearch = (item) => {
        localStorage.setItem('searchId', item.id);
        localStorage.setItem('searchType', item.type);
        push('/search');
    }

    return (
        <Box overflow="scroll" align="center" flex="grow" wrap={false}>
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false} overflow="visible" height="xxlarge">
                <SearchBar prof={prof} course={course} handleSearch={handleSearch} />
                <Box align="start" justify="center">
                    <Box align="start" justify="start" direction="column">
                        <Heading level="3" textAlign="start" margin="small">
                            Hi {name}, here are your reviews
              </Heading>
                        <Button label="Add a Review" margin={{ "left": "small" }} plain color="brand" icon={<Add />} active={false} onClick={() => push("/addreview")} />
                    </Box>
                    <Box align="center" justify="center">
                        <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="small">
                            {reviewItems}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard;