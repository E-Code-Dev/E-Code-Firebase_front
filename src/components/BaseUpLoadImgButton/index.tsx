import type { VFC, ChangeEvent, ReactNode } from 'react'

// MUI
import { Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

import UpLoadInput from './styled'

type FileUpProps = {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  disableElevation: boolean
}

const BaseUpLoadImgButton: VFC<FileUpProps> = (props) => {
  const { label, onChange, children, disableElevation } = props
  return (
    <label htmlFor={label}>
      <UpLoadInput
        type="file"
        accept=".jpg,.jpeg,.png,.svg"
        id={label}
        name={label}
        onChange={onChange}
      />

      <Button
        variant="contained"
        component="span"
        {...props}
        disableElevation={disableElevation}
        fullWidth
        startIcon={<PhotoCamera />}
        sx={{ marginTop: '32px', background: '#9be7ff' }}
      >
        {children}
      </Button>
    </label>
  )
}

export default BaseUpLoadImgButton
