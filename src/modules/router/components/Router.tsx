import React from 'react';
import { BrowserRouter as ReactRouter } from 'react-router-dom';
import { RouterContext } from '../context/route.context';
import { RouterService } from '../services/router.service';

type Props = {
  router: RouterService;
}

export const Router: React.FC<Props> = ({
  children,
  router,
}) => (
  <ReactRouter>
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  </ReactRouter>
);
