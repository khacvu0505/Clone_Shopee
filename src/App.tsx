import { useContext, useEffect } from 'react';
import useRouteElement from './useRouteElement';
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localStorageEventTarget } from './utils/auth';
import AppProvider, { AppContext } from './contexts/app.context';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: 0
    }
  }
});

function App() {
  const element = useRouteElement();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLocalStorage', reset);
    };
  }, [reset]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ErrorBoundary>
          {element}
          <ToastContainer limit={1} />
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
