import http from "./httpServices";
import conf from "../conf.json";
export async function login(u) {
  const user = {};
  const { username, password } = u;
  user.email = username;
  user.password = password;
  return await http.post(conf.authApiEndPoint, user);
}
