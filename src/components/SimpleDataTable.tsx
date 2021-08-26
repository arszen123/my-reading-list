import {
  Table, Tbody, Td, Tr,
} from '@chakra-ui/table';
import React from 'react';

type Props = {
  rows: {
    title: string,
    value: string | number,
  }[],
};
const SimpleDataTable: React.FC<Props> = ({ rows }) => {
  const rowLists = rows.map(({ title, value }) => (
    <Tr>
      <Td fontWeight="semibold">{title}</Td>
      <Td>{value}</Td>
    </Tr>
  ));
  return (
    <Table>
      <Tbody>
        {rowLists}
      </Tbody>
    </Table>
  );
};

export default SimpleDataTable;
