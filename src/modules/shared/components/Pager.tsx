import React from 'react';
import { Button, Center, Stack } from '@chakra-ui/react';

type PagerProps = {
  page: number;
  onChange: (page: number) => void;
  maxPage?: number;

}

export const Pager: React.FC<PagerProps> = ({ page, onChange, maxPage }) => (
  <Center p={10}>
    <Stack direction="row" spacing={5}>
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => onChange(page + 1)}
        disabled={!!maxPage && maxPage === page}
      >
        Next
      </Button>
    </Stack>
  </Center>
);
