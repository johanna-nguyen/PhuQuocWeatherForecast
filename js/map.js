var jsondata = {
  points: [
  
    // TRẠM XĂNG DẦU GÁNH DẦU
    {
      type: 'point',
      longitude: pointCoordinates.gasGanhDau[0],
      latitude:  pointCoordinates.gasGanhDau[1],
      symbol: {
        type: 'picture-marker',
        url: './image/gas_station.png',
        width: '32px',
        height: '32px'
      }
    },
    // TRẠM Y TẾ GÁNH DẦU
    {
      type: 'point',
      longitude: pointCoordinates.hospitalGanhDau[0],
      latitude: pointCoordinates.hospitalGanhDau[1],
      symbol: {
        type: 'picture-marker',
        url: './image/hospital.png',
        width: '32px',
        height: '32px'
      }
    },
     // BỆNH VIỆN VINMEX
    {
      type: 'point',
      longitude: pointCoordinates.hospitalVinmex[0], 
      latitude: pointCoordinates.hospitalVinmex[1],
      symbol: {
        type: 'picture-marker',
        url: './image/hospital.png',
        width: '32px',
        height: '32px'
      }
    },

    // NHÀ THỜ GIÁO XỨ DƯƠNG ĐÔNG
    {
      type: 'point',
      longitude: pointCoordinates.churchDuongDong[0], 
      latitude: pointCoordinates.churchDuongDong[1],
      symbol: {
        type: 'picture-marker',
        url: './image/church.png',
        width: '32px',
        height: '32px'
      }
    },

    // SÂN BAY QUỐC TẾ
    {
      type: 'point',
      longitude: pointCoordinates.airport[0],
      latitude: pointCoordinates.airport[1],
      symbol: {
        type: 'picture-marker',
        url: './image/airport.png',
        width: '32px',
        height: '32px'
      }
    },

    // NHÀ TÙ PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.prison[0],
      latitude: pointCoordinates.prison[1],
      symbol: {
        type: 'picture-marker',
        url: './image/prison.png',
        width: '32px',
        height: '32px'
      }
    },

    // ĐÀI TƯỞNG NIỆM LIỆT SĨ
    {
      type: 'point',
      longitude: pointCoordinates.statuePrison[0],
      latitude: pointCoordinates.statuePrison[1],
      symbol: {
        type: 'picture-marker',
        url: './image/statue.png',
        width: '32px',
        height: '32px'
      }
    },

    // VINWONDERS PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.vinwonders[0], 
      latitude: pointCoordinates.vinwonders[1],
      symbol: {
        type: 'picture-marker',
        url: './image/castle.png',
        width: '32px',
        height: '32px'
      }
    },

    // VINPEARL SAFARI PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.safari[0],
      latitude: pointCoordinates.safari[1],
      symbol: {
        type: 'picture-marker',
        url: './image/zoo.png',
        width: '32px',
        height: '32px'
      }
    },

    // HỒ ĐÔNG DƯƠNG
    {
      type: 'point',
      longitude: pointCoordinates.lakeDongDuong[0], 
      latitude: pointCoordinates.lakeDongDuong[1],
      symbol: {
        type: 'picture-marker',
        url: './image/lake.png',
        width: '32px',
        height: '32px'
      }
    },

    // VƯỜN QUỐC GIA PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.forest[0], 
      latitude: pointCoordinates.forest[1],
      symbol: {
        type: 'picture-marker',
        url: './image/forest.png',
        width: '32px',
        height: '32px'
      }
    },
   
    // NÚI DƯƠNG TƠ
    {
      type: 'point',
      longitude: pointCoordinates.moutainDuongTo[0],
      latitude: pointCoordinates.moutainDuongTo[1],
      symbol: {
        type: 'picture-marker',
        url: './image/moutain.png',
        width: '32px',
        height: '32px'
      }
    },
    
  ],
  lines: [
    // ĐƯỜNG TỈNH LỘ 973
    {
      type: 'polyline',
      paths: pathCoordinates.duong973,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG LÊ HỒNG PHONG
    {
      type: 'polyline',
      paths: pathCoordinates.duongLeHongPhong,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG NGUYỄN TRUNG TRỰC
    {
      type: 'polyline',
      paths: pathCoordinates.duongNguyenTrungTruc,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG LÝ THƯỜNG KIỆT
    {
      type: 'polyline',
      paths: pathCoordinates.duongLyThuongKiet,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG CẦU C2 CỬA CẠN
    {
      type: 'polyline',
      paths: pathCoordinates.duongCauC2,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG ĐT 47
    {
      type: 'polyline',
      paths: pathCoordinates.duongDT47,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG KHU TƯỢNG
    {
      type: 'polyline',
      paths: pathCoordinates.duongKhuTuong,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },
  ],
  polygons: [
 
    // XÃ GÀNH DẦU
    {
      type: 'polygon',
      rings: ringCoordinates.xaGanhDau,
      //Name: 'Xã Gành Dầu',
      id:'ganh_dau',
      symbol: {
        type: 'simple-fill',
        color: [255, 99, 132, 0.7], // màu đỏ hồng
        outline: { color: [0, 0, 0], width: 1 },
      },
    },
    
    // XÃ BÃI THƠM
    {
      type: 'polygon',
      rings: ringCoordinates.xaBaiThom,
      //Name: 'Xã Bãi Thơm',
      id:'bai_thom',
      symbol: {
        type: 'simple-fill',
        color: [54, 162, 235, 0.7], // màu xanh lam
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

    // XÃ CỬA CẠN
    {
      type: 'polygon',
      rings: ringCoordinates.xaCuaCan,
      //Name: 'Xã Cửa Cạn',
      id: 'cua_can',
      symbol: {
        type: 'simple-fill',
        color: [255, 206, 86, 0.4], // màu vàng
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },
    // XÃ CỬA DƯƠNG
    {
      type: 'polygon',
      rings: ringCoordinates.xaCuaDuong,
      //Name: 'Xã Cửa Dương',
      id:'cua_duong',
      symbol: {
        type: 'simple-fill',
        color: [107, 142, 35, 0.7], // màu oliu
        outline: { color: [0, 0, 0], width: 1 },
      },
    },

   
    // XÃ HÀM NINH
    {
      type: 'polygon',
      rings: ringCoordinates.xaHamNinh,
      //Name: 'Xã Hàm Ninh',
      id:'ham_ninh',
      symbol: {
        type: 'simple-fill',
        color: [102, 51, 204, 0.7], // màu tím
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

     // PHƯỜNG DƯƠNG ĐÔNG
    {
      type: 'polygon',
      rings: ringCoordinates.phuongDuongDong,
      //Name: 'Phường Dương Đông',
      id:'duong_dong',
      symbol: {
        type: 'simple-fill',
        color: [204, 102, 0, 0.7], // màu cam
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

    // XÃ DƯƠNG TƠ
    {
      type: 'polygon',
      rings: ringCoordinates.xaDuongTo,
      //Name: 'Xã Dương Tơ',
      id: 'duong_to',
      symbol: {
        type: 'simple-fill',
        color: [0, 56, 168, 0.7], // màu coban
        outline: { color: [0, 0, 0], width: 1 },
      },
    },
   
    // PHƯỜNG AN THỚI
    {
      type: 'polygon',
      rings: ringCoordinates.phuongAnThoi,
      //Name: 'Phường An Thới',
      id: 'an_thoi',
      symbol: {
        type: 'simple-fill',
        color: [120, 20, 20, 0.7], // màu nâu
        outline: { color: [0, 0, 0], width: 1 },
      }
      
    },
  ],
};
let mapView = null; 
let map = null; 
let pointLayer = null; 
let polygonLayer = null; 
let lineLayer = null; 
let GraphicGlobal = null; 

function initializeMap() {
  console.log("Map Created");
  require([
    'esri/Map',
    'esri/views/MapView',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
  ], function (Map, MapView, Graphic, GraphicsLayer) {
    GraphicGlobal = Graphic;

    map = new Map({ basemap: 'topo-vector' });

    mapView = new MapView({
      container: 'viewDiv', 
      map: map,
      center: [103.9636, 10.277], // Toạ độ Phú Quốc
      zoom: 11,
      highlightOptions: { color: 'blue' },
    });

    polygonLayer = new GraphicsLayer();
    lineLayer = new GraphicsLayer();
    pointLayer = new GraphicsLayer();
    map.addMany([polygonLayer, lineLayer, pointLayer]);

    addDataToLayers(Graphic);

    initializeReverseGeocoding(mapView);


    
    console.log("Map Initialized");
  });
}

function createGraphic(data, Graphic) {
  let geometry = {};

  if (data.type === "polyline") {
    geometry = {
      type: "polyline",
      paths: data.paths,
    };
  } else if (data.type === "polygon") {
    geometry = {
      type: "polygon",
      rings: data.rings,
    };
  } else if (data.type === "point") {
    geometry = {
      type: "point",
      longitude: data.longitude,
      latitude: data.latitude,
    };
  }
  return new Graphic({
    geometry: geometry,
    symbol: data.symbol
  });
}

function addDataToLayers(Graphic) {
  // Thêm các điểm
  jsondata.points.forEach((data) => pointLayer.add(createGraphic(data, Graphic)));

  // Thêm các đường
  jsondata.lines.forEach((data) => lineLayer.add(createGraphic(data, Graphic)));

  // Thêm các đa giác
  jsondata.polygons.forEach((data) => polygonLayer.add(createGraphic(data, Graphic)));

}


function handleLocationChange(event) {
  const phuongNames = {
    duong_dong: "Duong Dong Ward",
    an_thoi: "An Thoi Ward",
    ganh_dau: "Ganh Dau Commune",
    cua_can: "Cua Can Commune",
    cua_duong: "Cua Duong Commune",
    ham_ninh: "Ham Ninh Commune",
    duong_to: "Duong To Commune",
    bai_thom: "Bai Thom Commune",

  };

  const selectedPhuongId = event.target.value;
  const selectedPhuong = phuongNames[selectedPhuongId];
  const location = window.coordsArea[selectedPhuongId];

  if (!selectedPhuong || !location) {
    console.warn(`Could not find: ${selectedPhuongId}`);
    return;
  }

  mapView.goTo({ center: [location.lon, location.lat], zoom: 12 })
    .then(() => {
      console.log(`Đã di chuyển đến: ${selectedPhuong}`);
      drawPointOnMap(location, selectedPhuong); 
    })
    .catch((err) => console.error("Error: ", err));
}

function drawPointOnMap(location, label) {
  const point = new GraphicGlobal({
    geometry: {
      type: "point",
      longitude: location.lon,
      latitude: location.lat
    },
    symbol: {
      type: "simple-marker",
      color: "red",
      size: "12px",
      outline: {
        color: "white",
        width: 2
      }
    }
  });

  pointLayer.removeAll();  
  pointLayer.add(point);  

  addLabelToMap(location, label);
}

function addLabelToMap(coords, text) {
  const labelGraphic = new GraphicGlobal({
    geometry: {
      type: "point",
      longitude: coords.lon,
      latitude: coords.lat
    },
    symbol: {
      type: "text", 
      color: "white", 
      haloColor: "blue", 
      haloSize: "2px", 
      text: text, 
      font: {
        size: 12, 
        family: "Arial", 
        weight: "bold" 
      }
    }
  });

  pointLayer.add(labelGraphic);
}

function setupLocationSelect() {
  const locationSelect = document.getElementById("locationSelect");
  if (!locationSelect) {
    return;
  }

  locationSelect.addEventListener("change", handleLocationChange);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMap();
  
});

window.setupLocationSelect = setupLocationSelect;

function fetchData(type, lat, lon) {
  if (type === 'air') {
    fetchAirData(lat, lon);  
    updateAirQualityChart(lat, lon)
  } else if (type === 'uv') {
    fetchUVIndexData(lat, lon);   
    updateUVIndexChart(lat, lon);
  } else if (type === 'sea') {
    fetchSeaData(lat, lon); 
    updateSeaChart(lat, lon);
  } else if (type === 'weather') {
    fetchWeatherData(lat, lon); 
    fetchForecastData(lat, lon);
    fetchForecastDataDiagram(lat, lon);
  } else {
    console.log("Data type not recognized.");
  }
}

function initializeMapClickEvent(mapView, type) {
  if (mapView.__clickHandler) {
    mapView.__clickHandler.remove();
  }

  const clickHandler = mapView.on('click', function (event) {
    var lat = event.mapPoint.latitude;
    var lon = event.mapPoint.longitude;

    console.log(`[${type}] Click here: ${lat}, ${lon}`);
    fetchData(type, lat, lon);
  });

  mapView.__clickHandler = clickHandler;
}

let lastClickedLon = null;
let lastClickedLat = null;

function initializeReverseGeocoding(mapView) {
  require(["esri/rest/locator"], function (locator) {
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

    mapView.on("click", function (event) {

      const lon = event.mapPoint.longitude;
      const lat = event.mapPoint.latitude;

      lastClickedLon = lon;
      lastClickedLat = lat;

      clearMapPoints(lon, lat);

      locator.locationToAddress(locatorUrl, {
        location: event.mapPoint
      }).then(function (response) {
        console.log("Address: ", response.address);

        drawPointOnMap(
          { lon, lat },
          response.address
        );
      }).catch(function (error) {
        console.log("Could not find address", error);
      });
    });
  });
}


function clearMapPoints(lon, lat) {
  if (!pointLayer) return;

  const graphicsToRemove = [];

  pointLayer.graphics.forEach((graphic) => {
    const pt = graphic.geometry;
    if (
      pt.type === "point" &&
      Math.abs(pt.longitude - lon) < 1e-6 && 
      Math.abs(pt.latitude - lat) < 1e-6
    ) {
      graphicsToRemove.push(graphic);
    }
  });

  pointLayer.removeMany(graphicsToRemove);
}

function clearFixedAreaPoints() {
  if (!pointLayer || !window.coordsArea) return;

  const graphicsToRemove = [];
  const tolerance = 1e-6;

  const fixedCoords = Object.values(window.coordsArea);

  pointLayer.graphics.forEach((graphic) => {
    const pt = graphic.geometry;

    if (pt.type === "point") {
      const match = fixedCoords.some(({ lat, lon }) => {
        return (
          Math.abs(pt.latitude - lat) < tolerance &&
          Math.abs(pt.longitude - lon) < tolerance
        );
      });

      if (match) {
        graphicsToRemove.push(graphic);
      }
    }
  });

  pointLayer.removeMany(graphicsToRemove);
  console.log(`Deleted ${graphicsToRemove.length} fixed area points from the map.`);
}

let currentActiveType = null;

function initSearch(mapView) {
  require(["esri/rest/locator"], function (locator) {
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    
    const inputUser = document.querySelector(".search-input");
    const buttonSearch = document.querySelector(".search-button");

    if (!inputUser || !buttonSearch) {
      console.error("Search input or button not found in the DOM.");
      return;
    }

    function handleSearch() {
      const address = inputUser.value.trim();
      if (!address) return;

      locator.addressToLocations(locatorUrl, {
        address: { "SingleLine": address },
        maxLocations: 1
      }).then(function (candidates) {
        if (candidates.length === 0) {
          alert("Could not find the address.");
          return;
        }

        const location = candidates[0].location;
        const lat = location.y;
        const lon = location.x;

        lastClickedLat = lat;
        lastClickedLon = lon;

        clearMapPoints(lon, lat);
        clearFixedAreaPoints();

        drawPointOnMap({ lat, lon }, address);
        mapView.goTo({ target: location, zoom: 13 });

        if (currentActiveType) {
          fetchData(currentActiveType, lat, lon);
        }
      }).catch(function (err) {
        console.error("Error find address:", err);
      });
    }

    inputUser.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleSearch();
        inputUser.value = ""; 
        document.getElementById("locationSelect").value = "all"; 
      }
    });

    buttonSearch.addEventListener("click", function () {
      handleSearch();
      inputUser.value = ""; 
      document.getElementById("locationSelect").value = "all"; 
    });
  });
}






















