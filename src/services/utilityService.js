export const apply = (val: mixed, fn) => fn(val)
export const compose = (...arr) => (val: mixed) => arr.reverse().reduce(apply, val)

export function encodeQueryData(data) {
   let arr = [];
   for (let d in data)
		 if ((typeof data[d] !== 'undefined') && (data[d] !== ''))
	     arr.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return arr.join('&');
}
