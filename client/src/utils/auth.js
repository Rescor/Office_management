import { users } from "./data";

export function auth(username) {
  const user = users.filter(user => user.username === username);

  localStorage.setItem('user_id', user[0].id);
  localStorage.setItem('username', user[0].username);
  localStorage.setItem('employee', user[0].employee_name);
  localStorage.setItem('role', user[0].role);
}
