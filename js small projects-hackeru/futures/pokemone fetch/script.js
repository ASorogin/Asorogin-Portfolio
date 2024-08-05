let allPokemonNames = [];

// Fetch all Pokémon names from the API
async function fetchAllPokemonNames() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        allPokemonNames = data.results.map(pokemon => pokemon.name);
    } catch (error) {
        console.error('Error fetching Pokémon names:', error);
    }
}

// Call the function to fetch Pokémon names when the script loads
fetchAllPokemonNames();

function filterPokemon() {
    const input = document.getElementById("pokemonName").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (input.length === 0) {
        suggestions.style.display = 'none'; // Hide suggestions if input is empty
        return;
    }

    // Filter Pokémon names based on input
    const filteredPokemon = allPokemonNames.filter(pokemon => pokemon.startsWith(input)).slice(0, 20);

    // Display suggestions if there are any matches
    if (filteredPokemon.length > 0) {
        suggestions.style.display = 'block';
        filteredPokemon.forEach(pokemon => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = pokemon;
            div.onclick = () => selectPokemon(pokemon);
            suggestions.appendChild(div);
        });
    } else {
        suggestions.style.display = 'none';
    }
}

function selectPokemon(pokemon) {
    document.getElementById("pokemonName").value = pokemon;
    document.getElementById("suggestions").style.display = 'none';
}

// Use this function to fetch and display Pokémon data
async function fetchData(){
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        // Display Pokémon sprite
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // Display abilities
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        const abilityElement = document.getElementById("ability");
        abilityElement.textContent = "Abilities: " + abilities;
        abilityElement.style.display = "block";

        // Display weight
        const weightElement = document.getElementById("weight");
        weightElement.textContent = "Weight: " + (data.weight / 10) + " kg"; // Convert hectograms to kilograms
        weightElement.style.display = "block";

        // Display height
        const heightElement = document.getElementById("height");
        heightElement.textContent = "Height: " + (data.height / 10) + " m"; // Convert decimeters to meters
        heightElement.style.display = "block";

        // Display types
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const typeElement = document.getElementById("type");
        typeElement.textContent = "Type: " + types;
        typeElement.style.display = "block";

        // Display base stats
        displayBaseStats(data.stats);

    } catch(error) {
        console.error(error);
    }
}

function displayBaseStats(stats) {
    const statsElement = document.createElement('div');
    statsElement.id = "baseStats";
    statsElement.style.marginTop = "10px";

    const statsHeader = document.createElement('h3');
    statsHeader.textContent = "Base Stats";
    statsElement.appendChild(statsHeader);

    stats.forEach(statInfo => {
        const statName = statInfo.stat.name;
        const statValue = statInfo.base_stat;

        const statElement = document.createElement('p');
        statElement.textContent = `${capitalizeFirstLetter(statName)}: ${statValue}`;
        statsElement.appendChild(statElement);
    });

    // Check if stats element already exists and replace it
    const existingStatsElement = document.getElementById("baseStats");
    if (existingStatsElement) {
        existingStatsElement.replaceWith(statsElement);
    } else {
        document.querySelector('.card').appendChild(statsElement);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
