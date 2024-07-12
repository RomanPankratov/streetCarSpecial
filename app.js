const carSpecial = [
  { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift' },
  { model: 'Toyota Supra', engine: '2JZ', type: 'Drag' },
  { model: 'Silvia S15', engine: '2JZ', type: 'Drift' },
  { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort' },
];

const carContainer = document.getElementById('car-container');

function render(arrCar = []) {
  carContainer.innerHTML = '';

  arrCar.forEach(car => {
    const carBlock = document.createElement('div');
    carBlock.classList.add('car-block');

    const modelElement = document.createElement('h3');
    modelElement.textContent = `Model: ${car.model}`;

    const engineElement = document.createElement('p');
    engineElement.textContent = `Engine: ${car.engine}`;

    const typeElement = document.createElement('p');
    typeElement.textContent = `Type: ${car.type}`;

    const linkButton = document.createElement('button');
    linkButton.textContent = '➡'; // Стрелка для кнопки
    linkButton.classList.add('link-button');
    linkButton.onclick = () => {
      saveFilters();
      window.location.href = `car.html?model=${encodeURIComponent(car.model)}`;
    };

    carBlock.appendChild(modelElement);
    carBlock.appendChild(engineElement);
    carBlock.appendChild(typeElement);
    carBlock.appendChild(linkButton);

    carContainer.appendChild(carBlock);
  });
}

function countSelectedCheckboxes() {
  const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
  let selectedCount = 0;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedCount++;
    }
  });

  const labelTitle = document.querySelector('.dropdown-checkbox .label-title');
  labelTitle.textContent = `Выбрано ${selectedCount}`;
}

function getFilteredCars() {
  const searchValue = document.getElementById('find').value.toLowerCase();
  const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
  const selectedEngines = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedEngines.push(checkbox.parentElement.textContent.trim().toLowerCase());
    }
  });

  const radioButtons = document.querySelectorAll('.type input[type="radio"]');
  let selectedType = '';

  radioButtons.forEach(radio => {
    if (radio.checked) {
      selectedType = radio.value.toLowerCase();
    }
  });

  const filteredCars = carSpecial.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchValue);
    const matchesEngine = selectedEngines.length === 0 || selectedEngines.includes(car.engine.toLowerCase());
    const matchesType = selectedType === '' || car.type.toLowerCase() === selectedType;

    return matchesSearch && matchesEngine && matchesType;
  });

  render(filteredCars);
}

function saveFilters() {
  const searchValue = document.getElementById('find').value;
  const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
  const radioButtons = document.querySelectorAll('.type input[type="radio"]');

  const selectedFilters = {
    search: searchValue,
    engines: [],
    type: '',
  };

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedFilters.engines.push(checkbox.parentElement.textContent.trim());
    }
  });

  radioButtons.forEach(radio => {
    if (radio.checked) {
      selectedFilters.type = radio.value;
    }
  });

  localStorage.setItem('filters', JSON.stringify(selectedFilters));
}

function loadFilters() {
  const savedFilters = JSON.parse(localStorage.getItem('filters'));

  if (savedFilters) {
    document.getElementById('find').value = savedFilters.search;

    const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (savedFilters.engines.includes(checkbox.parentElement.textContent.trim())) {
        checkbox.checked = true;
      }
    });

    const radioButtons = document.querySelectorAll('.type input[type="radio"]');
    radioButtons.forEach(radio => {
      if (radio.value === savedFilters.type) {
        radio.checked = true;
      }
    });

    countSelectedCheckboxes();
  }

  getFilteredCars(); // вызов для обновления списка машин после загрузки фильтров
}

function resetFilters() {
  document.getElementById('find').value = '';
  const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
  const radioButtons = document.querySelectorAll('.type input[type="radio"]');

  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  radioButtons.forEach(radio => {
    radio.checked = false;
  });

  localStorage.removeItem('filters');
  countSelectedCheckboxes();
  getFilteredCars();
}

document.getElementById('find').addEventListener('input', getFilteredCars);

const checkboxes = document.querySelectorAll('.dropdown-checkbox input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    countSelectedCheckboxes();
    getFilteredCars();
  });
});

const radioButtons = document.querySelectorAll('.type input[type="radio"]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', getFilteredCars);
});

document.getElementById('reset-filters').addEventListener('click', resetFilters);

// Load filters and initial render of all cars
loadFilters();
