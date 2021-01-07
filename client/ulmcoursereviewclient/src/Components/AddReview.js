import { Box, Button, Card, CardBody, CheckBox, CardFooter, CardHeader, Grid, Heading, RadioButtonGroup, Select, Text, TextArea } from 'grommet';
import { Alert, Checkmark } from 'grommet-icons';
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { connect } from 'react-redux';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

const AddReview = (props) => {
    const professors = props.professors;
    const courses = props.courses;
    const dispatch = props.dispatch;
    const [desc, setDesc] = useState("");
    const [year, setYear] = useState("");
    const [sem, setSem] = useState("");
    const [textbook, setTextbook] = useState(undefined);
    const [attendance, setAttendance] = useState(undefined);
    const [professor, setProfessor] = useState("");
    const [course, setCourse] = useState("");
    const [anon, setAnon] = useState(false);
    const upvote = [];
    const tags = [];
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [rating, setRating] = useState(0);

    const resetFormInput = () => {
        setDesc('');
        setYear('');
        setSem('');
        setTextbook(undefined);
        setAttendance("x");
        setProfessor("");
        setCourse("");
        setAnon(false);
    }
    const handleOnCourseSelect = (citem) => {
        setCourse(citem.id);
    }

    const handleOnProfessorSelect = (pitem) => {
        setProfessor(pitem.id);
    }

    const handleSubmit = () => {
        setInvalid(false);
        setError(false);
        setSuccess(false);
        setInvalidMessage("");

        if (!course) {
            setInvalid(true);
            setInvalidMessage("Please select a course to review.");
            return;
        }

        if (!professor) {
            setInvalid(true);
            setInvalidMessage("Please select a professor.");
            return;
        }

        if (!desc) {
            setInvalid(true);
            setInvalidMessage("Please type in a description");
            return;
        }

        if (rating === 0) {
            setInvalid(true);
            setInvalidMessage("Please provide a rating");
            return;
        }

        if (desc.length < 10 || desc.length > 300) {
            setInvalid(true);
            setInvalidMessage("Description must be between 10-300 characters.");
            return;
        }

        if (!course) {
            setInvalid(true);
            setInvalidMessage("Please select a course to review.");
            return;
        }

        if (year.length === 0) {
            setInvalid(true);
            setInvalidMessage("Please select a year.");
            return;
        }

        if (sem.length === 0) {
            setInvalid(true);
            setInvalidMessage("Please select a semester.");
            return;
        }

        if (textbook === undefined) {
            setInvalid(true);
            setInvalidMessage("Please specify textbook requirements.");
            return;
        }

        if (!attendance) {
            setInvalid(true);
            setInvalidMessage("Please specify attendance requirements.");
            return;
        }

        const review = {
            upvote,
            course,
            professor,
            attendance,
            textbook,
            sem,
            year,
            description: desc,
            tags,
            anon,
            rating
        }

        const url = process.env.REACT_APP_BASE_URL + "/api/review";
        const authtoken = localStorage.getItem('x-auth-token');
        setSuccess(false);
        setError(false);
        dispatch({
            type: "LOADING",
        });
        axios.post(url, review, {
            headers: {
                "x-auth-token": authtoken,
            }
        })
            .then(response => {
                setSuccess(true);
                dispatch({
                    type: "UPDATE_MYREVIEWS",
                    payload: response.data
                });
                resetFormInput();
                dispatch({
                    type: "NOT_LOADING",
                });
            })
            .catch(err => {
                setError(true);
                console.log(err.response);
            });
    }

    const ratingHandler = (star) => {
        console.log(star);
        setRating(star);
    }

    const generateYear = () => {
        const years = [];
        const currentYear = new Date().getFullYear();

        for (let i = 0; i <= 5; i++) {
            years.push((currentYear - i).toString());
        }
        return years;
    }
    return (
        <Box align="center" justify="center">
            <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="small">
                <Card pad="large" justify="center" align="start" background="light-1">
                    <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="xsmall">
                        <Box align="center" justify="between" direction="row" fill="horizontal">
                            <Heading level="3" margin="xsmall" color="brand">
                                Add a Review <br />
                                {invalid ? <Button label={invalidMessage} plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                                    : ""}
                                {success ? <Button label="Review added successfully." plain disabled={false} color="status-ok" icon={<Checkmark color="status-ok" />} active={false} primary={false} reverse={false} secondary={false} />
                                    : ""}
                                {error ? <Button label="There is some problem with the server." plain disabled={false} color="status-critical" icon={<Alert color="status-critical" />} active={false} primary={false} reverse={false} secondary={false} />
                                    : ""}
                            </Heading>
                        </Box>
                    </CardHeader>
                    <CardBody pad="small" fill="horizontal">
                        <Box align="center" justify="between" direction="row-responsive" fill="horizontal">
                            <Box align="start" justify="center">
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="medium">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Course
                    </Text>
                                    <div style={{ width: 250, zIndex: 3 }}>
                                        <ReactSearchAutocomplete
                                            key="courses"
                                            items={courses}
                                            onSelect={handleOnCourseSelect}
                                            maxResults={5}
                                            placeholder="UNIV 1001"
                                            fuseOptions={
                                                {
                                                    keys: ["name"]
                                                }
                                            }
                                            styling={
                                                {
                                                    fontFamily: "Helvetica",
                                                    fontWeight: 'bold',
                                                    borderRadius: '12px',
                                                    border: "1px solid #cccccc"
                                                }
                                            }
                                            useCaching={false}
                                        />
                                    </div>
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="medium">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Professor
                    </Text>
                                    <div style={{ width: 250, zIndex: 2 }}>
                                        <ReactSearchAutocomplete
                                            key="professors"
                                            items={professors}
                                            onSelect={handleOnProfessorSelect}
                                            maxResults={5}
                                            placeholder="John Doe"
                                            styling={
                                                {
                                                    fontFamily: "Helvetica",
                                                    fontWeight: 'bold',
                                                    borderRadius: '12px',
                                                    border: "1px solid #cccccc"
                                                }
                                            }
                                            useCaching={false}
                                        />
                                    </div>
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="medium" hoverIndicator={false}>
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Your review
                    </Text>
                                    <div style={
                                        {
                                            transform: "scale(2)",
                                            margin: "0 0 0 45px"
                                        }
                                    }>
                                        <StarRatingComponent
                                            name="reviewrate"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={ratingHandler}
                                        />
                                    </div>
                                    <TextArea resize="vertical" placeholder="Upto 300 characters..." size="medium" plain={false} fill={false} value={desc} onChange={(event) => {
                                        setDesc(event.target.value);
                                    }} />
                                </Box>
                            </Box>
                            <Box align="start" justify="center">
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="small">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Year
                    </Text>
                                    <Select options={generateYear()} value={year} placeholder="YYYY" onChange={({ option }) => {
                                        setYear(option);
                                    }} />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="small">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Semester
                    </Text>
                                    <Select options={["Fall", "Spring", "Summer", "Winter"]} value={sem} placeholder="---" onChange={({ option }) => {
                                        setSem(option);
                                    }} />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Textbook Required
                    </Text>
                                    <RadioButtonGroup value={textbook === undefined ? "x" : (textbook ? "Yes" : "No")} name="textbook" options={["Yes", "No"]} direction="row" onChange={(event) => {
                                        setTextbook(event.target.value === "Yes");
                                    }} />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Attendance
                    </Text>
                                    <RadioButtonGroup value={attendance} name="attendance" options={["Mandatory", "Not required"]} direction="row" onChange={(event) => {
                                        setAttendance(event.target.value);
                                    }} />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Anonymity
                                        <Text color="dark-1">
                                            <CheckBox
                                                checked={anon}
                                                label="Do not post your name on this review?"
                                                onChange={(event) => setAnon(event.target.checked)}
                                            />
                                        </Text>

                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </CardBody>
                    <CardFooter align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
                        <Box align="center" justify="center" direction="row-responsive" gap="medium" fill="horizontal" pad="xsmall">
                            <Button label="Add" primary onClick={handleSubmit} />
                        </Box>
                    </CardFooter>
                </Card>
            </Grid>
        </Box>
    )
}
const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews
});


export default connect(mapStateToProps)(AddReview);