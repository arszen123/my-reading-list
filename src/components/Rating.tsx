import React from 'react';
import { Box } from '@chakra-ui/layout';
import { IconStar, IconStarEmpty, IconStarHalf } from './Icons';

type Props = {
  rating: number;
  numOfRating: number;
};

const Rating: React.FC<Props> = ({ rating, numOfRating }) => {
  const list = new Array(5).fill(0).map((_, idx) => {
    const color = 'teal.500';
    if (idx < rating && rating < idx + 1) {
      return <IconStarHalf color={color} />;
    }
    if (idx >= rating) {
      return <IconStarEmpty color={color} />;
    }
    return <IconStar color={color} />;
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