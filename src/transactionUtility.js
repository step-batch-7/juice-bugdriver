const fs = require("fs");
const utils = require("./utils");

const inBeverageOrderAdd = function(empId) {
	return function(beverageRecord) {
		beverageRecord["empId"] = empId;
		return beverageRecord;
	};
};

const getBeverageRecordList = function(beverageRecords) {
	let beverageRecordList = [];
	for (let empBeverageRecord in beverageRecords) {
		const empbeverageOrders = beverageRecords[empBeverageRecord]["orders"];
		const empId = empBeverageRecord;
		const beverageOrders = empbeverageOrders.map(inBeverageOrderAdd(empId));
		beverageRecordList = beverageRecordList.concat(beverageOrders);
	}
	return beverageRecordList;
};

const saveBeverageEntry = function(empBeverageRecords, beverageEntry, time) {
	const empId = beverageEntry["empId"];
	const beverage = beverageEntry["beverage"];
	const quantity = +beverageEntry["qty"];
	if (!empBeverageRecords.hasOwnProperty(empId)) {
		empBeverageRecords[empId] = {
			empId: +empId,
			orders: [],
			beverageCount: 0,
		};
	}
	empBeverageRecords[empId].orders.push({ beverage, quantity, time });
	empBeverageRecords[empId].beverageCount += quantity;

	return { empBeverageRecords, beverageEntry };
};

const recordsHaving = function(employeeId, time, beverage) {
	return function(beverageRecord) {
		const empId = employeeId || beverageRecord["empId"];
		const date = time || beverageRecord["time"];
		const usrBeverage = beverage || beverageRecord["beverage"];
		const desiredDate = new Date(date).toLocaleDateString();
		const actualDate = new Date(beverageRecord["time"]).toLocaleDateString();
		const validEmpId = empId === beverageRecord.empId;
		const validDate = desiredDate === actualDate;
		const validBeverage = usrBeverage === beverageRecord.beverage;
		return validEmpId && validDate && validBeverage;
	};
};

const queryBeverageEntry = function(empBeverageRecords, queryData) {
	const beverageRecordList = getBeverageRecordList(empBeverageRecords);
	const { empId, date, beverage } = queryData;
	const selectedRecords = beverageRecordList.filter(
		recordsHaving(empId, date, beverage)
	);
	const noOfBeverageConsumed = selectedRecords.reduce(function(
		totalQuantity,
		record
	) {
		return totalQuantity + record["quantity"];
	},
	0);
	return { selectedRecords, noOfBeverageConsumed };
};

exports.save = saveBeverageEntry;
exports.query = queryBeverageEntry;
