import { Text } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowBack } from '../modules/shared/components/Icons';

const NotFoundPage: React.FC = () => (
  <>
    <Text as="h1" fontSize="3xl">
      Oops. Whatever you&apos;re looking for doesn&apos;t seem to exist.
    </Text>
    <Link to="/">
      <Text fontSize="lg">
        <IconArrowBack />
        Lets go back to the home page
      </Text>
    </Link>
  </>
);

export default NotFoundPage;
