const initialstate = [];

const reducer = (state = initialstate, action) => {
    switch (action.type){
        case 'createProject':
            return state = action.payload;
        default:
            return state;
    }
}

export default reducer; 