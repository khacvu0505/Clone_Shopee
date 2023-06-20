import React, { createContext } from 'react';
import { ExtendedPurchases } from 'src/types/purchase.type';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLocalStorage, getProfile } from 'src/utils/auth';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchases: ExtendedPurchases[];
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>;
  reset: () => void;
}

export const getInitialContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
});

const initialContext = getInitialContext();

export const AppContext = createContext<AppContextInterface>(initialContext);

const AppProvider = ({
  children,
  defaultValue = initialContext
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(defaultValue.isAuthenticated);
  const [profile, setProfile] = React.useState<User | null>(defaultValue.profile);
  const [extendedPurchases, setExtendedPurchases] = React.useState<ExtendedPurchases[]>(defaultValue.extendedPurchases);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setExtendedPurchases([]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
