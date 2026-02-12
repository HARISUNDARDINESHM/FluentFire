import { ListAllModulesData, GetMyModuleProgressData, GetMyModuleProgressVariables, RecordGameAttemptData, RecordGameAttemptVariables, UpdateMyModuleProgressData, UpdateMyModuleProgressVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListAllModules(options?: useDataConnectQueryOptions<ListAllModulesData>): UseDataConnectQueryResult<ListAllModulesData, undefined>;
export function useListAllModules(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllModulesData>): UseDataConnectQueryResult<ListAllModulesData, undefined>;

export function useGetMyModuleProgress(vars: GetMyModuleProgressVariables, options?: useDataConnectQueryOptions<GetMyModuleProgressData>): UseDataConnectQueryResult<GetMyModuleProgressData, GetMyModuleProgressVariables>;
export function useGetMyModuleProgress(dc: DataConnect, vars: GetMyModuleProgressVariables, options?: useDataConnectQueryOptions<GetMyModuleProgressData>): UseDataConnectQueryResult<GetMyModuleProgressData, GetMyModuleProgressVariables>;

export function useRecordGameAttempt(options?: useDataConnectMutationOptions<RecordGameAttemptData, FirebaseError, RecordGameAttemptVariables>): UseDataConnectMutationResult<RecordGameAttemptData, RecordGameAttemptVariables>;
export function useRecordGameAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<RecordGameAttemptData, FirebaseError, RecordGameAttemptVariables>): UseDataConnectMutationResult<RecordGameAttemptData, RecordGameAttemptVariables>;

export function useUpdateMyModuleProgress(options?: useDataConnectMutationOptions<UpdateMyModuleProgressData, FirebaseError, UpdateMyModuleProgressVariables>): UseDataConnectMutationResult<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
export function useUpdateMyModuleProgress(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyModuleProgressData, FirebaseError, UpdateMyModuleProgressVariables>): UseDataConnectMutationResult<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
