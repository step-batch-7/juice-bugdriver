const isValidBeverage = function(beverage) {
	return beverage != "";
};

const isValidEmpId = function(empId) {
	return Number(empId) > 0;
};

const isValidDate = function(date) {
	return new Date(date) != "Invalid Date";
};

const isValidQuantity = function(quantity) {
	return Number(quantity) > 0;
};

const isValidArgument = function(optionArgumentPair) {
	const option = optionArgumentPair[0];
	const argument = optionArgumentPair[1];
	const optionValidators = {
		beverage: isValidBeverage,
		empId: isValidEmpId,
		date: isValidDate,
		qty: isValidQuantity,
	};
	return optionValidators[option](argument);
};

const isValidOptions = function(options) {
	const validOptions = {
		save: ["beverage", "empId", "qty"],
		query: ["empId", "date"],
	};
	if (Object.keys(validOptions).includes(options["command"])) {
		const optionEntries = Object.entries(options).slice(1);
		const optionEntriesNotEmpty = optionEntries.length != 0;
		return (
			optionEntriesNotEmpty &&
			optionEntries.every(function(optionArgument) {
				let userOption = optionArgument[0];
				return (
					validOptions[options["command"]].includes(userOption) &&
					isValidArgument(optionArgument)
				);
			})
		);
	}
	return false;
};

const parseInput = function(empBeverageEntry) {
	const beverageEntry = { command: empBeverageEntry[0].slice(2) };
	for (let index = 1; index < empBeverageEntry.length; index += 2) {
		beverageEntry[empBeverageEntry[index].slice(2)] = empBeverageEntry[index + 1];
	}
	const ValidOptions = isValidOptions(beverageEntry);
	return { ValidOptions, beverageEntry };
};

exports.parseInput = parseInput;
