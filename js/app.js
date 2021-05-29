'use strict';

// Global variabls
// const allProductNames = [];
const allProductImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let totalClicks = 25;
const allProducts = [];
let duplicateNumbers = [];

// Current products being displayed
let productLeft = '';
let productCenter = '';
let productRight = '';

// JS to HTML links
let productContainer = document.getElementById('prod-container');
let buttonGroup = document.getElementById('button-group');
let leftImage = document.getElementById('image1');
let centerImage = document.getElementById('image2');
let rightImage = document.getElementById('image3');
let displayMessage = document.querySelector('section div');
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
}

function uniqueProducts() {
  while (duplicateNumbers.length < 6) {
    let number = randomGenerator();
    if (!duplicateNumbers.includes(number)) {
      duplicateNumbers.push(number);
    }
  }
}

function renderImages() {
  uniqueProducts();
  const index1 = +duplicateNumbers[0];
  const index2 = +duplicateNumbers[1];
  const index3 = +duplicateNumbers[2];
  leftImage.src = allProducts[index1].displayImage;
  allProducts[index1].showCount++;
  productLeft = allProducts[index1];
  centerImage.src = allProducts[index2].displayImage;
  allProducts[index2].showCount++;
  productCenter = allProducts[index2];
  rightImage.src = allProducts[index3].displayImage;
  allProducts[index3].showCount++;
  productRight = allProducts[index3];
  duplicateNumbers = duplicateNumbers.slice(3,6);
}

function clickHandler(event) {
  if (event.target === productContainer) {
    displayMessage.style = 'visibility: visible';
    return;
  }
  totalClicks--;
  const imageClicked = event.target.id;
  if (imageClicked === 'image1') {
    productLeft.clickCount++;
  }
  if (imageClicked === 'image2') {
    productCenter.clickCount++;
  }
  if (imageClicked === 'image3') {
    productRight.clickCount++;
  }
  if (totalClicks === 0) {
    productContainer.removeEventListener('click', clickHandler);
  }
  displayMessage.style = 'visibility: hidden';
  renderImages();
}

// Start site
buildProducts();
renderImages();

// Event listener
productContainer.addEventListener('click', clickHandler);
