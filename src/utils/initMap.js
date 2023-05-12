import { loadScript } from ".";

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

  map.addControl(new smartmapx.AttributionControl({ compact: false }));

  const measureControl = new smartmapx.MeasureControl();
  map.addControl(measureControl, 'top-left');

  const scaleControl = new smartmapx.ScaleControl({
    maxWidth: 100,
    unit: 'm'
  });
  map.addControl(scaleControl, 'bottom-left');

  // add scale control
  const nav = new smartmapx.NavigationControl();
  map.addControl(nav, 'top-right');


  const drawControl = new smartmapx.DrawControl({ // FIXME could not find DrawControl in the dev doc.
    displayControlsDefault: false,
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true
    }
  });
  map.addControl(drawControl, 'top-left');
  map.on('draw.create', function (e) {
    console.log(JSON.stringify(e.features[0]));
  });

  map.on('draw.update', function (e) {
    console.log(JSON.stringify(e.features[0]));
  });

}

const initMap = (params) => {
  // bind key
  smartmapx.mapbase = 'https://dev.smartmapx.com';
  smartmapx.apikey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1MzcxODM1OTgsImRhdGEiOiJ7XCJsb2dpbl9uYW1lXCI6XCJyb290XCIsXCJnZW5kZXJcIjoyLFwidXNlcl9pZFwiOlwiZm1fc3lzdGVtX3VzZXJfcm9vdFwiLFwidXNlcl9uYW1lXCI6XCJyb290XCIsXCJ1c2VyX29yaWdpbl9pZFwiOlwiZm1fbG9jYWxcIixcInByb2R1Y3RfaWRcIjpcIlwiLFwiZXhwaXJlX3RpbWVcIjpcIlwiLFwic291cmNlX2lkXCI6XCJcIixcInR5cGVcIjpcIlwiLFwiY29ycF9pZFwiOlwiZm1fc3lzdGVtX2NvcnBcIn0iLCJleHAiOjQwOTI1OTkzNDksImp0aSI6ImFfNjhmZjBhZGY5OTcxNDQ0NThjNzViZWFiN2FjNTkzYWYifQ.W122WkT6QR4HZWbpalkpmirV9JWkDYcCkmNZoxCB_z8';

  // init map
  const map = new smartmapx.Map({
    container: params.container,
    mapId: 'map_id_32',
    center: [121.445106,31.228389], // [116.39738, 39.90579],
    zoom: 5,
    // pitch: 70,
    dragRotate: false,
    // pitchWithRotate: false,
    keyboard: false,
    attributionControl: false,
  });

  addControls(map);

  return map;
}

export default function init(params) {
  // importSmartMapX();

  const map = initMap(params);

  const canvasStyle = document.getElementsByClassName('smartmapx-canvas')[0].style;
  canvasStyle.position = 'relative';

  return map;
}
