const initialstate = [];

const updateReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'updateProject':
            return state = action.payload;
        default:
            return state;
    }
}

export default updateReducer; 