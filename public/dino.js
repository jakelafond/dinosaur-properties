var url = document.URL;
const urlsplit = url.split('/');
const last = urlsplit[urlsplit.length - 1];
const id = parseInt(last);
var myDinoURL = `/api/dinosaurs/${id}`;
var container = document.querySelector('.container');

fetch(myDinoURL).then(res =>
  res.json().then(data => {
    var newH2 = document.createElement('h2');
    newH2.innerText = data.name;

    var newImage = document.createElement('img');
    newImage.src = data.image;

    var newSize = document.createElement('p');
    newSize.innerText = `Size: ${data.size}`;

    var newWeight = document.createElement('p');
    newWeight.innerText = `Weight: ${data.weight}`;

    var newPeriod = document.createElement('p');
    newPeriod.innerText = `Period: ${data.period}`;

    var newHabitats = document.createElement('p');
    newHabitats.innerText = `Habitats: ${data.habitats}`;

    let editLink = document.createElement('a');
    editLink.textContent = 'Edit';
    editLink.href = `/editdino/${data.id}`;

    let deleteLink = document.createElement('a');
    deleteLink.textContent = 'Delete';
    deleteLink.href = `/api/dinosaurs/${data.id}`;
    deleteLink.addEventListener('click', event => {
      event.preventDefault();
      fetch(event.target.href, { method: 'delete' }).then(() => (window.location = '/'));
    });

    container.appendChild(newImage);
    container.appendChild(newH2);
    container.appendChild(newSize);
    container.appendChild(newWeight);
    container.appendChild(newPeriod);
    container.appendChild(newHabitats);
    container.appendChild(editLink);
    container.appendChild(deleteLink);
  })
);
