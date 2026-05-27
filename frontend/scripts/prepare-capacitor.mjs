import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const indexPath = join(outDir, "index.html");

const redirectHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Life OS</title>
  <script>
    (function () {
      try {
        var token = localStorage.getItem("life_os_token");
        var hasToken = token && token.indexOf("mock-jwt-") !== 0;
        var target = hasToken ? "/dashboard/index.html" : "/login/index.html";
        window.location.replace(target);
      } catch (e) {
        window.location.replace("/login/index.html");
      }
    })();
  </script>
</head>
<body>
  <p style="font-family:sans-serif;text-align:center;margin-top:2rem;color:#94a3b8;">Chargement...</p>
</body>
</html>
`;

writeFileSync(indexPath, redirectHtml, "utf8");
console.log("Capacitor index redirect prepared:", indexPath);
