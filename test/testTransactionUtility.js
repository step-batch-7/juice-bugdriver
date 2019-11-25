const transactionUtility = require("../src/transactionUtility");
const assert = require("assert");
const fs = require("fs");

describe("update transactionRecord with latest entry given", function() {
	const time = new Date().toJSON();
	it("should update empty object with given entry", function() {
		const beverageEntry = {
			"--empId": "1111",
			"--beverage": "orange",
			"--qty": "1",
		};
		const expected = {
			"1111": {
				empId: 1111,
				orders: [{ beverage: "orange", quantity: 1, time: time }],
				beverageCount: 1,
			},
		};
		const actual = transactionUtility.updateEntry({}, beverageEntry, time);
		assert.deepStrictEqual(actual, expected);
	});

	it("should update record with given entry if employee already exists", function() {
		const beverageEntry = {
			"--empId": "1111",
			"--beverage": "banana",
			"--qty": "1",
		};
		const lastObject = {
			"1111": {
				empId: 1111,
				orders: [{ beverage: "orange", quantity: 1, time: time }],
				beverageCount: 1,
			},
		};
		const expected = {
			"1111": {
				empId: 1111,
				orders: [
					{ beverage: "orange", quantity: 1, time: time },
					{ beverage: "banana", quantity: 1, time: time },
				],
				beverageCount: 2,
			},
		};
		const actual = transactionUtility.updateEntry(
			lastObject,
			beverageEntry,
			time
		);
		assert.deepStrictEqual(actual, expected);
	});
});
