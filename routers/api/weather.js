const express = require("express");
const router = express.Router();
// get ip
var get_ip = require("ipware")().get_ip;

//get Geo from ip
const geoip = require("geo-from-ip");

router.post("/geo", (req, res) => {
  console.log("req.body", req.body);
  const ip_info = get_ip(req);
  console.log("ip_info ", ip_info);

  const allData = geoip.allData(req.body.ip);
  res.status(200).json({
    response: allData
  });
});

module.exports = router;
