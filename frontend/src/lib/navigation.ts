export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function toAppPath(path: string): string {
  return normalizePath(path);
}

export function navigateTo(path: string) {
  window.location.replace(toAppPath(path));
}

export function pathsMatch(current: string, target: string) {
  const currentNorm = normalizePath(current);
  const targetNorm = normalizePath(target);
  return currentNorm === targetNorm;
}
