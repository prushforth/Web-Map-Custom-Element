window.onload = function () {
  let layers = document.querySelectorAll("layer-");
  for (let i = 0; i < layers.length; i++) {
    let listItem = document.createElement("li"),
      layer = document.createElement("a");
    listItem.classList.add("nav-item");
    layer.classList.add("list-group-item");
    layer.classList.add("list-group-item-action");
    layer.innerHTML = layers[i].label;
    if (layers[i].checked) layer.classList.add("active");

    layer.toggleChecked = layers[i].toggleChecked;
    layer.addEventListener("click", function (e) {
      console.log(this);
    });
    listItem.appendChild(layer);
    document.getElementById("layers").appendChild(listItem);
  }
}


window.addEventListener("layeradd", function (e) {
  console.log(e);
});

function customZoomIn() {
  let map = document.getElementById("custom-map"),
    lat = +map.lat,
    lon = +map.lon,
    zoom = +map.zoom + 1;
  map.zoomTo(lat, lon, zoom);
}

function customZoomOut() {
  let map = document.getElementById("custom-map"),
    lat = +map.lat,
    lon = +map.lon,
    zoom = +map.zoom - 1;
  map.zoomTo(lat, lon, zoom);
}