export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;

  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }

  seller[id][key] = value;

  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, defaults) {
  let seller = window.localStorage.__seller__;

  if (!seller) {
    return defaults;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return defaults;
  }
  const ret = seller[key];

  return ret || defaults;
};
