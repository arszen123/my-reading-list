import * as React from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react';

type Props = Omit<HTMLChakraProps<'form'>, 'onSubmit'> & {
  onSubmit: (email: string) => void;
};

export const LoginForm: React.FC<Props> = (props) => {
  const { onSubmit, ...formProps } = props;

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        onSubmit(formData.get('email')?.toString() ?? '');
      }}
      {...formProps}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
};
