let arr = []

const init = () => {
    fetchAllPokemon()
}

const fetchAllPokemon = async() => {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`)
        let data = await res.json()
        console.log(data)
        fetchEachPokemon(data.results)
    } catch (error) {
        console.error("Error fetching all Pokémon:", error)
    }
}

const fetchSinglePokemon = async (pokemon) => {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Fixed URL
        let data = await res.json()
        return data
    } catch (error) {
        console.error(`Error fetching Pokémon ${pokemon}:`, error)
    }
}

const fetchEachPokemon = async (pokemon) => {
    for (let i = 0; i < pokemon.length; i++) {
        let singlePokemon = await fetchSinglePokemon(pokemon[i].name)
        if (singlePokemon) {
            arr.push(singlePokemon)
        }
    }
    console.log(arr)
    ShowPokemon(arr)
}

const ShowPokemon = (pokemon) => {
    const output = document.querySelector(`.output`)
    const map = pokemon.map(each => {
        return `
            <div>
                <h1>${each.name}</h1>
                <img src="${each.sprites?.front_default || 'default-image.png'}" alt="${each.name}" />
                <p>Height: ${each.height}</p>
                <p>Weight: ${each.weight}</p>
                <p>Types: ${each.types.map(type => type.type.name).join(', ')}</p>

                <h2>Abilities</h2>
                <ul>
                    ${each.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}  
                </ul>
                
              

                <h2>Stats</h2>
                <ul>
                    ${each.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>

                <h2>Forms</h2>
                <ul>
                    ${each.forms.map(form => `<li>${form.name}</li>`).join('')}
                </ul>
                
                <h2>Species</h2>
                <p>${each.species.name}</p>
            </div>
            
            

        
        `
    }).join('')
    return output.innerHTML = map
}

// Initialize the process
init()