import { Box, Grid, Heading, Select } from 'grommet';
import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import { RouterContext } from '../App';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';
import { connect } from 'react-redux';
import Loading from 'react-fullscreen-loading';
const SearchPage = (props) => {
    const { push } = React.useContext(RouterContext);
    const loading = props.loading;
    const dispatch = props.dispatch;
    const [reviews, setReviews] = useState([]);
    const [reviewFor, setReviewFor] = useState("");
    const [sortBy, setSortBy] = useState("");
    const reviewItems = reviews.map((review) => {
        return (<ReviewItem key={review._id} review={review} />);
    });
    const prof = props.professors;
    const course = props.courses;

    const search = () => {
        setSortBy("");
        const searchType = localStorage.getItem('searchType');
        const searchId = localStorage.getItem('searchId');
        if (!searchType || !searchId) {
            push("/dashboard");
            return;
        }
        const url = process.env.REACT_APP_BASE_URL + "/api/review/" + searchType + "?id=" + searchId;
        dispatch({
            type: "LOADING",
        });
        axios.get(url)
            .then(response => {
                setReviews(response.data.reviews);
                if (searchType === "professor") {
                    setReviewFor(response.data.professor.fname + " " + response.data.professor.lname);
                }

                if (searchType === "course") {
                    setReviewFor(response.data.course.ccode);
                }
                dispatch({
                    type: "NOT_LOADING",
                });
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        search();
        //eslint-disable-next-line
    }, []);

    const handleSearch = (item) => {
        localStorage.setItem('searchId', item.id);
        localStorage.setItem('searchType', item.type);
        search();
    }

    const sort = (option) => {
        let newReviews = [...reviews];
        if (option === "Most Recent") {
            newReviews.sort((a, b) => (a.date < b.date) ? 1 : -1);
        }
        if (option === "Least Recent") {
            newReviews.sort((a, b) => (a.date > b.date) ? 1 : -1);
        }
        if (option === "Top Rated") {
            newReviews.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
        }
        if (option === "Most Liked") {
            newReviews.sort((a, b) => (a.upvote.length < b.upvote.length) ? 1 : -1);
        }
        setReviews(newReviews);
    }

    return (
        <Box align="center" flex="grow" wrap={false} height="xxlarge">
            <Loading loading={loading} background="#ddddddaa" loaderColor="#800029" />
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false}>
                <Box align="start" animation={[{ "type": "zoomIn", "size": "large", "duration": 600 }, { "type": "fadeIn", "size": "large" }]}>
                    <Box align="center" justify="center" gap="small" margin="small">
                        <SearchBar course={course} prof={prof} handleSearch={handleSearch} />
                    </Box>
                    <Box align="start" justify="center" pad="small">
                        <Box align="start" justify="start" direction="column" gap="xxsmall">
                            <Box align="center" justify="center">
                                <Heading level="3" textAlign="start" margin={{ "top": "xsmall", "vertical": "xsmall", "horizontal": "none", "bottom": "xsmall", "left": "none", "right": "none" }}>
                                    Reviews For {reviewFor}
                                </Heading>
                            </Box>
                            <Box align="center" justify="center" margin={{ "bottom": "medium" }}>
                                <Select options={["Most Recent", "Least Recent", "Top Rated", "Most Liked"]} value={sortBy} size="small" plain={false} placeholder="Sort by" onChange={(option) => {
                                    setSortBy(option.value);
                                    sort(option.value);
                                }} />
                            </Box>
                        </Box>
                        <Box align="center" justify="center">
                            <Box height="small">
                                <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="xsmall">
                                    {reviews.length !== 0 ? reviewItems : "There are no reviews yet."}
                                </Grid>
                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews,
    loading: state.loading
});

export default connect(mapStateToProps)(SearchPage);