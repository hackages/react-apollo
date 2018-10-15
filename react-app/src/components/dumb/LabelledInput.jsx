import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  InputContainer,
  StyledLabel,
  StyledInput,
} from '../styled/globalStyles'

const propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

const defaultProps = {
  type: 'text',
  label: '',
}

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

LabelledInput.propTypes = propTypes
LabelledInput.defaultProps = defaultProps
