import React from 'react'
import type { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form'

interface Props<Data extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  errorMessage?: string
  // placeholder?: string
  className?: string
  name: Path<Data>
  register?: UseFormRegister<Data>
  rules?: RegisterOptions
  autoComplete?: string
}

// interface InputProps {
//   type: React.HTMLInputTypeAttribute
//   errorMessage?: string
//   placeholder?: string
//   className?: string
//   name: string
//   register: UseFormRegister<any>
//   rules?: RegisterOptions
//   autoComplete?: string
// }

export default function Input<Data extends FieldValues>({
  // type,
  errorMessage,
  // placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
  ...rest
}: Props<Data>) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        // type={type}
        // placeholder={placeholder}
        {...rest}
        className='w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
        // className={className}
        // {...register(name, rules)}
        {...registerResult}
        autoComplete={autoComplete}
      />
      {errorMessage && <div className='mt-1 min-h-[1.2rem] text-sm italic text-red-600'>{errorMessage}</div>}
    </div>
  )
}