import { Box, RadioButtonGroup, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import React from 'react';
const SearchBar = () => {
    return (<Box align="center" justify="center" gap="small" margin="small">
        <TextInput placeholder="Search..." icon={<Search />} />
        <RadioButtonGroup options={["By Professor", "By Course"]} direction="row" />
    </Box>);
}
export default SearchBar;