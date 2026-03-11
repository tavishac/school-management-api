const db = require("../config/database");
const calculateDistance = require("../utils/distanceCalculator");

exports.addSchool = (req, res) => {

  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const query =
    "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      message: "School added successfully",
      id: result.insertId
    });

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

  db.query("SELECT * FROM schools", (err, schools) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
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

  });

};