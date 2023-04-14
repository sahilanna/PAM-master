const initialstate = [];

const updateUserReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'updateUser':
            return state = action.payload;
        default:
            return state;
    }
}

export default updateUserReducer; 