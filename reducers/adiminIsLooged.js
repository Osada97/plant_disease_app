const initialState = false;

const adminIsLogged = (state = initialState, action) => {
  switch (action.type) {
    case "SETISADMINLOGIN":
      return (state = true);

    case "SETISADMINLOGOUT":
      return (state = false);

    default:
      return state;
  }
};

export default adminIsLogged;
