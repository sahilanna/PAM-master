
export const getUserFromSessionStorage = () => {
  const data = sessionStorage.getItem("item");
  return data ? JSON.parse(data) : null;
};

export const setUserInSessionStorage = (userData) => {
  sessionStorage.setItem("item", JSON.stringify(userData));
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

