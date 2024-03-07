
import { pokemonService } from 'store/pokemon'

const { useGetPokemonByNameQuery } = pokemonService

export function Pokemon() {
  const { data, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  return (
    isLoading ? <div>Loading...</div> : (
      <div>
        <h3>{data.species.name}</h3>
        <img src={data.sprites.front_shiny} alt={data.species.name} />
      </div>
    )
  )
}