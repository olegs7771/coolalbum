const express = require("express");
const router = express.Router();
// get ip
var get_ip = require("ipware")().get_ip;

//get Geo from ip
const geoip = require("geo-from-ip");

router.post("/geo", (req, res) => {
  const ip_info = get_ip(req);
  console.log("ip_info ", ip_info);

  const geoData = geoip.allData(ip_info.clientIp);
  res.status(200).json({
    response: geoData,
    ip_info
  });
});

module.exports = router;
