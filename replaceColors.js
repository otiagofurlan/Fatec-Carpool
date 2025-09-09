import fs from "fs";
import path from "path";

// Mapear cores antigas -> novas
const colorMap = {
  "#111111": "#111111",
  "#FFC86A": "#FFC86A",
  "#FCFCFC": "#FCFCFC",
  "#111111": "#111111",
  "#FCFCFC": "#FCFCFC",
  "#989898": "#989898",
  "#989898": "#989898",
  "#989898": "#989898",
  "#989898": "#989898",
  "#989898": "#989898",
  "#111111": "#111111",
  "#FFC86A": "#FFC86A",
  "#989898": "#989898",
  "#FCFCFC": "#FCFCFC",
  "#989898": "#989898",
  "#989898": "#989898",
  "#008D60": "#008D60",
  "#FFC86A": "#FFC86A",
  "#111111": "#111111",
  "#008D60": "#008D60",
  "#FCFCFC": "#FCFCFC"
};

// Função recursiva para percorrer a pasta
function replaceInDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath); // entra nas subpastas
    } else if (/\.(js|jsx|ts|tsx|css)$/.test(file)) {
      let content = fs.readFileSync(fullPath, "utf8");
      let newContent = content;

      Object.entries(colorMap).forEach(([oldColor, newColor]) => {
        const regex = new RegExp(oldColor, "gi");
        newContent = newContent.replace(regex, newColor);
      });

      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, "utf8");
        console.log(`✔ Substituído em: ${fullPath}`);
      }
    }
  });
}

// 🚀 Rodar na raiz do projeto
replaceInDir("./");
