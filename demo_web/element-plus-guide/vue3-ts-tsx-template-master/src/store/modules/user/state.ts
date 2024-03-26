export interface UserState {
  token: string
  roles: string
  nickname: string
}

export const state: UserState = {
  token: '',
  roles: '',
  nickname: '',
}
