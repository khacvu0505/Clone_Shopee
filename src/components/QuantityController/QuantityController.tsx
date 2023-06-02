import React, { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: QuantityProps) {
  const [localValue, setLocalValue] = useState<number>(1)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value)
    if (max !== undefined && value > max) {
      value = max
    } else if (value < 1) {
      value = undefined as any
    }
    onType && onType(event)
    setLocalValue(value)
  }

  const increase = () => {
    let _value = Number(value) + 1

    if (max !== undefined && _value > max) {
      _value = max
    }
    setLocalValue(_value)
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value <= 1) {
      _value = 1
    }
    setLocalValue(_value)
    onDecrease && onDecrease(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = +event.target.value || 1
    if (onFocusOut) {
      onFocusOut(value)
      return
    }
    setLocalValue(value)
  }

  return (
    <div className={'flex items-center' + classNameWrapper}>
      <button
        disabled={value === 1}
        onClick={decrease}
        className='flex h-10 w-8 items-center justify-center rounded-l-sm border  border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        className='w-[100px] text-center'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        onClick={increase}
        className='flex h-10 w-8 items-center justify-center rounded-l-sm border  border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
