const initialState = false;

const userIsLogged = (state = initialState, action) => {
  switch (action.type) {
    case "SETISLOGGEDIN":
      return (state = true);

    case "SETISLOGGEDOUT":
      return (state = false);

    default:
      return state;
  }
};

export default userIsLogged;
