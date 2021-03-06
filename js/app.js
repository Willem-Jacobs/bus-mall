'use strict';

// Global variabls
const allProductImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
const numberOfRounds = 25;
let totalClicks = numberOfRounds;
const imagesToDisplay = 3;
const duplicateTop = imagesToDisplay * 2;
const sliceStart = imagesToDisplay;
const sliceEnd = imagesToDisplay * 2;
let allProducts = [];
let duplicateNumbers = [];
let productNames = [];
let chartShownData = [];
let chartClickedData = [];

// JS to HTML links
let displayContainer = document.getElementById('prod-container');
let leftImage = document.getElementById('image1');
let centerImage = document.getElementById('image2');
let rightImage = document.getElementById('image3');
let displayMessage = document.getElementById('message');
displayMessage.textContent = 'Click on an image please!';
let ctx = document.getElementById('mychart').getContext('2d');

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
  let storageProducts = JSON.parse(localStorage.getItem('products'));
  if (storageProducts) {
    allProducts = storageProducts;
    for (let i = 0; i < allProductImages.length; i++) {
      productNames.push(allProductImages[i].slice(0, -4).capitalize());
    }
  } else {
    for (let i = 0; i < allProductImages.length; i++) {
      new Product(allProductImages[i].slice(0, -4).capitalize(), `img/${allProductImages[i]}`);
      productNames.push(allProductImages[i].slice(0, -4).capitalize());
    }
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
  leftImage.alt = allProducts[index1].name;
  allProducts[index1].showCount++;
  centerImage.src = allProducts[index2].displayImage;
  leftImage.alt = allProducts[index2].name;
  allProducts[index2].showCount++;
  rightImage.src = allProducts[index3].displayImage;
  leftImage.alt = allProducts[index3].name;
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
    localStorage.setItem('products', JSON.stringify(allProducts));
    buildChartData();
    return;
  }
  renderImages();
}

function buildChartData() {
  console.log('Build Chart Data');
  for (let i = 0; i < allProducts.length; i++) {
    chartClickedData.push(allProducts[i].clickCount);
    chartShownData.push(allProducts[i].showCount);
  }
  displayChart();
}

function displayChart(){
  let myChart = new Chart(ctx, { //eslint-disable-line no-undef
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Clicks',
        data: chartClickedData,
        backgroundColor: 'rgb(122, 163, 235)',
        borderColor: 'black',
        borderWidth: 1
      },
      {
        label: '# Times Shown',
        data: chartShownData,
        backgroundColor: 'rgb(222, 131, 131)',
        borderColor: 'black',
        borderWidth: 1 ,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'left'
        }
      }
    }
  });
}

// Start site
buildProducts();
renderImages();
