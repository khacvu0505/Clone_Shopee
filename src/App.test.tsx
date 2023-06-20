import { describe, expect, test } from 'vitest';
// app.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider, logScreen, renderWithRouter } from './utils/__test__/testUtils';
import { path } from './constant/path';

// test the same with it

describe('App', () => {
  test('App render và chuyển trang', async () => {
    // Chỗ này render component App
    render(
      <Provider>
        <App />
      </Provider>,
      {
        wrapper: BrowserRouter
      }
    );

    /**
     * waitFor: sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định : timeout = 1000ms và interval = 50ms
     */

    // verify vào đúng trang chủ
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
        // Option 2
        // expect(screen.getByText('Trang chủ | Shopee Clone')).toBeInTheDocument();
      },
      {
        timeout: 2000
      }
    );

    // Chỗ này sẽ in ra cho chúng ta thấy là render ra cái gì
    // screen.debug(document.parentElement as HTMLElement, 999999);
  });

  test('Test Page Navigate to Login Page', async () => {
    // Verify chuyển trang
    const user = userEvent.setup();
    await user.click(screen.getByText('Đăng nhập'));
    await waitFor(
      () => {
        expect(screen.queryByText('Bạn mới biết đến Shopee?')).toBeInTheDocument();
      },
      {
        timeout: 2000
      }
    );
  });

  test('Test Page Not Found', async () => {
    const badRoute = '/some/bad/route';

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Provider>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      // check text is Page Not Fount contain in the screen
      // Chữ "i" chỗ này là không phân biệt chữ hoa, thường
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });

    // func console.log screen => debug terminal
    // await logScreen();
  });

  test('Render Register Page', async () => {
    // option 1
    // window.history.pushState({}, 'Test page', path.register)
    // render(<App />, {
    //   wrapper: BrowserRouter
    // })

    // option 2
    // render(
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // )

    // option 3: viết 1 function bên utils
    renderWithRouter({ route: path.register });

    await waitFor(() => {
      // check text is Page Not Fount contain in the screen
      // Chữ "i" chỗ này là không phân biệt chữ hoa, thường
      expect(screen.getByText(/Bạn đã có tài khoản chưa/i)).toBeInTheDocument();
    });

    // func console.log screen => debug terminal
    // await logScreen()
  });
});
