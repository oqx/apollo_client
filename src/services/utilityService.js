export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
  
export const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((acc, fn) => fn(acc), fn(...args));

export function encodeQueryData(data) {
  let arr = [];
  for (let d in data)
    if (typeof data[d] !== "undefined" && data[d] !== "")
      arr.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return arr.join("&");
}
