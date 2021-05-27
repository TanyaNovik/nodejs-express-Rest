const uuid = require('uuid').v4;

class User {
  /**
   * Create user
   * @param {string} id user id
   * @param {string} name user name
   * @param {string} login user login
   * @param {string} password user password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user without password
   * @param {User} user user object for modification
   * @returns {{name: *, id: *, login: *}} object without password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
