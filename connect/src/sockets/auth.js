
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "********";

// In-memory users store
export const USERS = {}; // { username: { password } }

export function signup(username, password) {
  if (USERS[username]) return { error: "USER_EXISTS" };
  USERS[username] = { password };
  return { ok: true };
}

export function login(username, password) {
  const user = USERS[username];
  if (!user || user.password !== password) return { error: "INVALID_CREDENTIALS" };
  const token = jwt.sign({ username }, SECRET, { expiresIn: "7d" });
  return { ok: true, token };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}
