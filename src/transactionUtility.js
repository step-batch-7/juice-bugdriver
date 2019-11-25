const fs = require("fs");
const utils = require("./utils");

const updateEntry = function(entry, beverageEntry, time) {
	const empId = beverageEntry["--empId"];
	const beverage = beverageEntry["--beverage"];
	const quantity = +beverageEntry["--qty"];
	if (!entry.hasOwnProperty(empId)) {
		entry[empId] = {
			empId: +empId,
			orders: [],
			beverageCount: 0,
		};
	}

	entry[empId].orders.push({ beverage, quantity, time });
	entry[empId].beverageCount += quantity;

	return entry;
};

const saveBeverageEntry = function(
	beverageEntry,
	fileName,
	readFileFunc,
	time
) {
	const lastEntry = JSON.parse(
		utils.readFile(fileName, readFileFunc, fs.existsSync)
	);
	const updatedEntry = updateEntry(lastEntry, beverageEntry, time);
	utils.updateTransaction(updatedEntry, fileName);
	return utils.createConfirmMessage(beverageEntry, time);
};

const queryBeverageEntry = function(beverageEntry, fileName, readFileFunc) {
	const empId = beverageEntry["--empId"];
	const empBeverageRecords = JSON.parse(
		utils.readFile(fileName, readFileFunc, fs.existsSync)
	);
	const noOfBaverageConsumed = empBeverageRecords[empId].beverageCount;
	const beveragesConsumed = empBeverageRecords[empId].orders;
	return utils.formatOutputData(empId, beveragesConsumed, noOfBaverageConsumed);
};

exports.save = saveBeverageEntry;
exports.query = queryBeverageEntry;
exports.updateEntry = updateEntry;
