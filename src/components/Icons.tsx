/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';
import {
  MdArrowBack,
  MdStar,
  MdStarHalf,
  MdStarBorder,
  MdBrightness5,
  MdBrightness4,
  MdExpandMore,
} from 'react-icons/md';
import { IconType } from 'react-icons';

type IconProps = Omit<ChakraIconProps, 'as'>;

function Icon(icon: IconType): React.FC<IconProps> {
  return (props: IconProps) => (
    <ChakraIcon {...props} as={icon} />
  );
}

export const IconArrowBack = Icon(MdArrowBack);
export const IconStar = Icon(MdStar);
export const IconStarHalf = Icon(MdStarHalf);
export const IconStarEmpty = Icon(MdStarBorder);
export const IconSun = Icon(MdBrightness5);
export const IconMoon = Icon(MdBrightness4);
export const IconExpandMore = Icon(MdExpandMore);
