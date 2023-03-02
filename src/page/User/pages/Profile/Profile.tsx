import { useMutation, useQuery } from '@tanstack/react-query'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BodyUpdateProfile, getProfile, updateProfile, uploadAvatar } from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../components/DateSelect'
import { useQueryClientHook } from 'src/hooks/useQueryClient'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfile as setProfileLocalStorage } from 'src/utils/auth'
import { getUrlAvatar, isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='w-full pl-5 sm:w-[80%]'>
          <Input
            name='name'
            className='px-3 py-2'
            register={register}
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='w-full pl-5 sm:w-[80%]'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                className='px-3 py-2'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
          {/* */}
        </div>
      </div>
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>

type FormDataError = Omit<FormData, 'date_of_birth'> & { date_of_birth?: string }

const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])

export default function Profile() {
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = methods

  const queryClient = useQueryClientHook()
  const { setProfile } = useContext(AppContext)

  const [avatarUser, setAvatarUser] = useState<File | string>('')

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatar
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 0))
      setAvatarUser(profile.avatar || '')
    }
  }, [profile])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = ''
      if (typeof avatarUser !== 'string' && avatarUser) {
        const formData = new FormData()
        formData.append('image', avatarUser)
        const uploadAvatarResult = await uploadAvatarMutation.mutateAsync(formData)
        avatarName = uploadAvatarResult.data.data
        setValue('avatar', avatarName)
      }
      updateProfileMutation.mutate(
        { ...(data as BodyUpdateProfile), avatar: avatarName ? avatarName : data.avatar },
        {
          onSuccess: (response) => {
            setProfile(response.data.data)
            setProfileLocalStorage(response.data.data)
            toast.success(response.data.message, {
              autoClose: 1500
            })
            queryClient.invalidateQueries({ queryKey: ['profile'] })
          },
          onError: (error) => {
            if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
              const formError = error.response?.data.data
              if (formError) {
                Object.keys(formError).forEach((key) => {
                  setError(key as keyof FormDataError, {
                    message: formError[key as keyof FormDataError] as string | undefined,
                    type: 'Server'
                  })
                })
              }
            }
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  })

  const handleChangeFile = (file?: File) => {
    setAvatarUser(file as File)
  }

  if (!profile) return null
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form className='flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow pr-12 md:mt-8'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='w-full pl-5 sm:w-[80%]'>
                <div className='pt-3 text-gray-700'>{profile.email}</div>
              </div>
            </div>
            <Info />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='w-full pl-5 sm:w-[80%]'>
                <Input
                  name='address'
                  className='px-3 py-2'
                  register={register}
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    // {...field}
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
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
          <div className='flex flex-col items-center '>
            <div className='my-5 h-24 w-24'>
              {avatarUser && (
                <img
                  src={typeof avatarUser !== 'string' ? URL.createObjectURL(avatarUser) : getUrlAvatar(avatarUser)}
                  alt='img'
                  className='h-24 w-24 rounded-full object-cover'
                />
              )}
            </div>

            <InputFile onChange={handleChangeFile} />
            <div className='mt-3 text-gray-400'>Dụng lượng file tối đa 1 MB</div>
            <div className='mt-3 text-gray-400'>Định dạng:.JPEG, .PNG</div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
