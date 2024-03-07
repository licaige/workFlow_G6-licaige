import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonService = createApi({
  reducerPath: 'pokemonService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})
