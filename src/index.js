/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const object1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const object2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

  /*  const obj3 = compare(obj1, obj2);
  const str = stringifyAndSort(obj3); stringifyAndSort - делает из объекта строку в заданном формате.
  console.log(str);   
  */ 

  const arrayOne = Object.keys(object1);
  const arrayTwo = Object.keys(object2);

  console.log('{');
  const unionKeys = [...new Set([...arrayOne, ...arrayTwo])]
    .sort()
    .map((key) => {
      if (arrayOne.includes(key) && !arrayTwo.includes(key)) return console.log(`  - ${key}: ${object1[key]}`);

      if (!arrayOne.includes(key) && arrayTwo.includes(key)) return console.log(`  - ${key}: ${object2[key]}`);

      if (arrayOne.includes(key) && arrayTwo.includes(key)) {
        if (object1[key] === object2[key]) return console.log(`    ${key}: ${object1[key]}`); 
        console.log(`  - ${key}: ${object1[key]}`);
        console.log(`  + ${key}: ${object2[key]}`);
        return;
      }
    });
  console.log('}');
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
