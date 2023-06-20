import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { path } from 'src/constant/path';
import { logScreen, renderWithRouter } from 'src/utils/__test__/testUtils';
import { beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import Login from './Login';

// Chỗ này là bởi vì đang dùng vitest => nên sẽ khác 1 tí

describe('Login Page', () => {
  let emailElement: HTMLInputElement;
  let passwordElement: HTMLInputElement;
  let btnSubmitElement: HTMLInputElement;
  beforeAll(async () => {
    renderWithRouter({ route: path.login });
    await waitFor(
      () => {
        expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.queryByText('Bạn mới biết đến Shopee?')).toBeInTheDocument();

        emailElement = document.querySelector('form input[type="email"]') as HTMLInputElement;
        passwordElement = document.querySelector('form input[type="password"]') as HTMLInputElement;
        btnSubmitElement = document.querySelector('#btn-submit-login') as HTMLInputElement;
      },
      {
        timeout: 5000
      }
    );
  });

  it('Hiển thị lỗi require khi không nhập gì', async () => {
    fireEvent.click(btnSubmitElement);

    await waitFor(() => {
      expect(screen.queryByText('Password là bắt buộc')).toBeTruthy();
      expect(screen.queryByText('Email là bắt buộc')).toBeTruthy();
    });
  });

  it('Display error when Password is empty', async () => {
    fireEvent.change(emailElement, { target: { value: 'demo@gmail.com' } });
    const submitBtn = document.getElementById('btn-submit-login') as Element;
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Password là bắt buộc')).toBeInTheDocument();
  });

  it('Display error when input email or password is incorrect', async () => {
    fireEvent.change(emailElement, { target: { value: 'demo' } });
    fireEvent.change(passwordElement, { target: { value: '12345' } });

    const submitBtn = document.getElementById('btn-submit-login') as Element;
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Email không đúng định dạng')).toBeInTheDocument();
    expect(await screen.findByText('Độ dài từ 6 - 160 ký tự')).toBeInTheDocument();
  });

  it('Login successfully', async () => {
    fireEvent.change(emailElement, { target: { value: 'nkkhacvu32@gmail.com' } });
    fireEvent.change(passwordElement, { target: { value: '01699652356vV@' } });

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy();
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy();
    });
    fireEvent.click(btnSubmitElement);

    await waitFor(() => {
      // expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
      expect(screen.queryByText('Trang chủ | Shopee Clone')).toBeTruthy();
    });

    // await logScreen();
  });
});

// NOTES
// Những trường hợp chứng minh rằng tìm KHÔNG RA text hay element => ƯU TIÊN dùng query hơn là find hay get
// => Bới bì với screen.findByText return về Promise => mà nếu find k có thì nó sẽ thrown ra lỗi
// (Bài 239 phút thứ 7)

// Khi dùng viuws queryBy... => thì phải kết hợp với await waitFor(()=>{})
// Khi dùng với findByText => thì KHÔNG cần phải kết hợp với waitFor thì findByText nó return về Promise
