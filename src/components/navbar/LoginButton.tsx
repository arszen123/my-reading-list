import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AuthModal } from '../auth/AuthModal';

export const LoginButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Login
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
