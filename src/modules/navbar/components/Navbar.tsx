import React from 'react';
import { Box, Stack } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import Searchbox from './Searchbox';
import ColorModeToggle from './ColorModeToggle';
import { LoginButton } from './LoginButton';
import { useUser } from '../../../hooks/auth';
import { ProfileMenu } from './ProfileMenu';

const Navbar: React.FC = () => {
  const history = useHistory();
  const user = useUser();

  function handleSubmit(text: string) {
    history.push(`/search/${text}`);
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

export default Navbar;
