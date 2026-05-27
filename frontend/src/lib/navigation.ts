export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function navigateTo(path: string) {
  window.location.href = normalizePath(path);
}

export function pathsMatch(current: string, target: string) {
  return normalizePath(current) === normalizePath(target);
}
