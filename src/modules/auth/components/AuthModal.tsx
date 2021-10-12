import React from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ModalBody, ModalHeader } from '@chakra-ui/react';
import { Auth } from './Auth';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Login</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Auth />
      </ModalBody>
    </ModalContent>
  </Modal>
);
