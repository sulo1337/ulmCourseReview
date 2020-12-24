import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Heading, RadioButtonGroup, Select, Text, TextArea, TextInput } from 'grommet';
import React from 'react';
import { RouterContext } from '../App';
const ReviewForm = () => {
    const { push } = React.useContext(RouterContext)

    return (
        <Box align="center" justify="center">
            <Grid columns={{ "size": "medium", "count": "fit" }} gap="medium" pad="small">
                <Card pad="xsmall" justify="center" align="start">
                    <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="xsmall">
                        <Box align="center" justify="between" direction="row" fill="horizontal">
                            <Heading level="4" margin="xsmall" color="brand">
                                Add a Review
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
                                    <TextInput plain={false} placeholder="UNIV 1001" />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="medium">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Professor
                    </Text>
                                    <TextInput plain={false} placeholder="John Doe" />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="medium" hoverIndicator={false}>
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Your review
                    </Text>
                                    <TextArea resize="vertical" placeholder="Upto 300 characters..." size="medium" plain={false} fill={false} />
                                </Box>
                            </Box>
                            <Box align="start" justify="center">
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="small">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Year
                    </Text>
                                    <Select options={["2019", "2018"]} placeholder="YYYY" />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall" width="small">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Semester
                    </Text>
                                    <Select options={["Fall", "Spring", "Summer", "Winter", "Maymester"]} placeholder="---" />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Textbook Required
                    </Text>
                                    <RadioButtonGroup options={["Yes", "No"]} direction="row" />
                                </Box>
                                <Box align="start" justify="start" gap="xxsmall" pad="xsmall">
                                    <Text margin={{ "left": "small" }} color="brand">
                                        Attendance
                    </Text>
                                    <RadioButtonGroup options={["Mandatory", "Not required"]} direction="row" />
                                </Box>
                            </Box>
                        </Box>
                    </CardBody>
                    <CardFooter align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
                        <Box align="center" justify="center" direction="row-responsive" gap="medium" fill="horizontal" pad="xsmall">
                            <Button label="Add" primary />
                            <Button label="Cancel" onClick={() => push("/dashboard")} />
                        </Box>
                    </CardFooter>
                </Card>
            </Grid>
        </Box>
    )
}

export default ReviewForm;