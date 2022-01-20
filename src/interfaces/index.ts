// Sign Up(Corder)
export interface CorderSignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  birthDay: string
  fileUrl: string
}

// Log In(Corder)
export interface CorderLogInParams {
  email: string
  password: string
}

// User(Corder)
export interface CorderUser {
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
