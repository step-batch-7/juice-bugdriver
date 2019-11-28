const performTransaction = require("./src/beverageTransaction")
  .performTransaction;
const fs = require("fs");

const main = function() {
  const empBeverageEntry = process.argv.slice(2);
  const helperFuncs = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync,
    timeStamp: utils.getTime,
  };
  const result = performTransaction(
    empBeverageEntry,
    fs.readFileSync,
    fs.existsSync
  );
  console.log(result);
};
main();
