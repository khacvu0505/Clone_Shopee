import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { schema, Schema } from 'src/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppContext } from 'src/contexts/app.context';

// React Query
import { useMutation } from '@tanstack/react-query';
import { login } from 'src/api/auth.api';
import { isAxiosUnprocessableEntity } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { path } from 'src/constant/path';

// interface IFormInput {
//   email: string
//   password: string
// }
type IFormInput = Pick<Schema, 'email' | 'password'>;

const loginSchema = schema.pick(['email', 'password']);
// const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = React.useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  });

  // Mutations
  const loginMutation = useMutation({
    mutationFn: (body: IFormInput) => login(body)
  });
  // handleSubmitForm
  const onSubmit: SubmitHandler<IFormInput> = (body) => {
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate(path.home);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<IFormInput>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof IFormInput, {
                message: formError[key as keyof IFormInput],
                type: 'Server'
              });
            });
          }
        }
      }
    });
  };

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-20 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email'
                className='email-input mt-8'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                className='mt-2'
                type='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  id='btn-submit-login'
                  isLoading={loginMutation.isLoading}
                  className={`w-full rounded-sm bg-red-500 py-4 px-2 text-center uppercase text-white hover:bg-red-600`}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-300'>Bạn mới biết đến Shopee?</span>
                <Link to='/register' className='ml-1 decoration-slice italic text-red-400 underline'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
