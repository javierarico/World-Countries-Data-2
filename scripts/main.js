document.body.style.fontFamily = "montserrat";
document.body.style.backgroundColor = "#ebebeb";

/*--- FIRST SECTION ---*/
let header = document.querySelector('#countries');

let title = document.querySelector('h2');
title.style.textAlign = "center";
title.style.color = "#fe9c2b";
title.style.fontSize = "2rem";
title.style.marginBottom = "0px";
title.style.letterSpacing = ".3rem";

let text1 = document.querySelector('.subtitle');
text1.textContent = "Currently, we have ";
text1.style.fontSize = ".9rem";
text1.style.textAlign = "center";
text1.style.marginTop = "1vh";

let text2 = document.createElement('span');
text1.appendChild(text2);
text2.textContent = "250 countries";

let searchText = document.querySelector('.result');
searchText.style.textAlign = "center";
searchText.style.fontSize = ".8rem";
searchText.style.display = "none";

/* FLAG SECTION */
let flagSection = document.querySelector('.flag-section');
flagSection.style.backgroundColor = "#ffffff";
flagSection.style.padding = "2rem 0"

/* SEARCH SECTION */
let inputDiv = document.createElement('div');
inputDiv.style.display = "flex";
inputDiv.style.alignItems = "center";
inputDiv.style.justifyContent = "center";
//inputDiv.style.margin = "3vh 0vw 3vh 0vw";
flagSection.appendChild(inputDiv);

let inputSearch = document.createElement('input');
inputSearch.placeholder = "Search country by name, city and languages";
inputSearch.style.fontSize = "70%";
inputSearch.style.borderRadius = "40px";
inputSearch.style.padding = "1vw";
inputSearch.style.outline = "1px solid #444"
inputSearch.style.width = "15rem";
inputSearch.style.border = "none";
inputDiv.appendChild(inputSearch);

/* BTNS */
let btnsDiv = document.createElement('div');
btnsDiv.style.display = "flex";
btnsDiv.style.alignItems = "center";
btnsDiv.style.justifyContent = "center";
btnsDiv.style.margin = "2vh 0";
flagSection.appendChild(btnsDiv);

let nameBtn = document.createElement('button');
nameBtn.textContent = "NAME";
nameBtn.style.fontSize = "60%";
nameBtn.style.padding = "1.5vh 2vw";
nameBtn.style.border = "none";
nameBtn.style.borderRadius = "40px";
nameBtn.style.backgroundColor = "#fe9c2b";
nameBtn.style.marginRight = ".5vw";
btnsDiv.appendChild(nameBtn);

let capitalBtn = document.createElement('button');
capitalBtn.textContent = "CAPITAL";
capitalBtn.style.fontSize = "60%";
capitalBtn.style.padding = "1.5vh 2vw";
capitalBtn.style.border = "none";
capitalBtn.style.borderRadius = "40px";
capitalBtn.style.backgroundColor = "#fe9c2b";
capitalBtn.style.marginRight = ".5vw";
btnsDiv.appendChild(capitalBtn);

let popuBtn = document.createElement('button');
popuBtn.textContent = "POPULATION";
popuBtn.style.fontSize = "60%";
popuBtn.style.padding = "1.5vh 2vw";
popuBtn.style.border = "none";
popuBtn.style.borderRadius = "40px";
popuBtn.style.backgroundColor = "#fe9c2b";
popuBtn.style.marginRight = ".5vw";
btnsDiv.appendChild(popuBtn);

let sortBtn = document.createElement('a');
sortBtn.href = "#graphic-section";
sortBtn.classList = "sort-btn";
sortBtn.innerHTML = `<i class="fa-solid fa-chart-column"></i>`;
sortBtn.style.fontSize = "100%";
sortBtn.style.color = "#fe9c2b";
sortBtn.style.backgroundColor = "transparent";
btnsDiv.appendChild(sortBtn);

/* GRID SECTION */
let cardSection = document.querySelector('.card-section');
cardSection.style.backgroundColor = "#ebebeb";

let gridContainer;
function createGridContainer(){
    gridContainer = document.createElement('div');
    //gridContainer.style.padding = "3rem 5rem";
    gridContainer.style.margin = "2rem";
    gridContainer.classList = "grid-container";
    gridContainer.style.display = "grid";
    gridContainer.style.gap = "1rem";
    gridContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    gridContainer.style.gridAutoRows = "300px";
    gridContainer.style.gridAutoColumns = "1fr";
    gridContainer.style.gridAutoFlow = "dense";
    cardSection.appendChild(gridContainer);
}

let gridItem;
let countryItem;
function createGridItem(){
    gridItem = document.createElement('div');
    gridItem.classList = "grid-item";
    gridItem.style.display = "flex";
    gridItem.style.flexDirection = "column";
    gridItem.style.justifyContent = "center";
    gridItem.style.backgroundColor = "#ffffff";
    gridContainer.appendChild(gridItem);

    countryFlagItem = document.createElement('img');
    countryFlagItem.classList = "country-item-flag";
    countryFlagItem.style.margin = "0 auto";
    countryFlagItem.style.width = "150px";
    countryFlagItem.style.height = "100px";
    gridItem.appendChild(countryFlagItem);

    countryItem = document.createElement('p');
    countryItem.classList = "country-item";
    countryItem.style.color = "#fe9c2b";
    countryItem.style.textAlign = "center";
    countryItem.style.fontSize = "80%";
    countryItem.style.fontWeight = "bolder";
    countryItem.style.margin = ".5rem";
    gridItem.appendChild(countryItem);

    capitalItem = document.createElement('p');
    capitalItem.classList = "capital-item";
    capitalItem.style.fontSize = "60%";
    capitalItem.style.margin = "0px 0px 5px 10px";
    gridItem.appendChild(capitalItem);
    
    langItem = document.createElement('p');
    langItem.classList = "lang-item";
    langItem.style.fontSize = "60%";
    langItem.style.margin = "0px 0px 5px 10px";
    gridItem.appendChild(langItem);

    populationItem = document.createElement('p');
    populationItem.classList = "population-item";
    populationItem.style.fontSize = "60%";
    populationItem.style.margin = "0px 0px 0px 10px";
    gridItem.appendChild(populationItem);
}

let dynamicCountryArr = [...countries_data];

function createGridCountriesDefault(arr){
    createGridContainer();
    for(let country of arr){
        createGridItem();
        countryFlagItem.src = country.flag;
        countryItem.textContent = country.name;
        capitalItem.textContent = `Capital: ${country.capital}`;
        langItem.textContent = `Language: ${country.languages.join(', ')}`;
        populationItem.textContent = `Population: ${country.population}`;
    }
}
createGridCountriesDefault(dynamicCountryArr);

function removeOldItems(){
    gridContainer.remove();
}


let search;
let starting;

/* EVENT LISTENERS */
let inputValue;
let numOfCountriesArr = [];

inputSearch.addEventListener('change', e => {
    numOfCountriesArr = [];
    dynamicCountryArr = []
    removeOldItems();
    createGridContainer();
    inputValue = e.target.value;
    inputValue = inputValue.toUpperCase();
    
    let newCountryArr = [...countries_data];

    // ENCUENTRA EL STRING QUE EMPIECE CON EL VALOR INGRESADO EN EL INPUT
    for(country of newCountryArr){
        countryCapital = country.capital.toUpperCase();
        //countryLang = country.languages.toUpperCase();
        countryName = country.name.toUpperCase();

        if(countryCapital.includes(inputValue) || countryName.includes(inputValue)){
            //console.log(country);
            dynamicCountryArr.push(country)
            //console.log(countryCapital)
            numOfCountriesArr.push(country);
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            let countryCapitalized = countryCapital.charAt(0).toUpperCase() + countryCapital.slice(1).toLowerCase();
            capitalItem.textContent = `Capital: ${countryCapitalized}`;
            langItem.textContent = `Language: ${country.languages.join(', ')}`;
            console.log(country.languages)
            populationItem.textContent = `Population: ${country.population}`;
            searchText.style.display = "block";
            searchText.textContent = `Countries including ${inputValue} are ${numOfCountriesArr.length}.`;
        }
    }
    inputSearch.value = "";
    nameBtn.innerHTML = `NAME`;
    capitalBtn.innerHTML = `CAPITAL`;
    popuBtn.innerHTML = `POPULATION`;
});

let nameCounter = 1;
let capitalCounter = 1;
let popuCounter = 1;
nameBtn.addEventListener('click', e => {
    nameCounter++;
    removeOldItems();
    createGridContainer();
    if (nameCounter % 2 === 0){
        nameBtn.innerHTML = `NAME <i class="fa-solid fa-arrow-down"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;
        }
    } else {
        nameBtn.innerHTML = `NAME <i class="fa-solid fa-arrow-up"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.name > b.name) return -1;
            if(a.name < b.name) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;            
        }
    }
    capitalBtn.innerHTML = `CAPITAL`;
    popuBtn.innerHTML = `POPULATION`;
});

capitalBtn.addEventListener('click', e => {
    capitalCounter++;
    removeOldItems();
    createGridContainer();
    if (capitalCounter % 2 === 0){
        capitalBtn.innerHTML = `CAPITAL <i class="fa-solid fa-arrow-down"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.capital < b.capital) return -1;
            if(a.capital > b.capital) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;
        }
    } else {
        capitalBtn.innerHTML = `CAPITAL <i class="fa-solid fa-arrow-up"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.capital > b.capital) return -1;
            if(a.capital < b.capital) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;            
        }
    }
    nameBtn.innerHTML = `NAME`;
    popuBtn.innerHTML = `POPULATION`;
});

popuBtn.addEventListener('click', e => {
    popuCounter++;
    removeOldItems();
    createGridContainer();
    if (popuCounter % 2 === 0){
        popuBtn.innerHTML = `POPULATION <i class="fa-solid fa-arrow-down"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.population < b.population) return -1;
            if(a.population > b.population) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;
        }
    } else {
        popuBtn.innerHTML = `POPULATION <i class="fa-solid fa-arrow-up"></i>`;
        dynamicCountryArr.sort(function(a,b){
            if(a.population > b.population) return -1;
            if(a.population < b.population) return 1;
            return 0;
        })

        for(country of dynamicCountryArr){
            createGridItem();
            countryFlagItem.src = country.flag;
            countryItem.textContent = country.name;
            capitalItem.textContent = `Capital: ${country.capital}`;
            langItem.textContent = `Language: ${country.languages}`;
            populationItem.textContent = `Population: ${country.population}`;            
        }   
    }
    nameBtn.innerHTML = `NAME`;
    capitalBtn.innerHTML = `CAPITAL`;
});

/*--- SECOND SECTION ---*/
/* BUTTONS SECOND SECTION */
let btnWrapper = document.querySelector('.graph-buttons');
btnWrapper.style.display = "flex";
btnWrapper.style.alignItems = "center";
btnWrapper.style.justifyContent = "center";
btnWrapper.style.width = "100%";
btnWrapper.style.backgroundColor = "#ffffff";

let populationBtn = document.querySelector('.population');
populationBtn.style.backgroundColor = "#e37b05";
populationBtn.style.border = "none";
populationBtn.style.margin = "1rem .5rem";
populationBtn.style.padding = "2vh 1.5vw";

let languagesBtn = document.querySelector('.languages');
languagesBtn.style.backgroundColor = "#fe9c2b";
languagesBtn.style.border = "none";
languagesBtn.style.margin = "1rem .5rem";
languagesBtn.style.padding = "2vh 1.5vw";

/* DINAMIC TITLE */
let graphTitle = document.querySelector('.graph-title');
graphTitle.style.textAlign = "center";
graphTitle.style.fontSize = ".8rem";
graphTitle.style.marginTop = "0px";
graphTitle.style.paddingBottom = "1rem";
graphTitle.style.width = "100%";
graphTitle.style.backgroundColor = "#ffffff";

/* GRID CONTAINER */
let graphs = document.querySelector('.graphs-pop');
graphs.style.display = "grid";
graphs.style.gridTemplateColumns = "repeat(3, 1fr)";

let nameContainer;
let graphWrapper;
let numberContainer;

function createGridItems(){
    /* COUNTRY NAME/LANGUAGE NAME */
    nameContainer = document.createElement('div');
    nameContainer.classList = "country-name-container";
    nameContainer.style.gridColumn = "1 / 2";
    nameContainer.style.display = "grid";
    nameContainer.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(nameContainer);

    /* GRAPHICS */
    graphWrapper = document.createElement('div');
    graphWrapper.classList = 'graph-wrapper';
    graphWrapper.style.gridColumn = "2 / 3";
    graphWrapper.style.paddingTop = "2.2vh";
    graphWrapper.style.display = "grid";
    graphWrapper.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(graphWrapper);

    /* NUMBERS */
    numberContainer = document.createElement('div');
    numberContainer.classList = "country-population-container";
    numberContainer.style.gridColumn = "3 / 4"
    numberContainer.style.display = "grid";
    numberContainer.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(numberContainer);
}
createGridItems();


/* ---------- POPULATION ---------- */
/* TOTAL POPULATION */
let counter = 0;
function totalPopulation(arr){
    for(item of arr){
        counter += item.population;
    }
    let worldName = document.createElement('p');
    worldName.textContent = "World";
    worldName.style.textAlign = "center";
    worldName.classList = "world-country-name";
    worldName.style.fontSize = ".8rem";
    nameContainer.appendChild(worldName);

    let worldPopulation = document.createElement('p');
    worldPopulation.textContent = counter;
    worldPopulation.classList = "world-population-number";
    worldPopulation.style.textAlign = "center";
    worldPopulation.style.fontSize = ".8rem";
    numberContainer.appendChild(worldPopulation);

    let worldProgressBar = document.createElement('progress');
    worldProgressBar.classList = "world-progress-bar";
    worldProgressBar.style.width = "25vw";
    worldProgressBar.style.height = "5vh";
    worldProgressBar.style.marginBottom = ".5vh"; 
    worldProgressBar.style.marginLeft = ".4rem";
    worldProgressBar.max = counter;
    worldProgressBar.value = counter;
    graphWrapper.appendChild(worldProgressBar);
}

/* MOST POPULATED SORTED */
function tenMostPopulatedDefault(arr){
    counter = 0;
    graphTitle.textContent = "10 Most Populated Countries In The World";
    totalPopulation(arr);
    countries_data.sort(function (a,b){
        if (a.population > b.population) return -1;
        if(a.population < b.population) return 1;
        return 0;
    })
    for (let i = 0; i < 10; i++){
        let arrName = document.createElement('p');
        arrName.textContent = arr[i].name;
        arrName.classList = "country-name";
        arrName.style.textAlign = "center";
        arrName.style.fontSize = ".8rem";
        nameContainer.appendChild(arrName);
        
        let arrPopulation = document.createElement('p');
        arrPopulation.classList = "population-number";
        arrPopulation.textContent = arr[i].population;
        arrPopulation.style.textAlign = "center";
        arrPopulation.style.fontSize = ".8rem";
        numberContainer.appendChild(arrPopulation);

        let progressBar = document.createElement('progress');
        progressBar.classList = "progress-bar";
        progressBar.style.width = "25vw";
        progressBar.style.height = "5vh";
        progressBar.style.marginBottom = ".5vh";
        progressBar.style.marginLeft = ".4rem";     
        progressBar.max = counter;
        progressBar.value = arr[i].population;
        graphWrapper.appendChild(progressBar);
    }
}
tenMostPopulatedDefault(countries_data);


/* ---------- LANGUAGES ---------- */
function mostSpokenLanguages(arr,num){
    graphTitle.textContent = "10 Most Spoken Languages In The World";
    let languagesArr = [];
    for(let i = 0; i < arr.length; i++){
        let languajesArr = arr[i].languages;
        for(let j = 0; j < languajesArr.length; j++){
            languagesArr.push(languajesArr[j]);
        }
    }
    let timesRepeated = languagesArr.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
    let timesRepeatedArr = Object.entries(timesRepeated)
    let newArrLang = [];
    for(const lang of timesRepeatedArr){
        let newObj = Object.assign({},lang);
        newObj["lang"] = newObj[0];
        delete newObj[0];
        newObj["count"] = newObj[1];
        delete newObj[1];
        newArrLang.push(newObj)
    }
    newArrLang.sort(function(a,b){
        if(a.count > b.count) return -1;
        if(a.count < b.count) return 1;
        return 0;
    })
    let newArrLangNum = [];
    for(let i = 0; i < num; i++){
        newArrLangNum.push(newArrLang[i])
    }
    for(item of newArrLangNum){
        let langName = document.createElement('p');
        langName.textContent = item.lang;
        langName.classList = "lang-name";
        langName.style.textAlign = "center";
        langName.style.fontSize = ".8rem";
        nameContainer.appendChild(langName);
        
        let itemCount = document.createElement('p');
        itemCount.textContent = item.count;
        itemCount.style.textAlign = "center";
        itemCount.style.fontSize = ".8rem";
        numberContainer.appendChild(itemCount);

        let progressBar = document.createElement('progress');
        progressBar.classList = "progress-bar";
        progressBar.style.width = "25vw";
        progressBar.style.height = "5vh";
        progressBar.style.marginBottom = ".5vh";
        progressBar.style.marginLeft = "1rem";        
        progressBar.max = 100;
        progressBar.value = item.count;
        graphWrapper.appendChild(progressBar);
    }
}

function removeOtherItems(){
    nameContainer.remove();
    numberContainer.remove();
    graphWrapper.remove();
}

/* ---------- EVENT LISTENERS ---------- */

/* EVENT LISTENER - POPULATION BTN */
populationBtn.addEventListener('click', e => {
    languagesBtn.style.backgroundColor = "#fe9c2b";
    populationBtn.style.backgroundColor = "#e37b05";
    removeOtherItems();
    createGridItems();
    tenMostPopulatedDefault(countries_data);
});

/* EVENT LISTENER - LANGUAGE BTN */
languagesBtn.addEventListener('click', e => {
    populationBtn.style.backgroundColor = "#fe9c2b";
    languagesBtn.style.backgroundColor = "#e37b05";
    removeOtherItems();
    createGridItems();
    mostSpokenLanguages(countries_data,10);
});