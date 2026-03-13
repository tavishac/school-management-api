const calculateDistance = require("../utils/distanceCalculator");

let schools = [];

exports.addSchool = (req, res) => {

  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newSchool = {
    id: schools.length + 1,
    name,
    address,
    latitude,
    longitude
  };

  schools.push(newSchool);

  res.json({
    message: "School added successfully",
    school: newSchool
  });

};


exports.listSchools = (req, res) => {

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({
      message: "User location required"
    });
  }

  const schoolList = schools.map((school) => {

    const distance = calculateDistance(
      userLat,
      userLon,
      school.latitude,
      school.longitude
    );

    return {
      ...school,
      distance
    };

  });

  schoolList.sort((a, b) => a.distance - b.distance);

  res.json(schoolList);

};