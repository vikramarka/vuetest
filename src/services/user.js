const VUE_USERS = 'vue-users';
const LOGGED_IN_USER = 'loggedin-user';

const registerUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem(VUE_USERS)) || [];
    if (users.length > 0) {
      users = users.filter((user) => user.email === email);
      if (users.length === 0) {
        addUser(name, email, password);
        resolve();
      } else {
        reject('user already exits');
      }
    } else {
      addUser(name, email, password);
      resolve();
    }
  });
};

const addUser = (name, email, password) => {
  let users = JSON.parse(localStorage.getItem(VUE_USERS)) || [];
  users.push({
    name,
    email,
    password,
  });
  localStorage.setItem(VUE_USERS, JSON.stringify(users));
};

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem(VUE_USERS)) || [];
    users = users.filter(
      (user) => user.email === email && user.password === password
    );
    if (users.length === 0) {
      reject('Email or password is wrong');
    } else {
      setLoggedInUser(email);
      resolve(users[0]);
    }
  });
};

const getUser = (email) => {
  return new Promise((resolve) => {
    let users = JSON.parse(localStorage.getItem(VUE_USERS)) || [];
    users = users.filter((user) => user.email === email);
    if (users.length > 0) {
      resolve(users[0]);
    } else {
      resolve(null);
    }
  });
};

const getLoggedInUser = () => {
  var loggedInUser = localStorage.getItem(LOGGED_IN_USER);
  if (loggedInUser) {
    return getUser(loggedInUser);
  }
};

const setLoggedInUser = (email) => {
  localStorage.setItem(LOGGED_IN_USER, email);
};

const logoutUser = () => {
  return new Promise((resolve) => {
    localStorage.removeItem(LOGGED_IN_USER);
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

const updateUser = (email, name) => {
  return new Promise((resolve) => {
    let users = JSON.parse(localStorage.getItem(VUE_USERS)) || [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i].name = name;
      }
    }
    localStorage.setItem(VUE_USERS, JSON.stringify(users));
    resolve();
  });
};

export {
  registerUser,
  loginUser,
  getUser,
  getLoggedInUser,
  logoutUser,
  updateUser,
};
