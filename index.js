//getting access to the pigeons
const africanGreenPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/African_green_pigeon`;
const indianFantailURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Indian_Fantail`;
const victoriaCrownedPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Victoria_crowned_pigeon`;
const pinkNeckedGreenPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Pink-necked_green_pigeon`;
const domesticPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Domestic_pigeon`;
const vanuatuImperialPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Vanuatu_imperial_pigeon`;

/*
this function takes a url, fetches it, and returns the content
assumes that the content is in json format
*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const wiki = await response.json();
    return wiki;
  } catch (error) {
    console.error(error);
  }
}

const africanGreenPigeon = await fetchData(africanGreenPigeonURL);
const indianFantail = await fetchData(indianFantailURL);
const victoriaCrownedPigeon = await fetchData(victoriaCrownedPigeonURL);
const pinkNeckedGreenPigeon = await fetchData(pinkNeckedGreenPigeonURL);
const domesticPigeon = await fetchData(domesticPigeonURL);
const vanuatuImperialPigeon = await fetchData(vanuatuImperialPigeonURL);

//writing the pigeons to html
//selecting the div with id pigeons
const pigeons = document.getElementById('pigeons');

/*adds and removes the popup by adding the class active to overlay and the relevant pigeon text 
checks to see if already active, if already active then removes the active class*/
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
  const pigeonModals = document.querySelectorAll('.pigeonExtract.active');
  pigeonModals.forEach((modal) => {
    modal.classList.remove('active');
  });
  overlay.classList.remove('active');
});

function popup(id) {
  const pigeonModal = document.getElementById(id);

  if (pigeonModal.classList.contains('active')) {
    pigeonModal.classList.remove('active');
  } else {
    pigeonModal.classList.add('active');
  }

  if (overlay.classList.contains('active')) {
    overlay.classList.remove('active');
  } else {
    overlay.classList.add('active');
  }
}

/*
this function takes a pigeon
creates a text node from the pigeon title and extract
appends the title and text node to the pigeons div
*/
function addToPigeons(pigeon) {
  // create the elements
  const pigeonDiv = document.createElement('div');
  const newPigeonTitle = document.createElement('h2');
  const newPigeonExtract = document.createElement('div');
  const newPigeonPara = document.createElement('div');
  let newPigeonImage = '';

  //adding classes and ids
  pigeonDiv.classList.add('pigeonDiv');
  newPigeonExtract.classList.add(`pigeonExtract`);
  newPigeonPara.classList.add(`pigeonPara`);
  newPigeonExtract.id = `${pigeon.title}`;

  //adding content
  newPigeonTitle.innerHTML = `${pigeon.title}`;
  newPigeonPara.innerHTML = `${pigeon.extract} \n for more information: ${pigeon.content_urls.desktop.page}`;

  //appending children to parent div
  newPigeonExtract.appendChild(newPigeonTitle);
  newPigeonExtract.appendChild(newPigeonPara);
  pigeonDiv.appendChild(newPigeonExtract);
  pigeons.appendChild(pigeonDiv);

  console.log(pigeon.content_urls.desktop.page);

  //only if the wiki has an image
  if (pigeon.originalimage) {
    newPigeonImage = document.createElement('img');
    newPigeonImage.src = pigeon.originalimage.source;
    newPigeonImage.classList.add('pigeonimage');
    newPigeonImage.onclick = function () {
      popup(pigeon.title);
    };
    newPigeonImage.id = `${pigeon.title} image`;
    pigeonDiv.appendChild(newPigeonImage);
  }
}

addToPigeons(africanGreenPigeon);
addToPigeons(indianFantail);
addToPigeons(victoriaCrownedPigeon);
addToPigeons(pinkNeckedGreenPigeon);
addToPigeons(domesticPigeon);
addToPigeons(vanuatuImperialPigeon);
