import React from 'react';
import { Button } from '@chakra-ui/button';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/menu';
import { IconExpandMore } from './Icons';

const Actions: React.FC = () => {
  const isSaved = false;
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<IconExpandMore />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuOptionGroup type="radio">
          <MenuItemOption value="want_to_read">Want to read</MenuItemOption>
          <MenuItemOption value="ready_to_read">Ready to read</MenuItemOption>
          <MenuItemOption value="reading">Reading</MenuItemOption>
          <MenuItemOption value="finished">Finished</MenuItemOption>
        </MenuOptionGroup>
        {isSaved && (
        <>
          <MenuDivider />
          <MenuItem color="red">Remove</MenuItem>
        </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Actions;
