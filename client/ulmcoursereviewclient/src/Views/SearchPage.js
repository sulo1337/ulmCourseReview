import { Box, Grid, Heading, RadioButtonGroup, Select, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';
import { RouterContext } from '../App';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';
import { connect } from 'react-redux';

const SearchPage = (props) => {
    const { push } = React.useContext(RouterContext);

    const [reviews, setReviews] = useState([]);
    const [reviewFor, setReviewFor] = useState("");
    const reviewItems = reviews.map((review) => {
        return (<ReviewItem key={review._id} review={review} />);
    });
    const prof = props.professors;
    const course = props.courses;

    const search = () => {
        const searchType = localStorage.getItem('searchType');
        const searchId = localStorage.getItem('searchId');
        if (!searchType || !searchId) {
            push("/dashboard");
            return;
        }
        const url = "http://localhost:5000/api/review/" + searchType + "?id=" + searchId;
        axios.get(url)
            .then(response => {
                setReviews(response.data.reviews);
                if (searchType === "professor") {
                    setReviewFor(response.data.professor.fname + " " + response.data.professor.lname);
                }

                if (searchType === "course") {
                    setReviewFor(response.data.course.ccode);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        search();
    }, []);

    const handleSearch = (item) => {
        localStorage.setItem('searchId', item.id);
        localStorage.setItem('searchType', item.type);
        search();
    }
    return (
        <Box overflow="scroll" align="center" flex="grow" wrap={false}>
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false}>
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
                            <Select options={["Most Recent", "Least Recent", "Top Rated", "Most Liked"]} size="small" plain={false} placeholder="Sort by" />
                        </Box>
                    </Box>
                    <Box align="center" justify="center">
                        <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="xsmall">
                            {reviews.length !== 0 ? reviewItems : "There are no reviews yet."}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews
});

export default connect(mapStateToProps)(SearchPage);