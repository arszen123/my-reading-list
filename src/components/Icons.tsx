/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import {
  MdArrowBack,
  MdStar,
  MdStarHalf,
  MdStarBorder,
  MdBrightness5,
  MdBrightness4,
  MdExpandMore,
} from 'react-icons/md';

export const IconArrowBack: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdArrowBack} />
);

export const IconStar: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdStar} />
);

export const IconStarHalf: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdStarHalf} />
);

export const IconStarEmpty: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdStarBorder} />
);

export const IconSun: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdBrightness5} />
);

export const IconMoon: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdBrightness4} />
);

export const IconExpandMore: React.FC<IconProps> = (props) => (
  <Icon {...props} as={MdExpandMore} />
);
