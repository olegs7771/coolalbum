const express = require("express");
const router = express.Router();
// get ip
var get_ip = require("ipware")().get_ip;

//get Geo from ip
const geoip = require("geo-from-ip");
//get openweather
var weather = require("openweather-apis");

router.post("/weather", (req, res) => {
  const ip_info = get_ip(req);
  console.log("ip_info", ip_info.clientIp);

  //for test only we use our own IP
  const myIP = "84.109.36.175";

  const geoData = geoip.allData(myIP); /// for dev use (ip_info.clientIp)

  console.log("geoData ", geoData);
  console.log(
    "location",
    geoData.location.latitude,
    geoData.location.longitude,
    geoData.city
  );
  //with geoData been obtained we can fetch Weather api
  weather.setLang("en");
  // English - en, Russian - ru, Italian - it, Spanish - es (or sp),
  // Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
  // Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
  // Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
  // Turkish - tr, Croatian - hr, Catalan - ca

  // set city by name
  weather.setCity(geoData.city);
  // or set the coordinates (latitude,longitude)
  weather.setCoordinate(geoData.location.latitude, geoData.location.longitude);
  // or set city by ID (recommended by OpenWeatherMap)
  weather.setCityId(4367872);

  // or set zip code
  // weather.setZipCode(33615);

  // 'metric'  'internal'  'imperial'
  weather.setUnits("metric");

  // check http://openweathermap.org/appid#get for get the APPID
  weather.setAPPID("c2d74bcb0ee7718536f37d0e29bf23b2");

  // get all the JSON file returned from server (rich of info)
  weather.getAllWeather((err, JSONObj) => {
    if (err) {
      res.status(400).json({ status: err });
    }
    if (JSONObj) {
      res.status(200).json({
        data1: JSONObj.weather[0],
        data2: JSONObj.main,
        daytime: {
          sunrise: JSONObj.sys.sunrise,
          sunset: JSONObj.sys.sunset
        },

        location: geoData.city
      });
    } else {
      res.status(200).json({ message: "Waiting for data" });
    }
    console.log("JSONObj", JSONObj);
  });
});

module.exports = router;
