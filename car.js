const cars = [
  { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', cost: 15000, hp: 350 },
  { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', cost: 23000, hp: 600 },
  { model: 'Silvia S15', engine: '2JZ', type: 'Drift', cost: 25000, hp: 650},
  { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', cost: 8000, hp: 250},
  { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', cost: 30000, hp: 500},
];

function getCarDetails(model) {
  return cars.find(car => car.model === model);
}

function displayCarDetails(car) {
  if (!car) {
    document.body.innerHTML = '<h1>Car not found</h1>';
    return;
  }

  document.getElementById('car-model').textContent = `Model: ${car.model}`;
  document.getElementById('car-engine').textContent = `Engine: ${car.engine}`;
  document.getElementById('car-type').textContent = `Type: ${car.type}`;
  document.getElementById('car-hp').textContent = `HP: ${car.hp}`;
  document.getElementById('car-cost').textContent = `Cost: $${car.cost}`;
}

const urlParams = new URLSearchParams(window.location.search);
const carModel = urlParams.get('model');

const carDetails = getCarDetails(carModel);
displayCarDetails(carDetails);
