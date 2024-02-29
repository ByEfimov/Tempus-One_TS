export function countEmptyValues(obj: unknown): number {
  let count = 0;
  obj &&
    Object.entries(obj).forEach(([, value]) => {
      if (value === null || value === undefined || value === '') {
        count++;
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((element: unknown) => {
            if (element && typeof element === 'object') {
              count += countEmptyValues(element);
            }
          });
        } else {
          count += countEmptyValues(value);
        }
      }
    });
  return count;
}
