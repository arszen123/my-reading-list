import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { IconExpandMore } from '../../shared/components/Icons';
import { DeleteAlertDialog } from '../../auth';

export const ProfileMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = getAuth();

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
        onDelete={onClose}
      />
    </>
  );
};
