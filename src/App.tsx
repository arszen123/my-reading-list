import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import BookDetailsPage from './pages/BookDetailsPage';
import ListPage from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Box
      p="20px"
      m="auto"
      width="container.lg"
      maxW="fit-content"
    >
      <Switch>
        <Route path="/" exact>
          <ListPage />
        </Route>
        <Route path="/books" exact>
          <BookDetailsPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Box>
  </Router>
);

export default App;
