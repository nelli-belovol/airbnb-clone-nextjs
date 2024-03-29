/* eslint-disable no-unused-vars */
'use client';
import useCountries from '@/app/hooks/useCountries';
import { FlagIcon } from 'react-flag-kit';
import Select from 'react-select';
import React from "react";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value: CountrySelectValue | undefined;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder='anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <FlagIcon code={option.value}
              size={24} />

            {/* <div>{option.flag}</div> */}
            <div>
              {option.label},{' '}
              <span className='ml-1 text-neutral-500'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'border-2 p-3',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
