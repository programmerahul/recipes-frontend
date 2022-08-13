import http from "./httpServices";

const url1 = "/users";
const url2 = "/auth";
export async function register(u) {
  const user = {};
  const { username, password, name } = u;
  user.email = username;
  user.password = password;
  user.name = name;
  return await http.post(url1, user);
}
export async function login(u) {
  const user = {};
  const { username, password } = u;
  user.email = username;
  user.password = password;
  return await http.post(url2, user);
}
