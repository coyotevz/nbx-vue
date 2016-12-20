import pickBy from 'lodash.pickby'

export function paddingLeft(padding, value) {
  return String(padding + value).slice(-Math.max(padding.length, value.toString().length));
}

// Calculates the diffeernce between new and orig objects
// Used to send PATCH data to server
// return: [diff data]
// [orig] + [diff data] = [new]
export function diffData(origObject, newObject) {
  return pickBy(newObject, (value, key) => {
    return value !== origObject[key]
  })
}
