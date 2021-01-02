import { Box, Button, Collapsible } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { Trash } from 'grommet-icons';
import React, { useState } from 'react';

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
                    direction="row"
                    gap="xsmall"
                >
                    <Button icon={<Checkmark color="status-critical" />} size="small" onClick={onDelete} />
                    <Button icon={<Close color="dark-1" />} size="small" onClick={() => {
                        setOpen(false);
                    }} />
                </Box>
            </Collapsible>
        </Box>
    )
}

export default Delete;