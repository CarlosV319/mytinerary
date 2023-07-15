import axios from "axios";

const cityActions = {
  fetchearCities: () => { 
    return (dispatch, getState) => {
      axios
        .get("http://localhost:4000/api/cities")
        .then((respuesta) =>
          dispatch({ type: "Fetch_cities", payload: respuesta.data })
        );
    };
  },
  filtrar: (cities, value) => {
    return (dispatch, getState) => {
      dispatch({ type: "filtro", payload: { cities, value } });
    };
  },
  fetchUnaCity: (id) => {
    return (dispatch, getState) => {
      axios
        .get("http://localhost:4000/api/cities/" + id)
        .then((respuesta) =>
          dispatch({ type: "FETCH_UNA_CITY", payload: respuesta.data })
        );
    };
  },
};
export default cityActions;
