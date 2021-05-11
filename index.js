//wiki api URLs
const africanGreenPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/African_green_pigeon`;
const indianFantailURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Indian_Fantail`;
const victoriaCrownedPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Victoria_crowned_pigeon`;
const pinkNeckedGreenPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Pink-necked_green_pigeon`;
const domesticPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Domestic_pigeon`;
const vanuatuImperialPigeonURL = `https://en.wikipedia.org/api/rest_v1/page/summary/Vanuatu_imperial_pigeon`;

/*
fetches url
returns content in json
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

//calling the fetch function with each URL
const africanGreenPigeon = await fetchData(africanGreenPigeonURL);
const indianFantail = await fetchData(indianFantailURL);
const victoriaCrownedPigeon = await fetchData(victoriaCrownedPigeonURL);
const pinkNeckedGreenPigeon = await fetchData(pinkNeckedGreenPigeonURL);
const domesticPigeon = await fetchData(domesticPigeonURL);
const vanuatuImperialPigeon = await fetchData(vanuatuImperialPigeonURL);

/*
writing the pigeons to html
selecting the div with id pigeons
*/
const pigeons = document.getElementById('pigeons');

/*
creates the overlay
when you click on the overlay: 
if class active exists = turns on the popup by adding class active to the overlay and pigeon text 
if active = removes the popup by removing the active class
*/
const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
  const pigeonModals = document.querySelectorAll('.pigeonExtract.active');
  pigeonModals.forEach((modal) => {
    modal.classList.remove('active');
  });
  overlay.classList.remove('active');
});

/*
when you click on the pigeon image
image id clicked on is the argument for the popup function
if active = removes the popup by removing the active class
if class active exists = turns on the popup by adding class active to the overlay and pigeon text
*/
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
takes a pigeon json
creates the following tree of elements:
  1: pigeonDiv to hold all elements to do with that pigeon
    2: pigeonImage which appears on the pigeonDiv 
    2: pigeonModal holds all the elements that are in the popup modal
      3: pigeonModalContent holds all the information about the pigeon in the modal
          4: pigeonTitle holds the pigeon title
          4: pigeonPara holds an extract of the wiki article
      3: pigeonModalImage holds the image to go in the pigeon in the modal
          5: pigeonImage which also appears inside the modal
contains a check to see if an image is present and then calls a function 
to add the image to the two different spots
*/
function addToPigeons(pigeon) {
  // create the elements
  const pigeonDiv = document.createElement('div');
  const pigeonModal = document.createElement('div');
  const pigeonModalContent = document.createElement('div');
  const pigeonModalImage = document.createElement('div');
  const pigeonTitle = document.createElement('h2');
  const pigeonPara = document.createElement('div');

  //function to add an image from the wiki
  function addImage(source, title, div, location) {
    let pigeonImage = document.createElement('img');
    pigeonImage.src = source;
    pigeonImage.classList.add(`pigeonimage-${location}`);
    pigeonImage.onclick = function () {
      popup(title);
    };
    pigeonImage.id = `${title} image`;
    div.appendChild(pigeonImage);
  }

  //adding classes and ids
  pigeonDiv.classList.add('pigeonDiv');
  pigeonModal.classList.add(`pigeonExtract`);
  pigeonPara.classList.add(`pigeonPara`);
  pigeonModalContent.classList.add(`extract-content`);
  pigeonModalImage.classList.add(`extract-image`);
  pigeonModal.id = `${pigeon.title}`;

  //adding content
  pigeonTitle.innerHTML = `${pigeon.title}`;
  pigeonPara.innerHTML = `${pigeon.extract} <br><br> For more information <a target='_blank' href="${pigeon.content_urls.desktop.page}">visit the Wikipedia page.</a>`;

  //appending children to parent div
  pigeons.appendChild(pigeonDiv);
  pigeonDiv.appendChild(pigeonModal);
  pigeonModal.appendChild(pigeonModalContent);
  pigeonModal.appendChild(pigeonModalImage);
  pigeonModalContent.appendChild(pigeonTitle);
  pigeonModalContent.appendChild(pigeonPara);

  //insert image in homepage and modal if the wiki has an image
  if (pigeon.originalimage) {
    addImage(pigeon.originalimage.source, pigeon.title, pigeonDiv, 'front');
    addImage(
      pigeon.originalimage.source,
      pigeon.title,
      pigeonModalImage,
      'modal'
    );
  }
}

addToPigeons(africanGreenPigeon);
addToPigeons(indianFantail);
addToPigeons(victoriaCrownedPigeon);
addToPigeons(pinkNeckedGreenPigeon);
addToPigeons(domesticPigeon);
addToPigeons(vanuatuImperialPigeon);
