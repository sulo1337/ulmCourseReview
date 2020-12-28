import { Box, Button, Card, CardBody, CardFooter, CardHeader, Paragraph, Text } from 'grommet';
import { Edit, Like, Star, StarHalf, Tag } from 'grommet-icons';
import React from 'react';
import { RouterContext } from '../App';
const ReviewItem = (props) => {
    const { push } = React.useContext(RouterContext)
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
    const upvote = props.review.upvote;
    const anon = false;

    const tagButtons = tags.map((tag, index) => {
        return (<Button key={index} label={tag} size="small" primary disabled={false} color="dark-3" icon={<Tag />} active={false} />);
    })
    return (<Card pad="medium" justify="center">
        <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Box align="start" justify="center">
                <Box align="center" justify="start" direction="row" gap="xxsmall">
                    <Text size="xlarge" color="brand">
                        {ccode}
                    </Text>
                    <Button icon={<Edit />} onClick={() => push("/editreview")} />
                </Box>
                <Text size="xsmall" textAlign="start" color="brand">
                    {cname}
                </Text>
                <Text size="medium" textAlign="start" color="brand">
                    {prof}
                </Text>
                <Box align="center" justify="center" direction="row">
                    <Star color="graph-1" />
                    <Star color="graph-1" />
                    <StarHalf color="graph-1" />
                    <Star color="active" />
                    <Star color="active" />
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
                    <Like />
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
export default ReviewItem;