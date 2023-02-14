import React, { createContext } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getProfile } from 'src/utils/auth'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialContext.isAuthenticated)
  const [profile, setProfile] = React.useState<User | null>(initialContext.profile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
