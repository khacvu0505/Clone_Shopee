import React, { forwardRef } from 'react'

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    // type,
    errorMessage,
    // placeholder,
    className,
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const reg = /^\d+$/
    if ((reg.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        {...rest}
        ref={ref}
        onChange={(event) => handleChange(event)}
        className='w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
      />
      {errorMessage && <div className='mt-1 min-h-[1.2rem] text-sm italic text-red-600'>{errorMessage}</div>}
    </div>
  )
})
export default InputNumber
