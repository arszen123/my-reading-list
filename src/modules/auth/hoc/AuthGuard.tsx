import React from 'react';
import { useRouter } from '../../router';
import { Loading } from '../../shared/components/Loading';
import { useUser } from '../hooks/auth';

export const AuthGuard = (
  WrappedComponent: React.ComponentType,
  redirectTo: string,
): React.ComponentType => () => (
  <AuthGuardComponent redirectTo={redirectTo}>
    <WrappedComponent />
  </AuthGuardComponent>
);

type AuthGuardComponentProps = {
  redirectTo: string;
}

const AuthGuardComponent: React.FC<AuthGuardComponentProps> = ({
  children,
  redirectTo,
}) => {
  const userResponse = useUser();
  const router = useRouter();

  const isAuthenticated = userResponse.user !== null;
  if (!userResponse.isLoading) {
    if (isAuthenticated) {
      return <>{ children }</>;
    }

    router.goto(redirectTo);

    return <></>;
  }

  return <Loading />;
};
