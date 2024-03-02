
/**
 * @description 判断不空
 * @param val
 * @returns boolean
 */
export function isNotEmpty(val: unknown) {
  const types = typeof val;
  if (types === 'string' && val !== '') return true;
  if (
    types === 'object' &&
    val !== null &&
    JSON.stringify(val) !== '{}' &&
    JSON.stringify(val) !== '[]'
  )
    return true;
  if (types === 'number') {
    if (Number.isNaN(val)) return false;
    return true;
  }
  if (types === 'undefined') return false;
  if (types === 'boolean') return true;
  if (types === 'function') return true;
  return false;
}
