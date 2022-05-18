const initialState = {
  token: "",
  type: "",
  adminDetails: {},
};

const adminDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETADMIN":
      return { ...state, ...action.payload };
    case "REMOVEADMIN":
      return initialState;
    default:
      return { ...state };
  }
};

export default adminDetailsReducer;
