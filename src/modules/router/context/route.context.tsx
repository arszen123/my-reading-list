import React from 'react';
import { RouterService } from '../services/router.service';

export const RouterContext = React.createContext<RouterService>(
  new RouterService([]),
);
