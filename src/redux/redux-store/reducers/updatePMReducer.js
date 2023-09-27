const initialstate = [];

const updatePMReducer = (state = initialstate, action) => {
    if(action.type === 'updatePM'){
        return action.payload;
    }
    return state;
}

export default updatePMReducer; 