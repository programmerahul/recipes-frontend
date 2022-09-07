import http from "./httpServices";
export async function register(u) {
  const user = {};
  const { username, password, name } = u;
  user.email = username;
  user.password = password;
  user.name = name;
  return await http.post("/users", user);
}
export async function login(u) {
  const user = {};
  const { username, password } = u;
  user.email = username;
  user.password = password;
  return await http.post("/auth", user);
}
