import { Interfaces } from 'utils';

/**
 * integer representing available options for each color item between 0 and 255
 */
export const ITEM_INTESITY = 256;

export function processData(keys: string[]): Interfaces.WebWorkerOutput {
  const { key, color } = getUniqueColor(keys);
  return {
    key,
    color
  };
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @return {number} a random integer
 */
export const getRandomInt = (): number => {
  return Math.floor(Math.random() * (ITEM_INTESITY - 1));
};

/**
 * Get a random color component with an {r,g,b} values
 */
export const getRandomColor: () => Interfaces.Color = () => {
  const redValue = getRandomInt();
  const greenValue = getRandomInt();
  const blueValue = getRandomInt();
  return {
    r: redValue,
    g: greenValue,
    b: blueValue
  };
};

/**
 * Generate a unique key for a given color value
 * @param {Color} c color object
 */
const generateKey: (c: Interfaces.Color) => string = (c: Interfaces.Color) => {
  return `${c.r}&${c.g}&${c.b}`;
};

/**
 * Get a unique color from the given Map collection
 * @param keys Collection of all pixel colors
 */
function getUniqueColor(keys: string[]) {
  let color = getRandomColor();
  let key = generateKey(color);

  while (keys.includes(key)) {
    color = getRandomColor();
    key = generateKey(color);
  }
  return {
    key,
    color
  };
}
