import React, { useState } from 'react';
import { Box, Button, Text, Collapsible } from 'grommet';
import { Trash } from 'grommet-icons';

const Delete = (props) => {

    const onDelete = props.onDelete;
    const [open, setOpen] = useState(false);
    return (
        <Box direction="row-responsive" align="baseline">
            <Button icon={<Trash color="status-critical" />} onClick={() => {
                setOpen(!open)
            }} />
            <Collapsible open={open}>
                <Box
                    round="xsmall"
                    pad="xsmall"
                    align="center"
                    justify="center"
                    direction="row-responsive"
                    gap="xsmall"
                >
                    <Button label="Confirm" primary color="status-critical" size="small" onClick={onDelete} />
                    <Button label="Cancel" color="status-critical" size="small" onClick={() => {
                        setOpen(false);
                    }} />
                </Box>
            </Collapsible>
        </Box>
    )
}

export default Delete;