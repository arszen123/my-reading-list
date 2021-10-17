/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box } from '@chakra-ui/layout';
import { IconStar, IconStarEmpty, IconStarHalf } from './Icons';

type Props = {
  rating: number;
  numOfRating: number;
};

const Rating: React.FC<Props> = ({ rating = 0, numOfRating = 0 }) => {
  const text = numOfRating === 0 ? 'No ratings available'
    : `${numOfRating} Ratings`;
  const list = new Array(5).fill(0).map((_, idx) => {
    const color = 'teal.500';
    if (idx < rating && rating < idx + 1) {
      return <IconStarHalf key={idx} color={color} />;
    }
    if (idx >= rating) {
      return <IconStarEmpty key={idx} color={color} />;
    }

    return <IconStar key={idx} color={color} />;
  });

  return (
    <Box textAlign="center">
      <Box>
        {list}
      </Box>
      <Box ml="2" fontSize="smaller" color="gray.600">
        {text}
      </Box>
    </Box>
  );
};

export default Rating;
