const cars = [
  { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', cost: 15000 },
  { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', cost: 23000 },
  { model: 'Silvia S15', engine: '2JZ', type: 'Drift', cost: 25000 },
  { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', cost: 8000 },
  { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', cost: 30000 },
];

let filteredCars = [...cars];
let sortOption = 'none';

function renderCars() {
  const container = document.getElementById('car-container');
  container.innerHTML = '';

  filteredCars.forEach(car => {
    const carElement = document.createElement('div');
    carElement.className = 'car-block';
    carElement.innerHTML = `
      <h3>${car.model}</h3>
      <p>Engine: ${car.engine}</p>
      <p>Type: ${car.type}</p>
      <p>Cost: $${car.cost}</p>
      <button class="link-button" onclick="viewCarDetails('${car.model}')">→</button>
    `;
    container.appendChild(carElement);
  });
}

function viewCarDetails(model) {
  const car = cars.find(c => c.model === model);
  localStorage.setItem('car', JSON.stringify(car));
  window.location.href = 'car.html';
}

function applyFilters() {
  const searchQuery = document.getElementById('find').value.toLowerCase();
  const selectedEngine = Array.from(document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]:checked')).map(cb => cb.value);
  const selectedType = document.querySelector('input[name="type"]:checked')?.value;

  filteredCars = cars.filter(car => {
    return (
      (!searchQuery || car.model.toLowerCase().includes(searchQuery)) &&
      (!selectedEngine.length || selectedEngine.includes(car.engine)) &&
      (!selectedType || car.type === selectedType)
    );
  });

  if (sortOption === 'asc') {
    filteredCars.sort((a, b) => a.cost - b.cost);
  } else if (sortOption === 'desc') {
    filteredCars.sort((a, b) => b.cost - a.cost);
  }

  renderCars();
}

document.getElementById('find').addEventListener('input', applyFilters);

document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', applyFilters);
});

document.querySelectorAll('input[name="type"]').forEach(radio => {
  radio.addEventListener('change', applyFilters);
});

document.getElementById('sort-price').addEventListener('change', (e) => {
  sortOption = e.target.value;
  applyFilters();
});

document.getElementById('reset-filters').addEventListener('click', () => {
  document.getElementById('find').value = '';
  document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
  document.querySelectorAll('input[name="type"]').forEach(radio => radio.checked = false);
  document.getElementById('sort-price').value = 'none';
  sortOption = 'none';
  filteredCars = [...cars];
  renderCars();
});

window.onload = () => {
  renderCars();
};
