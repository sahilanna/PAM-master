const initialstate = [];

const updateReducer = (state = initialstate, action) => {
    if (action.type === 'updateProject'){
        return action.payload;
    }
    return state;
}

export default updateReducer; 