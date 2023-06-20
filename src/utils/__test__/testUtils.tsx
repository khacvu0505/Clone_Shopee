import { expect } from 'vitest';
import { screen, waitFor, waitForOptions } from '@testing-library/dom';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppProvider, { getInitialContext } from 'src/contexts/app.context';

export const delay = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {};
  await waitFor(
    async () => {
      expect(await delay(timeout - 500)).toBe(true);
    },
    {
      ...options
    }
  );
  screen.debug(body, 999999999999);
};

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // No more errors in the console
      error: () => null
    }
  });
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Provider;
};

export const Provider = createWrapper();

export const renderWithRouter = ({ route = '/' } = {}) => {
  const defaultValue = getInitialContext();
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValue}>
          <App />
        </AppProvider>
      </Provider>,
      { wrapper: BrowserRouter }
    )
  };
};
