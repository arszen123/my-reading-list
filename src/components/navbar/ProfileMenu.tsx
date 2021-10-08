import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/auth';
import { DeleteAlertDialog } from './DeleteAlertDialog';
import { IconExpandMore } from '../Icons';

export const ProfileMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ position: 'bottom-right', duration: 9000 });
  const user = useUser();
  const auth = getAuth();

  function handleDelete() {
    user?.delete().catch(() => {
      // TODO reauthenticate
      toast({
        title: 'Failed to delete profile',
        description: 'Reauthenticate and try again',
        status: 'error',
      });
    });
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="teal"
          rightIcon={<IconExpandMore />}
        >
          Profile
        </MenuButton>
        <MenuList>
          <Link to="/profile/saved-books"><MenuItem>My List</MenuItem></Link>
          <MenuItem onClick={() => signOut(auth)} color="red">Logout</MenuItem>
          <MenuDivider />
          <MenuGroup title="Danger zone">
            <MenuItem
              onClick={onOpen}
              color="red"
            >
              Delete Profile
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <DeleteAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirmed={handleDelete}
      />
    </>
  );
};
