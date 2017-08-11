const container = document.querySelector('.container');
const url = document.URL;
const urlsplit = url.split('/');
const last = urlsplit[urlsplit.length - 1];
const id = parseInt(last);
let markup = '';

function fetchThis() {
  fetch(`/api/dinosaurs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('input[name=name]').value,
      image: document.querySelector('input[name=image]').value,
      size: document.querySelector('input[name=size]').value,
      weight: document.querySelector('input[name=weight]').value,
      period: document.querySelector('input[name=period]').value,
      habitats: document.querySelector('input[name=habitats]').value
    })
  }).then(resp => {
    console.log(resp);
    window.location = `/dinosaurs/${id}`;
  });
}

fetch(`/api/dinosaurs/${id}`).then(res => res.json()).then(data => {
  markup = `
    <form class="editform">
      <input type="text" name="name" value="${data.name}">
      <input type="text" name="image" value="${data.image}">
      <input type="text" name="size" value="${data.size}">
      <input type="text" name="weight" value="${data.weight}">
      <input type="text" name="period" value="${data.period}">
      <input type="text" name="habitats" value="${data.habitats}">
      <button type="button" name="button" onclick="fetchThis()">Save</button>
    </form>
    `;

  container.innerHTML += markup;
});
