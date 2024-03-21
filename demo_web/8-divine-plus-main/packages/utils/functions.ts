export const processUnit = (arg: number | string) => {
  if (!arg) return "";

  if (typeof arg === "number") {
    return arg + "px";
  }

  if (typeof arg === "string") {
    if (arg.includes("px")) return arg;
    return arg + "px";
  }
};
