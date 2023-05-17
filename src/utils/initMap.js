import { loadScript } from ".";
// import pinia from "../stores/store";
// import { useDrawFeaturesStore } from "../stores/states";

// const store_DrawFeatures = useDrawFeaturesStore(pinia); // work 但是提交未定义属性变更不成功。

const smartmapxJsScriptUrls = {
  'v1': 'https://dev.smartmapx.com/map/assets/smartmapx.js',
  'v2': 'https://dev.smartmapx.com/map/api/js_v2.0/smartmapx.js',
};

const smartmapxCssUrls = {
  'v1': 'https://dev.smartmapx.com/map/assets/smartmapx.css',
  'v2': 'https://dev.smartmapx.com/map/api/js_v2.0/smartmapx.css',
};

const importSmartMapX = () => {
  // import SmartMapX JS Script
  let promiseScriptSmartMapX = loadScript(smartmapxJsScriptUrls.v1);
  promiseScriptSmartMapX.then(initMap());

  // import SmartMapX CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = smartmapxCssUrls.v1;
  document.getElementsByTagName('head')[0].appendChild(link);
}

const addControls = (map) => {
  const attrCtrl = new smartmapx.AttributionControl({ compact: false });
  const measureControl = new smartmapx.MeasureControl();
  const scaleControl = new smartmapx.ScaleControl({
    maxWidth: 100,
    unit: 'm'
  });
  const nav = new smartmapx.NavigationControl({
    showCompass: false,
    // visualizePitch: true
  });
  /**
   * doc about Draw
   * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md
   * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/EXAMPLES.md
   * https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/MODES.md
   */
  const drawControl = new smartmapx.DrawControl({
    displayControlsDefault: true,
    /* controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true
      combine_features: true,
      uncombine_features: true
    } */
  });

  map
    .addControl(attrCtrl, 'bottom-left')
    .addControl(measureControl, 'top-left')
    .addControl(drawControl, 'top-left')
    .addControl(nav, 'top-right')
    .addControl(scaleControl, 'bottom-left');

  // hide controls: 'full map', 'compass'
  const domCtrlFullMap = document.getElementsByClassName('smartmapx-ctrl-full-map')[0];
  domCtrlFullMap.style.display = 'none';
  const domCtrlCompass = document.getElementsByClassName('smartmapx-ctrl-compass')[0];
  domCtrlCompass.style.display = 'none';
}

const initMap = (params) => {
  // bind key
  smartmapx.mapbase = 'https://dev.smartmapx.com';
  smartmapx.apikey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1MzcxODM1OTgsImRhdGEiOiJ7XCJsb2dpbl9uYW1lXCI6XCJyb290XCIsXCJnZW5kZXJcIjoyLFwidXNlcl9pZFwiOlwiZm1fc3lzdGVtX3VzZXJfcm9vdFwiLFwidXNlcl9uYW1lXCI6XCJyb290XCIsXCJ1c2VyX29yaWdpbl9pZFwiOlwiZm1fbG9jYWxcIixcInByb2R1Y3RfaWRcIjpcIlwiLFwiZXhwaXJlX3RpbWVcIjpcIlwiLFwic291cmNlX2lkXCI6XCJcIixcInR5cGVcIjpcIlwiLFwiY29ycF9pZFwiOlwiZm1fc3lzdGVtX2NvcnBcIn0iLCJleHAiOjQwOTI1OTkzNDksImp0aSI6ImFfNjhmZjBhZGY5OTcxNDQ0NThjNzViZWFiN2FjNTkzYWYifQ.W122WkT6QR4HZWbpalkpmirV9JWkDYcCkmNZoxCB_z8';

  // init map
  const map = new smartmapx.Map({
    container: params.container,
    mapId: 'map_id_32',
    center: [121.445106, 31.228389], // [116.39738, 39.90579],
    zoom: 5,
    // pitch: 70,
    dragRotate: false,
    // pitchWithRotate: false,
    keyboard: false,
    attributionControl: false,
  });

  const canvasStyle = document.getElementsByClassName('smartmapx-canvas')[0].style;
  canvasStyle.position = 'relative';

  map
    .on('load', () => {
      addControls(map);
    });
    /* .on('data', () => {
      console.log('A data event occurred.');
    })
    .on('sourcedata', () => {
      console.log('A sourcedata event occurred.');
    }); */

  return map;
}

export default function init(params) {
  // importSmartMapX();

  const map = initMap(params);

  return map;
}
