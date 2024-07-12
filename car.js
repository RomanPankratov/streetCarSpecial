const carSpecial = [
    { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift' },
    { model: 'Toyota Supra', engine: '2JZ', type: 'Drag' },
    { model: 'Silvia S15', engine: '2JZ', type: 'Drift' },
    { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort' },
  ];
  
  function getCarDetails(model) {
    return carSpecial.find(car => car.model === model);
  }
  
  function displayCarDetails(car) {
    if (!car) {
      document.body.innerHTML = '<h1>Car not found</h1>';
      return;
    }
  
    document.getElementById('car-model').textContent = `Model: ${car.model}`;
    document.getElementById('car-engine').textContent = `Engine: ${car.engine}`;
    document.getElementById('car-type').textContent = `Type: ${car.type}`;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const carModel = urlParams.get('model');
  
  const carDetails = getCarDetails(carModel);
  displayCarDetails(carDetails);
  