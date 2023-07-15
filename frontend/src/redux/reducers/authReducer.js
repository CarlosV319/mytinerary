const initialState = {
  token: null, name: null, urlImage: null, _id: null,
  errores: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("_id", action.payload._id);
      localStorage.setItem("urlImage", action.payload.urlImage);
      return {
        token: action.payload.token, 
            name: action.payload.name,
            urlImage: action.payload.urlImage,
            _id: action.payload._id
            
      };
    case "LOG_OUT":
      return {
        ...state,
            token:null,
            name:null,
            urlImage:null,
            _id:null,
      };
    default:
      return state;
  }
};
export default authReducer;
