import React, { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
  value?: number
}

const Select: React.FC<SelectPropsType> = ({
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

export default Select
