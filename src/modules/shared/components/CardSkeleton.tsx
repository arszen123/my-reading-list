import React from 'react';
import {
  AspectRatio,
  Box,
  Stack,
} from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/react';

const CardSkeleton: React.FC = () => (
  <Box
    maxW="md"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p="5"
    shadow="lg"
  >
    <Stack direction={['column', 'row']}>
      <AspectRatio
        maxW="400px"
        minW="100px"
        ratio={1 / 1.6}
        m="auto"
      >
        <Skeleton minW="100px" maxW="400px" />
      </AspectRatio>
      <Box pl="4" w="full" minW="200px">
        <Skeleton h="20px" mt="1" />
        <SkeletonText mt="4" mb="4" noOfLines={4} spacing="2" />
        <Stack direction="row" flex="1" pt="2">
          <Box flex="1" textAlign="center">
            <Skeleton h="40px" />
          </Box>
          <Box flex="1" textAlign="center">
            <Skeleton h="40px" />
          </Box>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default CardSkeleton;
