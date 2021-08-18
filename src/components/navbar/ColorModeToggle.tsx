import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import {
  MdBrightness5 as IconSun,
  MdBrightness4 as IconMoon,
} from 'react-icons/md';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const toggleText = isDark ? 'Light' : 'Dark';

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={`Toggle ${toggleText}`}
      icon={<Icon as={isDark ? IconSun : IconMoon} />}
    />
  );
};

export default ColorModeToggle;
