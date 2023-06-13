import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import { UserSchema, userSchema } from 'src/utils/rules';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from 'src/api/user.api';
import { toast } from 'react-toastify';
import omit from 'lodash/omit';
import { isAxiosUnprocessableEntity } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

type FormData = Pick<UserSchema, 'password' | 'confirm_password' | 'new_password'>;

const changePasswordSchema = userSchema.pick(['password', 'confirm_password', 'new_password']);

export default function ChangePassword() {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      updateProfileMutation.mutate(omit(data, ['confirm_password']), {
        onSuccess: (response) => {
          reset();
          toast.success(response.data.message, {
            autoClose: 1500
          });
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
            const formError = error.response?.data.data;
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof FormData, {
                  message: formError[key as keyof FormData] as string | undefined,
                  type: 'Server'
                });
              });
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt-8'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                type='password'
                name='password'
                className='px-3 py-2'
                register={register}
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                type='password'
                name='new_password'
                className='px-3 py-2'
                register={register}
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                type='password'
                name='confirm_password'
                className='px-3 py-2'
                register={register}
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'></div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
