import { Box, Button, Card, CardBody, CardFooter, CardHeader, Paragraph, Text } from 'grommet';
import { Edit, Like, Star, StarHalf, Tag } from 'grommet-icons';
import React from 'react';
import { RouterContext } from '../App';
const ReviewItem = () => {
    const { push } = React.useContext(RouterContext)
    // const [cname, setCname] = useState("");
    // const [rname, setRname] = useState("");
    // const [prof, setProf] = useState("");
    return (<Card pad="medium" justify="center">
        <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Box align="start" justify="center">
                <Box align="center" justify="start" direction="row" gap="xxsmall">
                    <Text size="xlarge" color="brand">
                        CSCI 4065
          </Text>
                    <Button icon={<Edit />} onClick={() => push("/editreview")} />
                </Box>
                <Text size="medium" textAlign="start" color="brand">
                    Lon Smith
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
                    by Sulochan Acharya
        </Text>
                <Text size="xsmall" color="brand">
                    on 06/05/2020
        </Text>
                <Text size="medium" color="brand">
                    Fall 2020
        </Text>
            </Box>
        </CardHeader>
        <CardBody pad="small" fill="horizontal">
            <Box align="center" justify="end" direction="row" gap="small" margin={{ "right": "medium" }}>
                <Text size="small" color="brand">
                    Attendance: Mandatory
        </Text>
                <Box align="center" justify="center" direction="row-responsive" gap="xsmall">
                    <Text size="small" color="brand">
                        Textbook Required: Yes
          </Text>
                </Box>
            </Box>
            <Paragraph fill margin="none">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut sapien eget libero rutrum hendrerit. In non porttitor lorem. Mauris hendrerit leo et lectus molestie egestas. Nulla bibendum, leo vel aliquet maximus, sem magna euismod sapien, id iaculis sapien mi et dolor. Duis lacus odio, fermentum euismod eros non, malesuada facilisis quam. Etiam molestie sem ut mattis bibendum. Nulla ut dui sagittis, vehicula ipsum eu, tincidunt urna. Suspendisse et nulla turpis.
      </Paragraph>
        </CardBody>
        <CardFooter align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Box align="center" justify="center" direction="row-responsive">
                <Box align="baseline" justify="center" fill={false} width="xxsmall" direction="row" gap="xsmall">
                    <Like />
                    <Text size="small">
                        54
          </Text>
                </Box>
                <Box align="center" justify="center" margin={{ "left": "small" }} direction="row-responsive" gap="small">
                    <Button label="Extraordinary" size="small" primary disabled={false} color="dark-3" icon={<Tag />} active={false} />
                    <Button label="Entertainment" size="small" primary disabled={false} color="dark-3" icon={<Tag />} active={false} />
                </Box>
            </Box>
        </CardFooter>
    </Card>);
}
export default ReviewItem;