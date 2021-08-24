import React from 'react';
import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { IconMoon, IconSun } from '../Icons';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const toggleText = isDark ? 'Light' : 'Dark';

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={`Toggle ${toggleText}`}
      icon={isDark ? <IconSun /> : <IconMoon />}
    />
  );
};

export default ColorModeToggle;
