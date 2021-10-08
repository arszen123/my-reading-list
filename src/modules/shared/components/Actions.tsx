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
import { BookState } from '../../../hooks/user-books';

type Props = {
  state?: BookState;
  onRemove: () => void;
  onStateChange: (state: BookState) => void;
};

const Actions: React.FC<Props> = ({ state, onStateChange, onRemove }) => {
  const isSaved = typeof state !== 'undefined';

  const handleStateChange = (newState: string | string[]) => {
    onStateChange(newState as BookState);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<IconExpandMore />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          onChange={handleStateChange}
          value={state}
        >
          <MenuItemOption value="want_to_read">Want to read</MenuItemOption>
          <MenuItemOption value="ready_to_read">Ready to read</MenuItemOption>
          <MenuItemOption value="reading">Reading</MenuItemOption>
          <MenuItemOption value="finished">Finished</MenuItemOption>
        </MenuOptionGroup>
        {isSaved && (
        <>
          <MenuDivider />
          <MenuItem color="red" onClick={onRemove}>Remove</MenuItem>
        </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Actions;
