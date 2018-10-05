import React, { Component } from 'react'
import {
  InputContainer,
  StyledLabel,
  StyledInput,
} from '../styled/globalStyles'

export class LabelledInput extends Component {
  state = {
    isFocussed: false,
  }

  toggleFocus = e => {
    const v = e.target && e.target.value
    this.setState(({ isFocussed }) => ({
      isFocussed: v ? true : !isFocussed,
    }))
  }

  render() {
    const { id, value, type, label, onChange, ...rest } = this.props
    const { isFocussed } = this.state
    return (
      <InputContainer>
        <StyledLabel focus={isFocussed} htmlFor={id}>
          {label}
        </StyledLabel>
        <StyledInput
          type={type}
          focus={isFocussed}
          onChange={onChange}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          value={value}
          {...rest}
        />
      </InputContainer>
    )
  }
}
