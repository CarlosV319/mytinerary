const initialState = {
  copiaCities: [],
  cities: [],
  city: [],

};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Fetch_cities":
      return {
        ...state,
        copiaCities: action.payload.respuesta,
        cities: action.payload.respuesta,
      };
    case "filtro":
      const filtrado = action.payload.cities.filter((city) =>
        city.name
          .toLowerCase()
          .startsWith(action.payload.value.trim().toLowerCase())
      );
      return {
        ...state,
        cities: filtrado,
      };
    case "FETCH_UNA_CITY":
      return {
        ...state,
        city: action.payload.respuesta,
        success: action.payload.success,
      };
    default:
      return state;
  }
};

export default cityReducer;
