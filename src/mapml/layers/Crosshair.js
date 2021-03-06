export var Crosshair = L.Layer.extend({
  onAdd: function (map) {

    //SVG crosshair design from https://github.com/xguaita/Leaflet.MapCenterCoord/blob/master/src/icons/MapCenterCoordIcon1.svg?short_path=81a5c76
    let svgInnerHTML = `<svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 99.999998 99.999998"
    xml:space="preserve">
    <g><circle
        r="3.9234731"
        cy="50.21946"
        cx="50.027821"
        style="color:#000000;clip-rule:nonzero;display:inline;overflow:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" /><path
        d="m 4.9734042,54.423642 31.7671398,0 c 2.322349,0 4.204185,-1.881836 4.204185,-4.204185 0,-2.322349 -1.881836,-4.204184 -4.204185,-4.204184 l -31.7671398,0 c -2.3223489,-2.82e-4 -4.20418433,1.881554 -4.20418433,4.204184 0,2.322631 1.88183543,4.204185 4.20418433,4.204185 z"
        style="color:#000000;clip-rule:nonzero;display:inline;overflow:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" /><path
        d="m 54.232003,5.1650429 c 0,-2.3223489 -1.881836,-4.20418433 -4.204184,-4.20418433 -2.322349,0 -4.204185,1.88183543 -4.204185,4.20418433 l 0,31.7671401 c 0,2.322349 1.881836,4.204184 4.204185,4.204184 2.322348,0 4.204184,-1.881835 4.204184,-4.204184 l 0,-31.7671401 z"
        style="fill:#000000;stroke:#ffffff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;fill-opacity:1" /><path
        d="m 99.287826,50.219457 c 0,-2.322349 -1.881835,-4.204184 -4.204184,-4.204184 l -31.76714,0 c -2.322349,0 -4.204184,1.881835 -4.204184,4.204184 0,2.322349 1.881835,4.204185 4.204184,4.204185 l 31.76714,0 c 2.320658,0 4.204184,-1.881836 4.204184,-4.204185 z"
        style="color:#000000;clip-rule:nonzero;display:inline;overflow:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" /><path
        d="m 45.823352,95.27359 c 0,2.322349 1.881836,4.204184 4.204185,4.204184 2.322349,0 4.204184,-1.881835 4.204184,-4.204184 l 0,-31.76714 c 0,-2.322349 -1.881835,-4.204185 -4.204184,-4.204185 -2.322349,0 -4.204185,1.881836 -4.204185,4.204185 l 0,31.76714 z"
        style="color:#000000;clip-rule:nonzero;display:inline;overflow:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" /></g></svg>
 `;

    this._container = L.DomUtil.create("div", "mapml-crosshair", map._container);
    this._container.innerHTML = svgInnerHTML;
    map.isFocused = false;
    this._isQueryable = false;

    map.on("layerchange layeradd layerremove overlayremove", this._toggleEvents, this);
    map.on("popupopen", this._isMapFocused, this);
    L.DomEvent.on(map._container, "keydown keyup mousedown", this._isMapFocused, this);

    this._addOrRemoveCrosshair();
  },

  onRemove: function (map) {
    map.off("layerchange layeradd layerremove overlayremove", this._toggleEvents);
    map.off("popupopen", this._isMapFocused);
    L.DomEvent.off(map._container, "keydown keyup mousedown", this._isMapFocused);
  },

  _toggleEvents: function () {
    if (this._hasQueryableLayer()) {
      this._map.on("viewreset move moveend", this._addOrRemoveCrosshair, this);
    } else {
      this._map.off("viewreset move moveend", this._addOrRemoveCrosshair, this);
    }
    this._addOrRemoveCrosshair();
  },

  _addOrRemoveCrosshair: function (e) {
    if (this._hasQueryableLayer()) {
      this._container.style.visibility = null;
    } else {
      this._container.style.visibility = "hidden";
    }
  },

  _addOrRemoveMapOutline: function (e) {
    let mapContainer = this._map._container;
    if (this._map.isFocused && !this._outline) {
      this._outline = L.DomUtil.create("div", "mapml-outline", mapContainer);
    } else if (!this._map.isFocused && this._outline) {
      L.DomUtil.remove(this._outline);
      delete this._outline;
    }
  },

  _hasQueryableLayer: function () {
    let layers = this._map.options.mapEl.layers;
    if (this._map.isFocused) {
      for (let layer of layers) {
        if (layer.checked && layer._layer.queryable) {
          return true;
        }
      }
    }
    return false;
  },

  _isMapFocused: function (e) {
    //set this._map.isFocused = true if arrow buttons are used
    if(!this._map._container.parentNode.activeElement){
      this._map.isFocused = false;
      return;
    }
    let isLeafletContainer = this._map._container.parentNode.activeElement.classList.contains("leaflet-container");
    if (isLeafletContainer && ["keydown"].includes(e.type) && (e.shiftKey && e.keyCode === 9)) {
      this._map.isFocused = false;
    } else this._map.isFocused = isLeafletContainer && ["keyup", "keydown"].includes(e.type);

    this._addOrRemoveMapOutline();
    this._addOrRemoveCrosshair();
  },

});


export var crosshair = function (options) {
  return new Crosshair(options);
};