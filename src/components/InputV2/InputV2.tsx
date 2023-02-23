import React, { useState } from 'react'
import { useForm, useController, UseControllerProps, FieldValue, FieldPath, FieldValues } from 'react-hook-form'

export interface InputV2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputV2Props) {
  const { type, onChange, className, value = '', ...rest } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const regex = /^\d+$/
    const numberCondition = type === 'number' && (regex.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật local value state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật vào state của react hook form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        {...rest}
        {...field}
        value={value || localValue}
        onChange={(event) => handleChange(event)}
        className='w-full rounded-sm border border-gray-300 p-3 focus:border-gray-500 focus:shadow-sm'
      />
      {/* {fieldState.error?.message && (
        <div className='mt-1 min-h-[1.2rem] text-sm italic text-red-600'>{fieldState.error.message}</div>
      )} */}
    </div>
  )
}
export default InputV2

// type Gen<TFunc> = {
//   getName: TFunc
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function Hexa<T extends () => string, TLastName extends ReturnType<T>>(props: { person: Gen<T>; lastName: TLastName }) {
//   return null
// }

// const handleName: () => 'duoc' = () => 'duoc'
// // const handleName = () => 'Duoc'

// function App() {
//   return <Hexa person={{ getName: handleName }} lastName='duoc' />
// }
