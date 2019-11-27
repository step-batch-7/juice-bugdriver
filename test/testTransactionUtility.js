const transactionUtility = require("../src/transactionUtility");
const assert = require("assert");
const fs = require("fs");

describe("update transactionRecord with latest entry given", function() {
	const time = new Date("2019-11-25T19:25:19.474Z");
	it("should update empty object with given entry", function() {
		const beverageEntry = {
			empId: "1111",
			beverage: "orange",
			qty: "1",
		};
		const expected = {
			empBeverageRecords: {
				"1111": {
					empId: 1111,
					orders: [{ beverage: "orange", quantity: 1, time: time }],
					beverageCount: 1,
				},
			},
			beverageEntry: {
				empId: "1111",
				beverage: "orange",
				qty: "1",
			},
		};
		const actual = transactionUtility.save({}, beverageEntry, time);
		assert.deepStrictEqual(actual, expected);
	});

	it("should update record with given entry if employee already exists", function() {
		const beverageEntry = {
			empId: "1111",
			beverage: "banana",
			qty: "1",
		};
		const lastObject = {
			"1111": {
				empId: 1111,
				orders: [{ beverage: "orange", quantity: 1, time: time }],
				beverageCount: 1,
			},
		};
		const expected = {
			empBeverageRecords: {
				"1111": {
					empId: 1111,
					orders: [
						{ beverage: "orange", quantity: 1, time: time },
						{ beverage: "banana", quantity: 1, time: time },
					],
					beverageCount: 2,
				},
			},
			beverageEntry: {
				empId: "1111",
				beverage: "banana",
				qty: "1",
			},
		};
		const actual = transactionUtility.save(lastObject, beverageEntry, time);
		assert.deepStrictEqual(actual, expected);
	});
});

describe("queryBeverageEntry", function() {
	const time = new Date("2019-11-25T19:25:19.474Z").toJSON();
	it("should give employee beverageRecord if employee exists", function() {
		const empBeverageRecords = {
			"1111": {
				empId: 1111,
				orders: [{ beverage: "orange", quantity: 1, time: time }],
				beverageCount: 1,
			},
		};
		const beverageEntry = { empId: "1111" };
		const actual = transactionUtility.query(empBeverageRecords, beverageEntry);
		const expected = {
			selectedRecords: [{ empId: "1111", beverage: "orange", quantity: 1, time: time }],
			noOfBeverageConsumed: 1,
		};
		assert.deepStrictEqual(actual, expected);
	});

	it("should give employee beverageRecord if date exists", function() {
		const empBeverageRecords = {
			"1111": {
				empId: 1111,
				orders: [
					{ beverage: "orange", quantity: 1, time: "2019-11-25T10:25:19.474Z" },
					{ beverage: "banana", quantity: 1, time: "2019-11-26T10:25:19.474Z" },
				],
				beverageCount: 1,
			},
		};
		const beverageEntry = { date: "2019-11-25" };
		const actual = transactionUtility.query(empBeverageRecords, beverageEntry);
		const expected = {
			selectedRecords: [
				{
					empId: "1111",
					beverage: "orange",
					quantity: 1,
					time: "2019-11-25T10:25:19.474Z",
				},
			],
			noOfBeverageConsumed: 1,
		};
		assert.deepStrictEqual(actual, expected);
	});

	it("should give employee beverageRecord if employee does not exists", function() {
		const empBeverageRecords = {};
		const beverageEntry = { empId: "1111" };
		const actual = transactionUtility.query(empBeverageRecords, beverageEntry);
		const expected = {
			selectedRecords: [],
			noOfBeverageConsumed: 0,
		};
		assert.deepStrictEqual(actual, expected);
	});

	it("should give employee beverageRecord if empId and date are given", function() {
		const empBeverageRecords = {
			"1111": {
				empId: 1111,
				orders: [
					{ beverage: "orange", quantity: 1, time: "2019-11-25T10:25:19.474Z" },
					{ beverage: "banana", quantity: 1, time: "2019-11-26T10:25:19.474Z" },
				],
				beverageCount: 1,
			},
		};
		const beverageEntry = { empId: "1111", date: "2019-11-26" };
		const actual = transactionUtility.query(empBeverageRecords, beverageEntry);
		const expected = {
			selectedRecords: [
				{
					empId: "1111",
					beverage: "banana",
					quantity: 1,
					time: "2019-11-26T10:25:19.474Z",
				},
			],
			noOfBeverageConsumed: 1,
		};
		assert.deepStrictEqual(actual, expected);
	});

	it("should give employee beverageRecord if date not exists", function() {
		const empBeverageRecords = {};
		const beverageEntry = { date: "2019-11-25" };
		const actual = transactionUtility.query(empBeverageRecords, beverageEntry);
		const expected = {
			selectedRecords: [],
			noOfBeverageConsumed: 0,
		};
		assert.deepStrictEqual(actual, expected);
	});
});
