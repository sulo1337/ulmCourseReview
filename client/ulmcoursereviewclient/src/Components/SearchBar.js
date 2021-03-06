import { Box, RadioButtonGroup } from 'grommet';
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
const SearchBar = (props) => {
    const [searchBy, setSearchBy] = useState("By Course");
    const course = props.course;
    const prof = props.prof;
    const handleSearch = props.handleSearch;

    const handleOnSearch = (string, cached) => {
    }

    const handleOnSelect = item => {
        handleSearch({
            id: item.id,
            type: item.type
        });
    }

    const handleOnFocus = () => {
    }
    return (<Box align="center" justify="center" gap="small" margin="small">
        <div style={{ width: 250, zIndex: 2 }}>
            <ReactSearchAutocomplete
                items={searchBy === "By Course" ? course : prof}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                maxResults={5}
                placeholder="Search..."
                styling={
                    {
                        fontFamily: "Helvetica",
                        fontWeight: 'bold'
                    }
                }
                useCaching={false}
            />
        </div>
        <RadioButtonGroup value={searchBy} name="searchBy" options={["By Course", "By Professor"]} direction="row" onClick={(event) => {
            setSearchBy(event.target.value);
        }} />
    </Box>);
}
export default SearchBar;