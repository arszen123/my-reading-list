import { useParams as useReactRouterParams } from 'react-router';

export const useParams = <Params extends {
  [K in keyof Params]?: string
}>(): Params => useReactRouterParams<Params>();
