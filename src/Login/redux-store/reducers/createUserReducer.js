const initialstate = [];

const createUserReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'createUser':
            return state = action.payload;
        default:
            return state;
    }
}

export default createUserReducer; 