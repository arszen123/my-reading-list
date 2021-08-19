import Icon from '@chakra-ui/icon';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
  MdStar as IconStar,
  MdStarHalf as IconStarHalf,
} from 'react-icons/md';

type Props = {
  rating: number;
  numOfRating: number;
};

const Rating: React.FC<Props> = ({ rating, numOfRating }) => {
  const list = new Array(5).fill(0).map((_, idx) => {
    const color = idx < rating ? 'teal.500' : 'gray.300';
    if (idx < rating && rating < idx + 1) {
      return <Icon as={IconStarHalf} color={color} />;
    }
    return <Icon as={IconStar} color={color} />;
  });

  return (
    <>
      <Box>
        {list}
      </Box>
      <Box ml="2" fontSize="smaller" color="gray.600">
        {numOfRating}
        {' '}
        Ratings
      </Box>
    </>
  );
};

export default Rating;
