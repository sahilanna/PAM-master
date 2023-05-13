const initialstate = [];

const createPmGithubNameReducer = (state = initialstate, action) => {
    switch (action.type){
        case 'createPcreatePmGithubName':
            return state = action.payload;
        default:
            return state;
    }
}

export default createPmGithubNameReducer; 