const storeToken = (value) => {
  if (value) {
    localStorage.setItem("token", value);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("token");
  return access_token;
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { storeToken, getToken, removeToken };
