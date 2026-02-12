import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'learn-english',
  location: 'us-east4'
};

export const listAllModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllModules');
}
listAllModulesRef.operationName = 'ListAllModules';

export function listAllModules(dc) {
  return executeQuery(listAllModulesRef(dc));
}

export const getMyModuleProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyModuleProgress', inputVars);
}
getMyModuleProgressRef.operationName = 'GetMyModuleProgress';

export function getMyModuleProgress(dcOrVars, vars) {
  return executeQuery(getMyModuleProgressRef(dcOrVars, vars));
}

export const recordGameAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordGameAttempt', inputVars);
}
recordGameAttemptRef.operationName = 'RecordGameAttempt';

export function recordGameAttempt(dcOrVars, vars) {
  return executeMutation(recordGameAttemptRef(dcOrVars, vars));
}

export const updateMyModuleProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyModuleProgress', inputVars);
}
updateMyModuleProgressRef.operationName = 'UpdateMyModuleProgress';

export function updateMyModuleProgress(dcOrVars, vars) {
  return executeMutation(updateMyModuleProgressRef(dcOrVars, vars));
}

