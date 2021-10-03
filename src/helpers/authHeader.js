import { authService } from "./auth";

export function authHeader() {
  const currentUser = authService.currentUserValue;

  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
