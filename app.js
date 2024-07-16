const cars = [
  { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', cost: 15000, hp: 350 },
  { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', cost: 23000, hp: 600 },
  { model: 'Silvia S15', engine: '2JZ', type: 'Drift', cost: 25000, hp: 650},
  { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', cost: 8000, hp: 250},
  { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', cost: 30000, hp: 500},
];

let filteredCars = [...cars];
let sortOption = 'none';
let currentPage = 1;
const itemsPerPage = 3;

function renderCars() {
  const container = document.getElementById('car-container');
  container.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const carsToDisplay = filteredCars.slice(startIndex, endIndex);

  carsToDisplay.forEach(car => {
    const carElement = document.createElement('div');
    carElement.className = 'car-block';
    carElement.innerHTML = `
      <div class="car-header">
        <h3>${car.model}</h3>
        <button class="link-button" onclick="viewCarDetails('${car.model}')">→</button>
      </div>
      <div class="car-details">
        <div class="car-details-left">
          <p><strong>Engine:</strong> ${car.engine}</p>
          <p><strong>HP:</strong> ${car.hp}</p>
        </div>
        <div class="car-details-right">
          <p><strong>Type:</strong> ${car.type}</p>
          <p><strong>Cost:</strong> $${car.cost}</p>
        </div>
      </div>
    `;
    container.appendChild(carElement);
  });

  updatePagination();
}

function viewCarDetails(model) {
  window.location.href = `car.html?model=${model}`;
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

  if (sortOption === 'asc') {
    filteredCars.sort((a, b) => a.hp - b.hp);
  } else if (sortOption === 'desc') {
    filteredCars.sort((a, b) => b.hp - a.hp);
  }

  currentPage = 1;
  renderCars();
}

function updatePagination() {
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  document.getElementById('page-info').textContent = `${currentPage}`;
  
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
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

document.getElementById('sort-hp').addEventListener('change', (e) => {
  sortOption = e.target.value;
  applyFilters();
});

document.getElementById('reset-filters').addEventListener('click', () => {
  document.getElementById('find').value = '';
  document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
  document.querySelectorAll('input[name="type"]').forEach(radio => radio.checked = false);
  document.getElementById('sort-price').value = 'none';
  document.getElementById('sort-hp').value = 'none';
  sortOption = 'none';
  filteredCars = [...cars];
  currentPage = 1;
  renderCars();
});

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderCars();
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCars();
  }
});

window.onload = () => {
  renderCars();
};
