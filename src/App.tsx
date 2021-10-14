import React from 'react';
import { Box } from '@chakra-ui/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { useToast } from '@chakra-ui/toast';
import { Navbar } from './modules/navbar';
import {
  RouterOutlet,
  Router,
} from './modules/router';
import { router } from './modules/routes';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const toast = useToast({ position: 'bottom-right', duration: 9000 });

  checkEmailLinkAuthentication().catch(() => toast({
    title: 'Unable to authenticate. Please try again.',
    status: 'error',
  }));

  return (
    <Router router={router}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Box
          p="20px"
          m="auto"
          width="container.lg"
          maxW="fit-content"
        >
          <RouterOutlet />
        </Box>
      </QueryClientProvider>
    </Router>
  );
};

async function checkEmailLinkAuthentication() {
  // Confirm the link is a sign-in with email link.
  const auth = getAuth();
  const email = localStorage.getItem('emailForSignIn') as string | undefined;
  if (
    typeof email !== 'undefined'
  && isSignInWithEmailLink(auth, window.location.href)
  ) {
    await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem('emailForSignIn');
    window.location.href = window.location.origin;
  }
}

export default App;
