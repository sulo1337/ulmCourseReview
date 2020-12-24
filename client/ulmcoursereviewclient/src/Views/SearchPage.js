import { Box, Grid, Heading, RadioButtonGroup, Select, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import React from 'react';
import NavBar from '../Components/NavBar';
import ReviewItem from '../Components/ReviewItem';

const SearchPage = () => {
    return (
        <Box overflow="scroll" align="center" flex="grow" wrap={false}>
            <NavBar />
            <Box align="start" justify="start" fill="vertical" width="large" pad="medium" direction="column" wrap={false}>
                <Box align="center" justify="center" gap="small" margin="small">
                    <TextInput placeholder="Search..." icon={<Search />} />
                    <RadioButtonGroup options={["By Professor", "By Course"]} direction="row" />
                </Box>
                <Box align="start" justify="center" pad="small">
                    <Box align="start" justify="start" direction="column" gap="xxsmall">
                        <Box align="center" justify="center">
                            <Heading level="3" textAlign="start" margin={{ "top": "xsmall", "vertical": "xsmall", "horizontal": "none", "bottom": "xsmall", "left": "none", "right": "none" }}>
                                Reviews For CSCI 4065
                </Heading>
                        </Box>
                        <Box align="center" justify="center" margin={{ "bottom": "medium" }}>
                            <Select options={["Most Recent", "Least Recent", "Top Rated", "Most Liked"]} size="small" plain={false} placeholder="Sort by" />
                        </Box>
                    </Box>
                    <Box align="center" justify="center">
                        <Grid columns={{ "size": ["small", "large"], "count": "fit" }} gap="medium" pad="xsmall">
                            <ReviewItem />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchPage;