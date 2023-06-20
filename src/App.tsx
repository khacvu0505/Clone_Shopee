import { useContext, useEffect } from 'react';
import useRouteElement from './useRouteElement';
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localStorageEventTarget } from './utils/auth';
import AppProvider, { AppContext } from './contexts/app.context';
import ErrorBoundary from './components/ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    <ErrorBoundary>
      {element}
      <ToastContainer limit={1} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ErrorBoundary>
  );
}

export default App;
