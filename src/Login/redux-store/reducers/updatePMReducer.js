const initialstate = [];

const updatePMReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'updatePM':
            return state = action.payload;
        default:
            return state;
    }
}

export default updatePMReducer; 