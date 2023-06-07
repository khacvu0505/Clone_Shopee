import { expect } from 'vitest';
import { screen, waitFor, waitForOptions } from '@testing-library/dom';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const delay = (time: number) =>
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
  screen.debug(body, 999999);
};

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(<App />, { wrapper: BrowserRouter })
  };
};
