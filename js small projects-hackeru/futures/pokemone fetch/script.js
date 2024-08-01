async function fetchData(){
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemoneSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const abilities = data.abilities;
        if (abilities.length > 0) {
            const abilityName = abilities[0].ability.name;
            const abilityElement = document.getElementById("ability");
            abilityElement.textContent = "Ability: " + abilityName;
            abilityElement.style.display = "block";
        } else {
            console.log("No abilities found for this Pokemon.");
            abilityElement.style.display = "none";
        }

        const weightElement = document.getElementById("weight");
        weightElement.textContent = "Weight: " + data.weight;
        weightElement.style.display = "block";


        const heightElement = document.getElementById("height");
        heightElement.textContent = "Height: " + data.height;
        heightElement.style.display = "block";


        const typeElement = document.getElementById("type");
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        typeElement.textContent = "Type: " + types;
        typeElement.style.display = "block";


    } catch(error) {
        console.error(error);
    }
}
