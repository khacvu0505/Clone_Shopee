import { waitFor } from '@testing-library/react';
import { path } from 'src/constant/path';
import { renderWithRouter } from 'src/utils/__test__/testUtils';
import { saveAccessTokenToLocalStorage } from 'src/utils/auth';
import { describe, expect, it } from 'vitest';

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTIwVDAyOjI4OjU0LjE1M1oiLCJpYXQiOjE2ODcyMjgxMzQsImV4cCI6MTc4NzIyODEzM30.D3FmS6TrsezEWlAte6pH6W5z6HDngCvpIHI2IOtX0rk';

describe('Profile', () => {
  it('Display Profile Page', async () => {
    saveAccessTokenToLocalStorage(access_token);
    // container chỗ này là mấy component con render khi vào page /profile
    // Chỗ này muốn sử dụng container hay screen đều được
    const { container } = renderWithRouter({ route: path.profile });
    await waitFor(() => {
      // expect(screen.queryByText('Hồ Sơ Của Tôi')).toBeInTheDocument();

      // Option 2
      expect(container.querySelector('h1')?.textContent).toBe('Hồ Sơ Của Tôi');
    });
  });
});
