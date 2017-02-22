import cloneDeep from 'lodash.clonedeep'

export { cloneDeep }

export function paddingLeft(padding, value) {
  return String(padding + value).slice(-Math.max(padding.length, value.toString().length))
}

// Calculates the diffeernce between new and orig objects
// Used to send PATCH data to server
// return: [diff data]
// [orig] + [diff data] = [new]
export function diff(origObject, newObject) {
  let r = {}
  for (let prop in origObject) {
    if (origObject.hasOwnProperty(prop) && prop !== '__proto__') { // !['__proto__', '__obj__'].includes(prop)) {
      if (!newObject.hasOwnProperty(prop)) {
        r[prop] = origObject[prop]
      } else if (origObject[prop] === Object(origObject[prop])) {
        let difference = diff(origObject[prop], newObject[prop])
        if (Object.keys(difference).length > 0) {
          r[prop] = difference
        }
      } else if (origObject[prop] !== newObject[prop]) {
        if (newObject[prop] === undefined) {
          r[prop] = 'undefined'
        } else if (newObject[prop] === null) {
          r[prop] = null
        } else {
          r[prop] = newObject[prop]
        }
      }
    }
  }

  return r
}
