import { authService } from "./auth";

export function handleResponse(response) {
  const data = response.data;

  if (response.status === 401) {
    authService.logout();
    window.location.reload(true);
    const error = response.data.message;
    return error;
  }

  return data;
}
