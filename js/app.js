'use strict';

// Global variabls
const allProductImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
const numberOfRounds = 10;
let totalClicks = numberOfRounds;
const imagesToDisplay = 3;
const duplicateTop = imagesToDisplay * 2;
const sliceStart = imagesToDisplay;
const sliceEnd = imagesToDisplay * 2;
let allProducts = [];
let duplicateNumbers = [];

// JS to HTML links
// let imagesContainer = document.getElementById('images-container');
let displayContainer = document.getElementById('prod-container');
let buttonGroup = document.getElementById('buttons');
let leftImage = document.getElementById('image1');
let centerImage = document.getElementById('image2');
let rightImage = document.getElementById('image3');
let statusArea = document.querySelector('aside ul');
statusArea.innterHTML = '';
let displayMessage = document.getElementById('message');
displayMessage.textContent = 'Click on an image please!';

// Constructor for Product
function Product(name, image) {
  this.name = name;
  this.displayImage = image;
  this.clickCount = 0;
  this.showCount = 0;
  allProducts.push(this);
}

// Extend string object add method to capitalize first letter
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Functions
function randomGenerator() {
  return Math.floor(Math.random() * allProducts.length);
}

function buildProducts() {
  for (let i = 0; i < allProductImages.length; i++) {

    new Product(allProductImages[i].slice(0, -4).capitalize(), `img/${allProductImages[i]}`);
  }
  displayContainer.addEventListener('click', clickHandler);
}

function uniqueProducts() {
  while (duplicateNumbers.length < duplicateTop) {
    let number = randomGenerator();
    if (!duplicateNumbers.includes(number)) {
      duplicateNumbers.push(number);
    }
  }
}

function renderImages() {
  uniqueProducts();
  const index1 = duplicateNumbers[0];
  const index2 = duplicateNumbers[1];
  const index3 = duplicateNumbers[2];
  leftImage.src = allProducts[index1].displayImage;
  allProducts[index1].showCount++;
  centerImage.src = allProducts[index2].displayImage;
  allProducts[index2].showCount++;
  rightImage.src = allProducts[index3].displayImage;
  allProducts[index3].showCount++;
}

function clickHandler(event) {
  if (event.target === displayContainer) {
    displayMessage.style.display = 'block';
    return;
  }
  if (event.target === displayMessage) {
    displayMessage.style.display = 'none';
    return;
  }
  displayMessage.style.display = 'none';
  totalClicks--;
  const imageClicked = event.target.id;
  if (imageClicked === 'image1') {
    allProducts[duplicateNumbers[0]].clickCount++;
  }
  if (imageClicked === 'image2') {
    allProducts[duplicateNumbers[1]].clickCount++;
  }
  if (imageClicked === 'image3') {
    allProducts[duplicateNumbers[2]].clickCount++;
  }
  duplicateNumbers = duplicateNumbers.slice(sliceStart,sliceEnd);
  if (totalClicks === 0) {
    displayContainer.removeEventListener('click', clickHandler);
    buttonGroup.style.display = 'block';
    buttonGroup.addEventListener('click', displayResultsHandler);
  }
  renderImages();
}

function displayResultsHandler() {
  statusArea.innerHTML = '';
  for (let i = 0; i < allProducts.length; i++ ) {
    let el = document.createElement('li');
    el.innerHTML = `
    ${allProducts[i].name}:<br>
    clicked: ${allProducts[i].clickCount}.<br>
    Shown: ${allProducts[i].showCount}.<br><hr>`;
    statusArea.appendChild(el);
  }
  buttonGroup.removeEventListener('click', displayResultsHandler);
  buttonGroup.textContent = 'Click to Restart';
  buttonGroup.addEventListener('click', restart);
}

function restart() {
  allProducts = [];
  buttonGroup.style.display = 'none';
  buttonGroup.textContent = 'View Results';
  statusArea.innerHTML = '';
  totalClicks = numberOfRounds + 1;
  buttonGroup.removeEventListener('click', restart);
  buildProducts();
}


// Start site
buildProducts();
renderImages();

// Event listener
// displayContainer.addEventListener('click', clickHandler);
