import { fireEvent, screen, waitFor } from '@testing-library/react';
import { path } from 'src/constant/path';
import { renderWithRouter } from 'src/utils/__test__/testUtils';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Register Page', () => {
  beforeAll(async () => {
    renderWithRouter({ route: path.register });
    await waitFor(
      () => {
        expect(screen.queryByPlaceholderText('Confirm password')).toBeInTheDocument();
        expect(screen.queryByText(/Bạn đã có tài khoản chưa/i)).toBeInTheDocument();
      },
      {
        timeout: 2000
      }
    );
  });

  it('Register Fail', async () => {
    const emailElement = document.querySelector('form input[type="email"]') as Element;
    const passwordElement = document.querySelector('form input[placeholder="Password"]') as Element;
    const confirmPasswordElement = document.querySelector('form input[placeholder="Confirm password"]') as Element;

    const btnSubmitElement = document.querySelector('form button') as Element;

    fireEvent.change(emailElement, { target: { value: 'hoangquyen8599@gmail.com' } });
    fireEvent.change(passwordElement, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordElement, { target: { value: '1234567' } });

    fireEvent.click(btnSubmitElement);
    await waitFor(
      () => {
        expect(screen.getByText(/Confirm Password phải trùng với Password/i)).toBeInTheDocument();
      },
      {
        timeout: 3000
      }
    );
  });

  // it('Register Successfully', async () => {
  //   const emailElement = document.querySelector('form input[type="email"]') as Element;
  //   const passwordElement = document.querySelector('form input[placeholder="Password"]') as Element;
  //   const confirmPasswordElement = document.querySelector('form input[placeholder="Confirm password"]') as Element;

  //   const btnSubmitElement = document.querySelector('form button') as Element;

  //   fireEvent.change(emailElement, { target: { value: `${Math.random()}@gmail.com` } });
  //   fireEvent.change(passwordElement, { target: { value: '123456' } });
  //   fireEvent.change(confirmPasswordElement, { target: { value: '123456' } });

  //   fireEvent.click(btnSubmitElement);
  //   await waitFor(
  //     () => {
  //       expect(screen.getByText(/Trang chủ | Shopee Clone/i)).toBeInTheDocument();
  //     },
  //     {
  //       timeout: 3000
  //     }
  //   );
  // });
});
