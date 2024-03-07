import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TMicroApp } from 'microApp/types'
import { TCommonState } from './types'

const initialState: TCommonState = {
  currentApp: undefined,
  microAppIsLoading: true,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCurrentApp: (state, action: PayloadAction<TMicroApp>) => {
      state.currentApp = action.payload
    },
    setMicroAppIsLoading: (state, action: PayloadAction<boolean>) => {
      state.microAppIsLoading = action.payload
    }
  },
})

export const commonActions = commonSlice.actions

export default commonSlice.reducer