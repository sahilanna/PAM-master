const initialstate = [];

const createPMReducer = (state = initialstate, action) => {
  if (action.type === "createPM") {
    return action.payload;
  }
  return state;
};

export default createPMReducer;
