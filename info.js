document.getElementById('search-button').addEventListener('click', async function() {
    const pokemonInput = document.getElementById('pokemon-input').value.toLowerCase(); 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`; 

    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json(); 
        displayPokemonInfo(data); 
    } catch (error) {
        document.getElementById('pokemon-info').innerHTML = `<p class="text-danger">${error.message}</p>`; 
    }
});

function displayPokemonInfo(data) {
    
    const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;

    const pokemonInfo = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid" />
        <p><strong>HP:</strong> ${hp}</p>
        <p><strong>Attack:</strong> ${attack}</p>
        <p><strong>Defense:</strong> ${defense}</p>
        <p><strong>Height:</strong> ${data.height / 10} m</p>
        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Moves:</strong> ${data.moves.slice(0, 3).map(move => move.move.name).join(', ')}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>`;

    document.getElementById('pokemon-info').innerHTML = pokemonInfo;
}

