import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Stack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import logo from '../../assets/poweredby_google.png';

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
    <Box>
      <InputGroup>
        <Input
          onKeyUp={handleKeyUp}
          onChange={(e) => setText(e.target.value)}
          value={text}
          pr="8.25rem"
          width="sm"
          placeholder="Search"
        />
        <InputRightElement w="8.0rem">
          <Stack
            direction="row"
            size="sm"
            marginRight="1.5"
          >
            <Button
              onClick={handleSubmit}
              h="1.75rem"
              size="sm"
            >
              Search
            </Button>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <Image
                src={logo}
                h="1.75rem"
              />
            </a>
          </Stack>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Searchbox;
