const allUrl = 'api/dinosaurs';

var container = document.querySelector('.container');

fetch(allUrl).then(res =>
  res.json().then(data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var name = data[i]['name'];
      var image = data[i]['image'];
      var id = data[i]['id'];
      var newA = document.createElement('a');
      newA.innerText = name;
      newA.setAttribute('href', `/dinosaurs/${id}`);
      var newImage = document.createElement('img');
      newImage.src = image;
      var newP = document.createElement('p');
      container.appendChild(newImage);
      container.appendChild(newP);
      newP.appendChild(newA);
    }
  })
);
