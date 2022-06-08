export function containsObject(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].idDrink === obj.idDrink) {
      return true;
    }
  }

  return false;
}

export function generateRandomID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}
