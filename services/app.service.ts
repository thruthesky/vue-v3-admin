export class AppService {
  user = {
    isAdmin: true,
    id: null,
  };

  get isAdmin() {
    return this.user.isAdmin;
  }

  get loggedIn() {
    return !!this.user.id;
  }
  get loggedOut() {
    return !this.loggedIn;
  }
}
