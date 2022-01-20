import type { VFC } from 'react'
import type { Path, UseFormRegister } from 'react-hook-form'
import { IFormValues } from '../../types/FormValues'

// Styled
import FullWidthTextField from './styled'

type BaseInputProps = {
  fieldLabel: string
  type?: string
  defaultValue?: string | number
  placeholder?: string
  label: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  requiredFlag?: boolean
}

const BaseInput: VFC<BaseInputProps> = (props) => {
  const { fieldLabel, type, defaultValue, placeholder, register, label, requiredFlag } = props
  return (
    <FullWidthTextField
      variant="standard"
      label={fieldLabel}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register(label, { required: requiredFlag })}
    />
  )
}

export default BaseInput
