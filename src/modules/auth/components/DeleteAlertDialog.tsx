import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { useUser } from '../hooks/auth';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteAlertDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const toast = useToast({ position: 'bottom-right', duration: 9000 });
  const cancelRef = useRef<any>();
  const user = useUser();

  function handleDelete() {
    user?.delete()
      .then(() => onDelete())
      .catch(() => {
      // TODO reauthenticate
        toast({
          title: 'Failed to delete profile',
          description: 'Reauthenticate and try again',
          status: 'error',
        });
      });
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
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
