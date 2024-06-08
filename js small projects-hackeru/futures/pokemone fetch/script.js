// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//   .then(response => {
//     if(!response.ok){
//         throw new Error("Could not fetch resource")
//     } return response.json();
//   })
//   .then(data => console.log(data.id))
//   .catch(error => console.error(error));
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
        }
    } catch(error) {
        console.error(error);
    }
}
