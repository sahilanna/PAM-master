const initialstate = [];

const createPMReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'createPM':
            return state = action.payload;
        default:
            return state;
    }
}

export default createPMReducer; 