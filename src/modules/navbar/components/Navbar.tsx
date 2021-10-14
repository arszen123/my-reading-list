import React from 'react';
import { Box, Stack } from '@chakra-ui/layout';
import Searchbox from '../../shared/components/Searchbox';
import ColorModeToggle from './ColorModeToggle';
import { LoginButton } from './LoginButton';
import { useUser } from '../../auth';
import { ProfileMenu } from './ProfileMenu';
import { useRouter } from '../../router';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const user = useUser();

  function handleSubmit(text: string) {
    router.goto('books.search', {
      query: text,
    });
  }

  return (
    <Box
      textAlign="center"
      boxShadow="lg"
      p={5}
      pb={2}
      borderBottomWidth="1px"
    >
      <Stack
        spacing={[2, null, 8]}
        direction={['column', 'row']}
        justifyContent="flex-end"
      >
        <Searchbox onSubmit={handleSubmit} />
        <Stack direction={['column', 'row']}>
          <ColorModeToggle />
          {user === null ? <LoginButton /> : <ProfileMenu />}
        </Stack>
      </Stack>
    </Box>
  );
};
