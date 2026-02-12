const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'learn-english',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listAllModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllModules');
}
listAllModulesRef.operationName = 'ListAllModules';
exports.listAllModulesRef = listAllModulesRef;

exports.listAllModules = function listAllModules(dc) {
  return executeQuery(listAllModulesRef(dc));
};

const getMyModuleProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyModuleProgress', inputVars);
}
getMyModuleProgressRef.operationName = 'GetMyModuleProgress';
exports.getMyModuleProgressRef = getMyModuleProgressRef;

exports.getMyModuleProgress = function getMyModuleProgress(dcOrVars, vars) {
  return executeQuery(getMyModuleProgressRef(dcOrVars, vars));
};

const recordGameAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordGameAttempt', inputVars);
}
recordGameAttemptRef.operationName = 'RecordGameAttempt';
exports.recordGameAttemptRef = recordGameAttemptRef;

exports.recordGameAttempt = function recordGameAttempt(dcOrVars, vars) {
  return executeMutation(recordGameAttemptRef(dcOrVars, vars));
};

const updateMyModuleProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyModuleProgress', inputVars);
}
updateMyModuleProgressRef.operationName = 'UpdateMyModuleProgress';
exports.updateMyModuleProgressRef = updateMyModuleProgressRef;

exports.updateMyModuleProgress = function updateMyModuleProgress(dcOrVars, vars) {
  return executeMutation(updateMyModuleProgressRef(dcOrVars, vars));
};
