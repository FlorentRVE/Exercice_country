let app = document.getElementById("app"); // Notre container qui va accueillir le message
let dataExploit; // variable qui va accueillir les données

// ============= RECHERCHE =========
let inputText = document.getElementById("inputText"); // Champs de recherche

// ============ RANGE ================
let inputRange = document.getElementById("inputRange"); // Range input
let valueRange = document.getElementById("valueRange");
valueRange.textContent = inputRange.value;

// ============== BOUTON TRI ==================
let croissant = document.getElementById("croissant"); // Bouton croissant
let decroissant = document.getElementById("decroissant"); // Bouton décroissant
let alpha = document.getElementById("alpha"); // Bouton alphabétique

// ============ Appel API et récupérer les données ============
async function fetchCountries() {

    await fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        dataExploit = data; // On stocke les données dans notre variable
      });

}

// ================== Fonction de tri ================================

let sortMethod; // Variable qui va accueillir la méthode de tri

function sortDataExploit() {

    if (sortMethod === "croissant") {

        dataExploit.sort((a, b) => a.population - b.population);
    
    } else if (sortMethod === "decroissant") {
        
        dataExploit = dataExploit.sort((a, b) => b.population - a.population);
        
    } else if (sortMethod === "alphabetique") {
    
        dataExploit.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
}

// ===================== Affichage des pays ===========================
async function displayCountry() {

    await fetchCountries(); // On appelle la fonction fetchCountries
    
    app.innerHTML = ''; // On vide le container

    sortDataExploit(); // On trie les données si boutton tri choisi
    
    // On filtre les pays en fonction de la valeur de la barre de recherche
    const filteredCountries = dataExploit.filter((country) => {

    const { name } = country;
    
    const inputValue = inputText.value.toLowerCase();
    const commonName = name.common.toLowerCase();

    return commonName.includes(inputValue)
    
    });

    // On affiche le nombre de pays voulu 
    const slicedCountries = filteredCountries.slice(0, inputRange.value);

    // On crée un tableau avec chaque carte pays
    const countryCards = slicedCountries.map((country) => {

    const { name, capital, population, flags } = country;

        return `
        <div class="flex flex-col justify-center items-center bg-slate-800 text-white text-center rounded-2xl p-4 w-[352px]">
            <img src="${flags.png}" alt="" class="h-[213px] w-[320px]">
            <h1 class="font-bold text-2xl">${name.common}</h1>
            <p class="font-bold text-yellow-600">${capital}</p>
            <p>Population : ${population}</p>
        </div>
        `;
    });

    // Conversion du tableau en string pour affichage html
    app.innerHTML = countryCards.join("");

}

// ========== Appel de la fonction une 1ere fois ==========
displayCountry();

// ============= Quand les valeurs de recherche ou range changent on appelle la fonction avec les nouvelles valeurs ==========
inputText.addEventListener("input", (e) => {

    displayCountry();
});

inputRange.addEventListener("input", () => {

    valueRange.textContent = inputRange.value;
    displayCountry();
});

// ============== Quand les valeurs de tri change on appel la fonction avec les nouvelles valeurs ================

croissant.addEventListener("click", () => {
    
    sortMethod = "croissant";
    displayCountry();
})

decroissant.addEventListener("click", () => {
    
    sortMethod = "decroissant";
    displayCountry(); 
})

alpha.addEventListener("click", () => {
    
    sortMethod = "alphabetique";
    displayCountry();
})


