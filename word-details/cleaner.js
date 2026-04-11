const fs = require("fs");

const data = JSON.parse(fs.readFileSync("word-details.json", "utf8"));

function clean(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(clean)
      .filter(v => v !== undefined && !(Array.isArray(v) && v.length === 0));
  }

  if (obj && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      const value = clean(obj[key]);

      // boş değerleri sil
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
      ) {
        continue;
      }

      newObj[key] = value;
    }
    return newObj;
  }

  return obj;
}

const cleaned = clean(data);

fs.writeFileSync("word-details-clean.json", JSON.stringify(cleaned));
console.log("Temizlendi ✅");