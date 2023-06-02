import React, { forwardRef, useState } from 'react'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
    value,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const reg = /^\d+$/
    if (reg.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)

      // Cập nhật local value state
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input
        {...rest}
        value={value === undefined ? localValue : value}
        ref={ref}
        onChange={handleChange}
        className='h-10 w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
      />
      {errorMessage && <div className='mt-1 min-h-[1.2rem] text-sm italic text-red-600'>{errorMessage}</div>}
    </div>
  )
})
export default InputNumber
