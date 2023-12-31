const WEATHER_API_KEY = '5ae9188399f0f81c4c3e4bf2a87a2bf2';

export const setLocationObject = (locationObj, CoordsObj) =>{
    const {lat, lon, name, unit} = CoordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if(unit) {
        locationObj.setUnit(unit);
    }
};

export const getHomeLocation = () => {
    return localStorage.getItem('defaultWeatherLocation');
};

export const getWeatherFromCoords = async (locationObj) => {
     const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
     const url =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`;
    try {
      const weatherStream = await fetch(url);
      const weatherJson = await weatherStream.json();
      return weatherJson;
    } catch (err) {
      console.error(err);
    }
};
  
   
  

export const getCoordsFromApi = async(entryText, units) => {
    const regex =/^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url =`https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
    const encodedUrl = encodeURI(url);
    try {
        const dataStream = await fetch(encodedUrl);
        const jsonData = await dataStream.json();
        return jsonData;
    } catch (err) {
        console.error(err.stack);
    }
};

// const urlDataObj = {
//     text: entryText,
//     units: units
//   };
//   try {
//     const dataStream = await fetch("/.netlify/functions/get_coords.js", {
//       method: "GET",
//       headers: { accept: "application/json" },
    
//     });
//     const jsonData = await dataStream.json();
//     return jsonData;
//   } catch (err) {
//     console.error (err);
//   }
// };


export const cleanText = (text) => {
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};