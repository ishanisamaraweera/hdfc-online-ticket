class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    var isLogData = JSON.parse(localStorage.getItem("z-hdfc"));
    if (isLogData) {
      if (isLogData.state.authUser) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    } else {
      this.authenticated = false;
    }
    return this.authenticated;
  }

}

export default new Auth();
