const initialState = {
  token: "",
  userDetails: {},
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      return { ...state, ...action.payload };

    case "REMOVEUSER":
      return initialState;

    default:
      return { ...state };
  }
};

export default userDetailsReducer;
