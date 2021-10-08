import React from 'react';
import { Box } from '@chakra-ui/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { useToast } from '@chakra-ui/toast';
import Navbar from './components/navbar/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import { ProfileRouter } from './modules/profile/ProfileRouter';
import { LandingPage } from './pages/LandingPage';
import { BooksRouter } from './modules/books/BooksRouter';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const toast = useToast({ position: 'bottom-right', duration: 9000 });

  checkEmailLinkAuthentication().catch(() => toast({
    title: 'Unable to authenticate. Please try again.',
    status: 'error',
  }));

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Box
          p="20px"
          m="auto"
          width="container.lg"
          maxW="fit-content"
        >
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            {/* TODO: Fix router. For some reason the last router wont work */}
            <BooksRouter />
            <ProfileRouter />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
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
