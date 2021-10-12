import React from 'react';
import { Select } from '@chakra-ui/select';
import { BookState, BOOK_STATES } from '../../types/book.type';

type StateFilterProps = {
  onChange: (state: BookState | undefined) => void;
};

export const StateFilter: React.FC<StateFilterProps> = ({ onChange }) => {
  const options = Object.entries(BOOK_STATES).map(
    ([key, value]) => <option key={key} value={key}>{value}</option>,
  );

  return (
    <Select
      w="200px"
      placeholder="All"
      onChange={(e) => onChange(e.target.value as BookState || undefined)}
    >
      {options}
    </Select>
  );
};
