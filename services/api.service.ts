import axios from "axios";
import { reactive, ref } from "vue";

export interface ApiUser {
  ID?: string;
  session_id?: string;
  user_email?: string;
  user_pass?: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  profile_photo_url?: string;
}

export interface ApiRegister {
  route?: "user.register";
}

export interface ApiLogin {
  route?: "user.login";
}

export interface ApiProfile extends ApiUser {
  route?: "user.profile";
}

export interface ApiUpdateProfile extends ApiUser {
  route?: "user.profileUpdate";
}

export interface ApiTranslation {
  ID?: string;
  language?: string;
  code: string;
  value?: string;
}

export interface ApiEditTranslation extends ApiTranslation {
  route?: "translation.add" | "translation.update";
}


export class Api {
  static store = reactive({
    user: null as any,
  });
  static get user() {
    return this.store.user;
  }

  /**
   * `init()` must be called only once on app start.
   */
  static init() {
    console.log("Api::init()");
    const re = localStorage.getItem("user");
    if (re) {
      this.store.user = JSON.parse(re) as ApiUser;
      console.log("user from localStorage: ", Api.user);
    }
  }

  static get isAdmin() {
    return true;
  }

  static get loggedIn() {
    return this.user != null;
  }

  static get notLoggedIn() {
    return !this.loggedIn;
  }

  static async request(req: any) {
    console.log("req: ", req);
    // todo: add session id
    if (this.loggedIn) {
      req.session_id = this.user.session_id;
    }

    const res = await axios.post(
      "http://127.0.0.1/wordpress/v3/index.php",
      null,
      { params: req }
    );
    if (!res.data) throw "ERROR_RESPONSE_DATA_EMPTY";
    // response should never be a string.
    if (typeof res.data === "string") throw "ERROR_RESPONSE_IS_STRING";

    // if there is an error from backend logic, 'code' is not 0. It would be a string begins with 'ERROR_'
    if (res.data.code != 0) throw res.data.code;

    return res.data.data;
  }

  static async version() {
    return await this.request({ route: "app.version" });
  }
  static async register(req: ApiRegister): Promise<ApiUser> {
    req.route = "user.register";
    const re = await this.request(req);
    // console.log("request result: ", re);
    this.saveUser(re);
    return this.user;
  }

  static async login(req: ApiLogin): Promise<ApiUser> {
    req.route = "user.login";
    const re = await this.request(req);
    // console.log("login request result: ", re);
    this.saveUser(re);
    return this.user;
  }

  static async profileUpdate(req: ApiUpdateProfile): Promise<ApiUser> {
    req.route = "user.profileUpdate";
    console.log("req:", req);
    const re = await this.request(req);
    this.saveUser(re);
    return this.user;
  }

  static saveUser(user: ApiUser) {
    this.store.user = user;
    const json = JSON.stringify(user);
    // console.log("json:", json);
    localStorage.setItem("user", json);
  }
  static logout() {
    this.store.user = null as any;
    localStorage.removeItem("user");
  }

  static async listTranslations(): Promise<ApiTranslation[]> {
    const re = await this.request({ route: "translation.list" });
    return re;
  }

  static async addTranslation(
    req: ApiEditTranslation
  ): Promise<ApiTranslation> {
    req.route = "translation.add";
    // console.log("req:", req);
    const re = await this.request(req);
    console.log("addTranslation:RE :", re);
    return re;
  }

  static async updateTranslation(
    req: ApiEditTranslation
  ): Promise<ApiTranslation> {
    req.route = "translation.update";
    // console.log("req:", req);
    const re = await this.request(req);
    console.log("updateTranslation:RE :", re);
    return re;
  }

  static async deleteTranslation(req: ApiTranslation): Promise<ApiTranslation> {
    const req_data = {
      route: "translation.delete",
      // ID: req.ID,
    };
    const re = await this.request(req_data);
    console.log("deleteTranslation:RE :", re);
    return re;
  }
}
