import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.context';

export const useVerifyIsLogin = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated;
};
