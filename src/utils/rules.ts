import type { RegisterOptions, UseFormGetValues } from 'react-hook-form' // Chỗ này là chỉ import type và interface của RegisterOptions
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

const handleConfirmPassword = (refField: string) => {
  return yup
    .string()
    .required('Confirm Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 160 - 160 ký tự')
    .oneOf([yup.ref(refField), null], 'Confirm Password phải trùng với Password')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password phải trùng với Password'
        : undefined
  }
})

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không đúng định dạng')
      .min(5, 'Độ dài từ 5 - 160 ký tự')
      .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
      .string()
      .required('Password là bắt buộc')
      .min(6, 'Độ dài từ 6 - 160 ký tự')
      .max(160, 'Độ dài từ 160 - 160 ký tự'),
    confirm_password: handleConfirmPassword('password'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_min) <= Number(price_max)
        }
        if (price_min === '' && price_max === '') return false

        return true
      }
    }),
    price_max: yup.string().test({
      name: 'price-max-not-allowed',
      message: 'Giá không phù hợp',
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent as { price_min: string; price_max: string }
        if (price_min !== '' && price_max !== '') {
          return Number(price_min) <= Number(price_max)
        }
        if (price_min === '' && price_max === '') return false

        return true
      }
    }),
    name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
  })
  .required()

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  new_password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 160 - 160 ký tự'),
  password: schema.fields['password'],
  confirm_password: handleConfirmPassword('new_password'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự')
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>
