import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState } from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
  value?: number
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  value,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o, i) => (
        <option key={o + '-' + i} value={o}>
          {o}
        </option>
      ))
    : []

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e)
    onChangeOption && onChangeOption(+e.currentTarget.value)
  }

  return (
    <select value={value} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  )
}

export default SuperSelect
