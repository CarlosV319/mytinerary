const Router =require('express').Router();
const controllerCities =require('../controllers/controllerCities')
const controllerItineraries =require('../controllers/controllerItineraries')
const controllerUsuario=require('../controllers/controllerUsuario')
const validator=require('../config/validador')
const passport =require ('../config/passport')
const activitiesControllers =require('../controllers/activitiesControllers')


const {obtenerCities,agregarCity,obtenerCity, borrarUnaCity,modificarUnaCity} = controllerCities
const {obtenerItineraries,agregarItinerary,obtenerItinerary, borrarUnaItinerary,modificarUnaItinerary,obtenerItinerariosCiudad,likeDislikeItinerary,controlComment} = controllerItineraries
const {newUser,logIn,tokenVerification}=controllerUsuario
const { addActivity, getActivitiesOfOneItinerary } = activitiesControllers;


Router.route('/cities')
.get(obtenerCities) 
.post(agregarCity)


Router.route('/cities/:id')
.get(obtenerCity)
.delete(borrarUnaCity)
.put(modificarUnaCity)

Router.route('/itineraries')
.get(obtenerItineraries) 
.post(agregarItinerary) 


Router.route('/itineraries/:id')
.get(obtenerItinerary)
.delete(borrarUnaItinerary)
.put(modificarUnaItinerary)

Router.route('/itinerary/:id')
.get(obtenerItinerariosCiudad)

Router.route('/auth/signUp')
.post(validator, newUser)

Router.route('/auth/signIn')
.post(logIn)

Router.route('/tokenVerification')
.get(passport.authenticate("jwt" ,{session:false}),tokenVerification)

Router.route("/itineraries/like/:id")
.put(passport.authenticate("jwt", {session: false}),likeDislikeItinerary)

Router.route("/comments/:id")
.put(passport.authenticate("jwt", {session: false}),controlComment)

Router.route("/activities/:itineraryId")
.get(
    getActivitiesOfOneItinerary
);

Router.route("/activities")
.post(addActivity);



module.exports = Router;