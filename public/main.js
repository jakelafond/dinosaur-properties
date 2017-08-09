const url = 'api/dinosaurs';

var container = document.querySelector('.container');

fetch(url).then(res =>
  res.json().then(data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var name = data[i]['name'];
      var image = data[i]['image'];
      var newH2 = document.createElement('h2');
      newH2.innerText = name;
      var newImage = document.createElement('img');
      newImage.src = image;
      container.appendChild(newH2);
      newH2.appendChild(newImage);
    }
  })
);

// document.querySelector('#delete').addEventListener('click', function() {
//   let id = this.getAttribute('data-id');
//   let _url = url + id;
//   fetch(_url, { method: 'delete' }).then(response => response.json()).then(json => {
//     console.log('help this does not work');
//   });
// });
