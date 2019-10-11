import React, { useState } from 'react'
import {
  InputContainer,
  StyledLabel,
  StyledInput,
} from '../styled/globalStyles'

export const LabelledInput = ({
  id,
  value,
  type = 'text',
  label = '',
  onChange,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false)

  const toggleFocus = e => {
    const v = e.target && e.target.value
    setFocused(isFocused => (v ? true : !isFocused))
  }

  return (
    <InputContainer>
      <StyledLabel focus={isFocused} htmlFor={id}>
        {label}
      </StyledLabel>
      <StyledInput
        type={type}
        focus={isFocused}
        onChange={onChange}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        value={value}
        {...rest}
      />
    </InputContainer>
  )
}
