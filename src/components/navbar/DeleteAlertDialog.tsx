import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmed: () => void;
};

export const DeleteAlertDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirmed,
}) => {
  const cancelRef = useRef<any>();

  function handleConfirm() {
    onConfirmed();
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Profile
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No, I changed my mind
            </Button>
            <Button colorScheme="red" onClick={handleConfirm} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
