/* eslint-disable no-console */

// Function compare 2 objects
const genDiff = (objectOne, objectTwo) => {
  const arrayKeys = [...new Set([...(Object.keys(objectOne)), ...(Object.keys(objectTwo))])].sort();

  console.log('{');
  const result = arrayKeys.map((key) => {
    if (objectOne.hasOwnProperty(key) && !objectTwo.hasOwnProperty(key)) return `  - ${key}: ${objectOne[key]}`;
    if (!objectOne.hasOwnProperty(key) && objectTwo.hasOwnProperty(key)) return `  + ${key}: ${objectTwo[key]}`;
    if (objectOne.hasOwnProperty(key) && objectTwo.hasOwnProperty(key)) {
      if (objectOne[key] === objectTwo[key]) return `    ${key}: ${objectOne[key]}`;
      return `  - ${key}: ${objectOne[key]}\n   + ${key}: ${objectTwo[key]}`;
    }
  });
  console.log(result);
  console.log('}');
  return result;
};
  
/*arrayOne.map((keyOne) => {
    console.log(`KEY ONE: ${keyOne}`);
    if (!objectTwo.hasOwnProperty(keyOne[0])) return console.log(`- ${keyOne[0]}: ${keyOne[1]}`);
    arrayTwo.map((keyTwo) => {
      console.log(`COMPARE KEY TWO: ${keyTwo}`);
      if (keyOne[0] === keyTwo[0] && keyOne[1] === keyTwo[1]) console.log(`  ${keyOne[0]}: ${keyOne[1]}`);
      else if (keyOne[0] === keyTwo[0] && keyOne[1] !== keyTwo[1]) {
        console.log(`- ${keyOne[0]}: ${keyOne[1]}`);
        console.log(`+ ${keyTwo[0]}: ${keyTwo[1]}`);
        return;
      }
      if (!objectOne.hasOwnProperty(keyTwo[0])) console.log(`+ ${keyTwo[0]}: ${keyTwo[1]}`);
    });
  });*/

export default genDiff;
