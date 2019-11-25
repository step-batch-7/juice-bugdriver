const performTransaction = require("./src/beverageTransaction").performTransaction;

const main = function() {
	const empBeverageEntry = process.argv.slice(2);
	const result = performTransaction(empBeverageEntry);
	console.log(result);
};
main();
