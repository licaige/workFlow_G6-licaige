import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {},
  reducers: {},
})

export const pokemonActions = pokemonSlice.actions

export default pokemonSlice.reducer