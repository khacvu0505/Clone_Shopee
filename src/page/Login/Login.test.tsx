import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { path } from 'src/constant/path';
import { logScreen, renderWithRouter } from 'src/utils/__test__/testUtils';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import Login from './Login';

// Chỗ này là bởi vì đang dùng vitest => nên sẽ khác 1 tí
expect.extend(matchers);

describe('Login', () => {
  beforeAll(async () => {
    renderWithRouter({ route: path.login });
    await waitFor(
      () => {
        expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.queryByText('Bạn mới biết đến Shopee?')).toBeInTheDocument();
      },
      {
        timeout: 2000
      }
    );
  });

  it('Hiển thị lỗi require khi không nhập gì', async () => {
    const submitBtn = document.getElementById('btn-submit-login') as Element;

    fireEvent.click(submitBtn);

    expect(await screen.findByText('Password là bắt buộc')).toBeTruthy();

    expect(await screen.findByText('Email là bắt buộc')).toBeTruthy();
  });
  it('Display error when Password is empty', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'demo@gmail.com' } });
    const submitBtn = document.getElementById('btn-submit-login') as Element;
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Password là bắt buộc')).toBeInTheDocument();
  });
  it('Display error when input email or password is incorrect', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'demo' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });

    const submitBtn = document.getElementById('btn-submit-login') as Element;
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Email không đúng định dạng')).toBeInTheDocument();
    expect(await screen.findByText('Độ dài từ 6 - 160 ký tự')).toBeInTheDocument();
  });
});
