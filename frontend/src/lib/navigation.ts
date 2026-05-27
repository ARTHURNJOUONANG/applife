export function isCapacitorApp(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.protocol === "capacitor:" ||
    (window.location.protocol === "https:" && window.location.hostname === "localhost")
  );
}

export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function toAppPath(path: string): string {
  const normalized = normalizePath(path);
  if (!isCapacitorApp()) return normalized;

  if (normalized === "/") return "/index.html";
  return `${normalized}index.html`;
}

export function navigateTo(path: string) {
  window.location.replace(toAppPath(path));
}

export function pathsMatch(current: string, target: string) {
  const currentNorm = normalizePath(current.replace(/index\.html$/, ""));
  const targetNorm = normalizePath(target);
  return currentNorm === targetNorm;
}
