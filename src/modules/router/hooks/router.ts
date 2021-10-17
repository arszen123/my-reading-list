import { useContext } from 'react';
import { useHistory as useReactRouterHistory } from 'react-router';
import { RouterContext } from '../context/route.context';
import { RouteParams } from '../types/route.type';

type Router = {
  goto: (name: string, params?: RouteParams) => void;
  compile: (name: string, params?: RouteParams) => string;
}

export const useRouter = (): Router => {
  const history = useReactRouterHistory();
  const router = useContext(RouterContext);

  return {
    goto: (name: string, params: RouteParams = {}) => {
      history.push(router.compile(name, params));
    },
    compile: (
      name: string,
      params: RouteParams = {},
    ) => router.compile(name, params),
  };
};
