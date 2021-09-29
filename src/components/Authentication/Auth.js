//////////////////////////////
// Author(s): Zakarya Butt 
// Date Made: 13/09/2021
//////////////////////////////

class Auth {
    constructor() {
      this.authenticated = false;
    }

    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();