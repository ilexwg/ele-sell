/**
 * 解析 url 中的参数
 * @example ?id=1234&a=b
 * @return Object { id: 1234, a: b }
 */
export function urlParse() {
  const url = window.location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;

  const arr = url.match(reg);

  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.slice(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const value = decodeURIComponent(tempArr[1]);

      obj[key] = value;
    });
  }

  return obj;
};
