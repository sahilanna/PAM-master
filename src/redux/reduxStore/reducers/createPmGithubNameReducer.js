const initialstate = [];

const createPmGithubNameReducer = (
  state = initialstate,
  action
) => {
  if (
    action.type === "createPcreatePmGithubName"
  ) {
    return action.payload;
  }
  return state;
};

export default createPmGithubNameReducer;
