import axios from 'axios';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Paragraph, Text } from 'grommet';
import { Like, Tag } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { RouterContext } from '../App';
import Delete from './Delete';
const ReviewItem = (props) => {
    const { push } = React.useContext(RouterContext);
    let myreviews = props.myreviews;
    const dispatch = props.dispatch;
    const reviewid = props.review._id;
    const rating = props.review.rating;
    const ccode = props.review.course.ccode;
    const rname = props.review.student.fname + " " + props.review.student.lname;
    const cname = props.review.course.cname;
    const prof = props.review.professor.fname + " " + props.review.professor.lname;
    const attendance = props.review.attendance;
    const textbook = props.review.textbook;
    const tags = props.review.tags;
    const sem = props.review.sem;
    const year = props.review.year;
    const date = props.review.date;
    const desc = props.review.description;
    const [upvote, setUpvote] = useState(props.review.upvote);
    const anon = props.review.anon;
    const deletable = props.deletable;
    const tagButtons = tags.map((tag, index) => {
        return (<Button key={index} label={tag} size="small" primary disabled={false} color="dark-3" icon={<Tag />} active={false} />);
    })

    const handleLike = () => {
        let newupvote = [];
        const id = localStorage.getItem('id');
        if (upvote.includes(id)) {
            //downvote
            newupvote = [...upvote];
            newupvote = newupvote.filter(item => item !== id);
            const url = "http://localhost:5000/api/review/downvote/" + reviewid;
            axios.put(url, [], {
                headers: {
                    "x-auth-token": localStorage.getItem('x-auth-token')
                }
            })
                .catch(err => {
                    console.log(err.response);
                });
        } else {
            //upvote
            newupvote = [...upvote];
            newupvote.push(id);
            const url = "http://localhost:5000/api/review/upvote/" + reviewid;
            axios.put(url, [], {
                headers: {
                    "x-auth-token": localStorage.getItem('x-auth-token')
                }
            })
                .catch(err => {
                    console.log(err.response);
                });
        }
        setUpvote(newupvote);
        let updatedreviews = myreviews;
        updatedreviews = updatedreviews.filter(item => {
            if (item._id == reviewid) {
                item.upvote = newupvote;
            }
            return item;
        });

        dispatch({
            type: "UPDATE_MYREVIEWS",
            payload: updatedreviews
        });
    }

    const handleDelete = () => {
        const url = "http://localhost:5000/api/review/" + reviewid;
        axios.delete(url, {
            headers: {
                "x-auth-token": localStorage.getItem('x-auth-token')
            }
        }).then(response => {
            dispatch({
                type: "UPDATE_MYREVIEWS",
                payload: response.data
            });
        })
            .catch(err => {
                console.log(err.response);
            })
    }
    return (<Card pad="medium" justify="center" background="light-1">
        <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Box align="start" justify="center">
                <Box align="center" justify="start" direction="row" gap="xxsmall">
                    <Text size="xlarge" color="brand">
                        {ccode}
                    </Text>
                    {deletable
                        ? <Delete onDelete={handleDelete} />
                        : ""}
                </Box>
                <Text size="xsmall" textAlign="start" color="brand">
                    {cname}
                </Text>
                <Text size="medium" textAlign="start" color="brand">
                    {prof}
                </Text>
                <Box align="center" justify="center" direction="row" style={{
                    transform: "scale(1.5)",
                    margin: "0 0 0 15px"
                }}>
                    <StarRatingComponent
                        name="reviewrate"
                        starCount={5}
                        value={rating}
                        editing={false}
                    />
                </Box>
            </Box>
            <Box align="end" justify="center" width="small">
                <Text size="xsmall" color="brand">
                    by {anon ? "Anonymous" : rname}
                </Text>
                <Text size="xsmall" color="brand">
                    on {date.slice(0, 10)}
                </Text>
                <Text size="medium" color="brand">
                    {sem + " " + year.slice(0, 4)}
                </Text>
            </Box>
        </CardHeader>
        <CardBody pad="small" fill="horizontal">
            <Box align="center" justify="end" direction="row" gap="small" margin={{ "right": "medium" }}>
                <Text size="small" color="brand">
                    Attendance: {attendance}
                </Text>
                <Box align="center" justify="center" direction="row-responsive" gap="xsmall">
                    <Text size="small" color="brand">
                        Textbook Required: {textbook ? "Yes" : "No"}
                    </Text>
                </Box>
            </Box>
            <Paragraph fill margin="none">
                {desc}
            </Paragraph>
        </CardBody>
        <CardFooter align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Box align="center" justify="center" direction="row-responsive">
                <Box align="baseline" justify="center" fill={false} width="xxsmall" direction="row" gap="xsmall">
                    <Button plain icon={<Like />} hoverIndicator disabled={false} primary reverse={false} color={
                        upvote.includes(localStorage.getItem('id')) ? "black" : "white"
                    } onClick={handleLike} />
                    <Text size="small">
                        {upvote.length}
                    </Text>
                </Box>
                <Box align="center" justify="center" margin={{ "left": "small" }} direction="row-responsive" gap="small">
                    {tagButtons}
                </Box>
            </Box>
        </CardFooter>
    </Card>);
}
const mapStateToProps = state => ({
    professors: state.professors,
    courses: state.courses,
    myreviews: state.myreviews
});

export default connect(mapStateToProps)(ReviewItem);