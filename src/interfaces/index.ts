// Sign Up(Coder)
export interface CoderSignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  birthDay: string
  fileUrl: string
}

// Log In(Coder)
export interface CoderLogInParams {
  email: string
  password: string
}

// User(Coder)
export interface CoderUser {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  birthDay: string
  fileUrl: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
