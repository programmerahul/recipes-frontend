import http from "./httpServices";
import jwtDecode from "jwt-decode";
const tokenKey = "token";
const url = "/auth";
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
http.setJwt(getJwt());
export async function login(u) {
  const user = {};
  const { username, password } = u;
  user.email = username;
  user.password = password;
  const { data: jwt } = await http.post(url, user);
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
  getJwt,
};
