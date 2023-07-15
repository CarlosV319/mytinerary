const City = require("../models/City");

const controllerCities = {
  obtenerCities: async (req, res) => {
    let cities;

    try {
     
      cities = await City.find(); 
    } catch (error) {
      console.error(error);
    }

    res.json({
      respuesta: cities.length > 0 ? cities : "no hay cities",
      success: cities.length > 0 ? true : false,
    });
  },

  obtenerCity: (req, res) => {
    const id = req.params.id;
    City.findOne({ _id: id })
      .then((respuesta) => res.json({ respuesta }))
      .catch((err) => console.error(err));
  },

  agregarCity: (req, res) => {
    const { name, img, pais } = req.body;
    new City({ name, img, pais })
      .save()
      .then((respuesta) => res.json({ respuesta }));

   
  },
  borrarUnaCity: async (req, res) => {
    let city;
    const id = req.params.id;
    try {
      city = await City.findOneAndDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }
    res.json({ respuesta: city, success: true });
  },

  modificarUnaCity: async (req, res) => {
    let id = req.params.id;
    let city = req.body;
    let actualizado;
    try {
      actualizado = await City.findOneAndUpdate({ _id: id }, city, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
    res.json({ success: actualizado ? true : false });
  },
};
module.exports = controllerCities;
