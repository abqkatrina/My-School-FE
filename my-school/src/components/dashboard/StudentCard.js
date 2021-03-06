import React, { useEffect, useState } from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Flex, Image, IconButton, Heading, Text } from "@chakra-ui/core";
import placeholder from "../../assets/placeholder_img.png";
import { connect } from 'react-redux';
import { getAllActivitiesForUser } from '../../redux/actions/portfolio-actions'
import moment from 'moment';
import { useHistory } from 'react-router-dom'
import capitalizeName from '../../utils/capitalizeName'

const StudentCard = ({ student, familyName }) => {
  const history = useHistory()
  const [recent, setRecent] = useState({})

  const pushToPortfolio = (studentId) => {
    history.push(`/portfolio/${studentId}`);
  };

  const handleActivities = () => {
    axiosWithAuth()
      .get(`https://my-school-v1.herokuapp.com/api/users/${student.id}/activities`)
      .then(res => {
        setRecent(res.data[res.data.length - 1])
      })
      .catch(err => console.log(err))
  }

  useEffect(handleActivities, [student.id])

  return (
    <Flex width={['90vw', '90vw', '400px', '25vw']} direction="column" margin="4px" border="1px solid #ededed" borderRadius='15px' padding='1%' height={['30vh', '30vh', '30vh', '18vh']} justify='space-evenly'>
      <Flex justify='space-between'>
{ !student.profile_picture ?
        <Image src={placeholder} size="45px" rounded="full" flexWrap="wrap" />
        :
        <Image src={student.profile_picture} size="45px" rounded="full" flexWrap="wrap" />
}
        <Flex direction="column" width="70%">
          <Heading as="h3" fontSize='1.2rem'>{capitalizeName(student.name)}'s Portfolio</Heading>
          <Text>{capitalizeName(student.name)} {familyName && capitalizeName(familyName)}</Text>
        </Flex>
        <IconButton icon="arrow-right" width='15%' variant='ghost' variantColor='blue' onClick={() => pushToPortfolio(student.id)} />
      </Flex>
      <Flex direction='column'>
        <Text fontWeight='800' fontSize='.9rem'>RECENT ACTIVITY</Text>
        {recent ? <Text>{moment.utc(recent.created_at).format('ll').toUpperCase()} SUBMITTED {recent.name}</Text> : `${capitalizeName(student.name)} has not tracked any activities yet`}
      </Flex>
    </Flex>
  );
};

export default connect(() => { return {} }, { getAllActivitiesForUser })(StudentCard)
// export default StudentCard
// export default connect(mapStateToProps, { getFamily })(AdminDash);