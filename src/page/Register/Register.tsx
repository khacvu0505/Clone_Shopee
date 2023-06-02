import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
// import { getRules } from 'src/utils/rules'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

// React Query
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/api/auth.api'

// Lodash
import { omit } from 'lodash'

// Utils
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'

// interface IFormInput {
//   email: string
//   password: string
//   confirm_password: string
// }
type IFormInput = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const loginSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = React.useContext(AppContext)

  const {
    register,
    handleSubmit,

    setError,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  })

  // const rules = getRules(getValues)

  // Mutations
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<IFormInput, 'confirm_password'>) => registerAccount(body)
  })

  // handleSubmitForm
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    registerAccountMutation.mutate(omit(data, ['confirm_password']), {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<IFormInput, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<IFormInput, 'confirm_password'>, {
                message: formError[key as keyof Omit<IFormInput, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-20 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errorMessage={errors.email?.message}
                // rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                className='mt-2'
                errorMessage={errors.password?.message}
                // rules={rules.password}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Confirm password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  className={`w-full rounded-sm bg-red-500 py-4 px-2 text-center uppercase text-white hover:bg-red-600`}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-300'>Bạn đã có tài khoản chưa?</span>
                <Link to='/login' className='ml-1 decoration-slice italic text-red-400 underline'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
