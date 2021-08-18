import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React, { useState } from 'react';

type Props = {
  onSubmit: (text: string) => void;
};

const Searchbox: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  function handleSubmit() {
    onSubmit(text);
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }
  return (
    <InputGroup size="md" justifyContent="flex-end">
      <Input
        onKeyUp={handleKeyUp}
        onChange={(e) => setText(e.target.value)}
        value={text}
        pr="4.75rem"
        width="sm"
        placeholder="Search"
      />
      <InputRightElement w="4.5rem">
        <Button
          onClick={handleSubmit}
          h="1.75rem"
          size="sm"
          marginRight="1.5"
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Searchbox;
