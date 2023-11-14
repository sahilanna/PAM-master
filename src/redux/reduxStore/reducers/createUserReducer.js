const initialstate = [];

const createUserReducer = (state = initialstate, action) => {
    if(action.type === 'createUser'){
            return action.payload;    
    }
    return state;
}

export default createUserReducer; 