import React, { useContext } from 'react';
import { Box, Stack } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import Searchbox from '../../shared/components/Searchbox';
import ColorModeToggle from './ColorModeToggle';
import { LoginButton } from './LoginButton';
import { useUser } from '../../auth';
import { ProfileMenu } from './ProfileMenu';
import { RouterContext } from '../../router';

export const Navbar: React.FC = () => {
  const history = useHistory();
  const router = useContext(RouterContext);
  const user = useUser();

  function handleSubmit(text: string) {
    history.push(router.compile('books.search', {
      query: text,
    }));
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
