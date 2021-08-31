import * as React from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  VisuallyHidden,
  useToast,
} from '@chakra-ui/react';
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { IconGoogle } from '../Icons';
import { DividerWithText } from './DividerWithText';
import { LoginForm } from './LoginForm';

const PROVIDER_GOOGLE = 'google';
const SOCIAL_LOGIN_PROVIDERS = {
  google: GoogleAuthProvider,
};

export const Auth: React.FC = () => {
  const auth = getAuth();
  const toast = useToast({ position: 'bottom-right', duration: 9000 });

  async function handlePasswordlessSignIn(email: string) {
    await sendSignInLinkToEmail(auth, email, {
      url: window.location.origin,
      handleCodeInApp: true,
    }).then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      toast({
        title: 'Authentication email sent!',
      });
    });
  }

  async function handleSocialSignIn(provider: string) {
    if (!isProviderExists(provider)) {
      throw new Error(`Provider "${provider}" not exists!`);
    }
    const ProviderClass = SOCIAL_LOGIN_PROVIDERS[provider];
    if (ProviderClass) {
      await signInWithPopup(
        auth,
        new ProviderClass(),
      );
    }
  }

  return (
    <Box maxW="md" mx="auto">
      <LoginForm onSubmit={handlePasswordlessSignIn} />
      <DividerWithText mt="6">or continue with</DividerWithText>
      <SimpleGrid mt="6" columns={1} spacing="3">
        <Button
          color="currentColor"
          variant="outline"
          onClick={() => handleSocialSignIn(PROVIDER_GOOGLE)}
        >
          <VisuallyHidden>Login with Google</VisuallyHidden>
          <IconGoogle />
        </Button>
      </SimpleGrid>
    </Box>
  );
};

function isProviderExists(
  key: string,
): key is keyof typeof SOCIAL_LOGIN_PROVIDERS {
  return key in SOCIAL_LOGIN_PROVIDERS;
}
