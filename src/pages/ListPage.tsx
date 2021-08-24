import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import Card from '../components/Card';

const ListPage: React.FC = () => {
  const list = new Array(10).fill(0).map(() => <Card />);
  return (
    <SimpleGrid columns={[1, null, 2]} spacing={10}>
      {list}
    </SimpleGrid>
  );
};

export default ListPage;
