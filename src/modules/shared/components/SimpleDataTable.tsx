import React from 'react';
import {
  Table, Tbody, Td, Tr,
} from '@chakra-ui/table';

type Props = {
  rows: {
    title: string,
    value: string | number,
  }[],
};
const SimpleDataTable: React.FC<Props> = ({ rows }) => {
  const rowLists = rows.map(({ title, value }, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <Tr key={idx}>
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
