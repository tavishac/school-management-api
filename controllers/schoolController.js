const db = require("../config/database");
const calculateDistance = require("../utils/distanceCalculator");

// Add School API
exports.addSchool = (req, res) => {

  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {

    // SHOW FULL DATABASE ERROR
    if (err) {
      console.error("Database Error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
        code: err.code
      });
    }

    res.json({
      message: "School added successfully",
      id: result.insertId
    });

  });

};



// List Schools API
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
      console.error("Database Error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
        code: err.code
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

    // sort by nearest distance
    schoolList.sort((a, b) => a.distance - b.distance);

    res.json(schoolList);

  });

};