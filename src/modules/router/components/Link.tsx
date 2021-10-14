import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { RouteParams } from '../types/route.type';
import { useRouter } from '../hooks/router';

type Props = {
  to: string;
  params?: RouteParams;
};

export const Link: React.FC<Props> = ({ to, params, children }) => {
  const router = useRouter();
  const path = router.compile(to, params || {});

  return (
    <ReactRouterLink to={path}>
      {children}
    </ReactRouterLink>
  );
};
