import { v4 as uuid } from 'uuid';

interface IUserPrivate{
  id?:string;
  name:string;
  login:string;
}
class User {
  id?:string;

  name:string;

  login:string;

  password:string;

  /**
   * Create user
   * @param {string} id user id
   * @param {string} name user name
   * @param {string} login user login
   * @param {string} password user password
   */
  constructor({
    name,
    login,
    password
  }:User) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user without password
   * @param {User} user user object for modification
   * @returns {{name: *, id: *, login: *}} object without password
   */
  static toResponse(user:User):IUserPrivate {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
