import { Box } from '@chakra-ui/layout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import BookDetailsPage from './pages/BookDetailsPage';
import ListPage from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient();

const App: React.FC = () => (
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
          <Route path="/search/:query/:page?">
            <ListPage />
          </Route>
          <Route path="/books/:id" exact>
            <BookDetailsPage />
          </Route>
          <Route path="/" exact />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Box>
    </QueryClientProvider>
  </Router>
);

export default App;
