const parseInput = function(empBeverageEntry) {
  const beverageEntry = { command: empBeverageEntry[0].slice(2) };
  for (let index = 1; index < empBeverageEntry.length; index += 2) {
    beverageEntry[empBeverageEntry[index].slice(2)] =
      empBeverageEntry[index + 1];
  }
  return beverageEntry;
};

exports.parseInput = parseInput;
