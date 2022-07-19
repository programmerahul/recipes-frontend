import http from "./httpServices";
import conf from "../conf.json";
import jwtDecode from "jwt-decode";
const tokenKey = "token";
export async function login(u) {
  const user = {};
  const { username, password } = u;
  user.email = username;
  user.password = password;
  const { data: jwt } = await http.post(conf.authApiEndPoint, user);
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(tokenKey));
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
