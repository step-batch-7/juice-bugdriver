const performTransaction = require("./src/beverageTransaction")
  .performTransaction;
const fs = require("fs");

const main = function() {
  const getTime = function() {
    return new Date();
  };
  const empBeverageEntry = process.argv.slice(2);
  const helperFuncs = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync,
    timeStamp: getTime,
  };
  const result = performTransaction(empBeverageEntry, helperFuncs);
  console.log(result);
};
main();
