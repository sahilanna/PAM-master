const initialstate = [];

const reducer = (state = initialstate, action) => {
    if(action.type === 'createProject'){
      return action.payload;
    }

    return state;
}

export default reducer; 