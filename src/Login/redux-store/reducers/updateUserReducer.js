const initialstate = [];

const updateUserReducer = (state = initialstate, action) => {
    if (action.type === 'updateUser'){
        return action.payload;      
    }
    return state;
}

export default updateUserReducer; 