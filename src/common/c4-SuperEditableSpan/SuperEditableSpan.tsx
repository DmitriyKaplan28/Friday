import React, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState } from 'react'

import SuperInputText from '../c1-SuperInputText/SuperInputText'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
  spanProps?: DefaultSpanPropsType
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    onEnter && onEnter()
    setEditMode(false)
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(e)
    setEditMode(false)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onDoubleClick && onDoubleClick(e)
    setEditMode(true)
  }

  const spanClassName = `${'сделать красивый стиль для спана'} ${className}`

  return (
    <>
      {editMode ? (
        <SuperInputText
          autoFocus
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          {...restProps}
        />
      ) : (
        <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
          {children || restProps.value}
        </span>
      )}
    </>
  )
}

export default SuperEditableSpan
