import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ListPage from './pages/ListPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Box
      p="20px"
      m="auto"
      maxW="fit-content"
    >
      <Switch>
        <Route path="/" exact>
          <ListPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Box>
  </Router>
);

export default App;
