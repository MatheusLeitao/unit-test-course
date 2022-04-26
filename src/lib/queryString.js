const keyValueToString = ([key, val]) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    throw new Error("Invalid input");
  }
  return `${key}=${val}`;
};

module.exports.queryString = (obj) =>
  Object.entries(obj).map(keyValueToString).join("&");

module.exports.parseQueryString = (qs) =>
  Object.fromEntries(
    qs.split("&").map((item) => {
      let [key, val] = item.split("=");
      if (val.indexOf(",") !== -1) val = val.split(",");
      return [key, val];
    })
  );
