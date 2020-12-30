import React from 'react';
import { Box, Text } from 'grommet';

const RichTabTitle = (props) => {
    return (
        <Box direction="row" align="center" gap="xsmall" margin="xsmall">
            {props.icon}
            <Text size="small">
                <strong>{props.label}</strong>
            </Text>
        </Box>
    )
}
export default RichTabTitle;