import React from 'react';
import loadingImg from 'src/images/loading.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  // type?: string
  isLoading?: boolean;
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export default function Button({ children, className, isLoading = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`flex items-center justify-center ${className} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {isLoading && <img src={loadingImg} alt='loading_img' className='img-fluid mr-2' width={20} />}
      {isLoading ? 'Đang xử lý ...' : children}
    </button>
  );
}
