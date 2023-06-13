import React, { useEffect, useState } from 'react';
import range from 'lodash/range';

interface Props {
  onChange?: (value: Date) => void;
  value?: Date;
  errorMessage?: string;
}

const initialState = {
  date: 1,
  month: 0,
  year: 1990
};

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState(initialState);

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      });
    } else {
      setDate(initialState);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target;
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='w-full truncate pt-3 text-left capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='w-full pl-5 sm:w-[80%]'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            value={value ? value.getDate() : date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            value={value ? value.getMonth() + 1 : date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange'
            value={value ? value.getFullYear() : date.year}
          >
            <option disabled>Năm</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  );
}
