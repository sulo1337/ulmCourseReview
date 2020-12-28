import axios from 'axios';
import { Box, Grid, Heading, Tabs, Tab } from 'grommet';
import React, { useEffect, useState } from 'react';
import { RouterContext } from '../App';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import SearchBar from '../Components/SearchBar';
import { connect } from 'react-redux';
import store from '../js/store/index';
import AddReview from '../Components/AddReview';
const Dashboard = (props) => {
    const { push } = React.useContext(RouterContext);
    const dispatch = props.dispatch;
    //eslint-disable-next-line
    let reviews = props.myreviews;
    const [name, setName] = useState("");
    const reviewItems = reviews.map((review) => {
        return (<ReviewItem key={review._id} review={review} editable={true} />);
    });
    const prof = props.professors;
    const course = props.courses;

    useEffect(() => {
        const authtoken = localStorage.getItem('x-auth-token');
        if (!authtoken) {
            push('/index');
            return;
        }
        setName(localStorage.getItem('fname'));
        const currentState = store.getState();
        if (currentState.myreviews.length !== 0 && currentState.professors.length !== 0 && currentState.courses.length !== 0) {

            return;
        }

        const url = "http://localhost:5000/api/review/my";
        const profurl = "http://localhost:5000/api/professor";
        const courseurl = "http://localhost:5000/api/course";

        const myReviewsReq = axios.get(url, {
            headers: {
                "x-auth-token": authtoken,
            }
        });
        const profReq = axios.get(profurl);
        const courseReq = axios.get(courseurl);

        axios.all([myReviewsReq, profReq, courseReq]).then(axios.spread((...responses) => {
            const myReviewsRes = responses[0];
            const profRes = responses[1];
            const courseRes = responses[2];
            dispatch({
                type: "UPDATE_MYREVIEWS",
                payload: myReviewsRes.data
            })

            const profArray = profRes.data.map(p => {
                return ({
                    id: p._id,
                    name: p.fname + " " + p.lname,
                    type: "professor"
                })
            });

            const courseArray = courseRes.data.map(c => {
                return ({
                    id: c._id,
                    name: c.ccode,
                    type: "course"
                })
            });

            dispatch({
                type: "UPDATE_COURSES",
                payload: courseArray
            });

            dispatch({
                type: "UPDATE_PROFESSORS",
                payload: profArray
            })
        })).catch(err => {
            console.log(err.message);
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('fname');
            push('/index');
        });
    }, []);

    const handleSearch = (item) => {
        localStorage.setItem('searchId', item.id);
        localStorage.setItem('searchType', item.type);
        push('/search');
    }

    return (
        <Box align="center" flex="grow" wrap={false}>
            <NavBar />

            <Tabs width="large">
                <Tab title="My Reviews">
                    <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false} overflow="visible" height="xxlarge">
                        <SearchBar prof={prof} course={course} handleSearch={handleSearch} />
                        <Box align="start" justify="center">
                            <Box align="start" justify="start" direction="column">
                                <Heading level="3" textAlign="start" margin="small">
                                    Hi {name}, here are your reviews
              </Heading>
                            </Box>
                            <Box align="center" justify="center">
                                <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="small">
                                    {reviewItems}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Tab>
                <Tab title="Add a Review">
                    <Box pad="medium">
                        <AddReview />
                    </Box>
                </Tab>
            </Tabs>
        </Box>
    )
}

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews
});

export default connect(mapStateToProps)(Dashboard);