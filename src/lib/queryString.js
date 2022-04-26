const keyValueToString = ([key, val]) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    throw new Error("Invalid input");
  }
  return `${key}=${val}`;
};

export function queryString(obj)  {   return Object.entries(obj).map(keyValueToString).join("&");   }

export function parseQueryString(qs)  {   return Object.fromEntries(
    qs.split("&").map((item) => {
      let [key, val] = item.split("=");
      if (val.indexOf(",") !== -1) val = val.split(",");
      return [key, val];
    })
  );   }
