const fs = require("fs");
const performTransaction = require("./src/beverageTransaction")
  .performTransaction;
const { timeStamp, getDataStorePath } = require("./src/config");

const main = function() {
  const empBeverageEntry = process.argv.slice(2);
  const helperFuncs = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync,
    timeStamp: timeStamp(process.env),
  };
  const result = performTransaction(empBeverageEntry, helperFuncs);
  console.log(result);
};
main();
