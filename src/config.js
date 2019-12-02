const getDataStorePath = function(env) {
  return (
    env.JUICE_TRANSACTIONS_STORE_PATH || "./data/beverageTransactions.json"
  );
};

const timeStamp = function(env) {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};

module.exports = { getDataStorePath, timeStamp };
