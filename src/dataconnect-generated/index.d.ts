import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Attempt_Key {
  id: UUIDString;
  __typename?: 'Attempt_Key';
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

export interface GetMyModuleProgressData {
  userModuleProgresses: ({
    id: UUIDString;
    module: {
      name: string;
    };
      completedGamesCount: number;
      totalGamesCount: number;
      completionPercentage?: number | null;
      lastAccessedAt: TimestampString;
  } & UserModuleProgress_Key)[];
}

export interface GetMyModuleProgressVariables {
  moduleId: UUIDString;
}

export interface ListAllModulesData {
  modules: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    level?: string | null;
  } & Module_Key)[];
}

export interface Module_Key {
  id: UUIDString;
  __typename?: 'Module_Key';
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

export interface RecordGameAttemptData {
  attempt_insert: Attempt_Key;
}

export interface RecordGameAttemptVariables {
  gameId: UUIDString;
  score: number;
  durationSeconds: number;
  completedAt: TimestampString;
}

export interface UpdateMyModuleProgressData {
  userModuleProgress_update?: UserModuleProgress_Key | null;
}

export interface UpdateMyModuleProgressVariables {
  progressId: UUIDString;
  completedGamesCount: number;
  completionPercentage: number;
  lastAccessedAt: TimestampString;
}

export interface UserModuleProgress_Key {
  id: UUIDString;
  __typename?: 'UserModuleProgress_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllModulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllModulesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllModulesData, undefined>;
  operationName: string;
}
export const listAllModulesRef: ListAllModulesRef;

export function listAllModules(): QueryPromise<ListAllModulesData, undefined>;
export function listAllModules(dc: DataConnect): QueryPromise<ListAllModulesData, undefined>;

interface GetMyModuleProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyModuleProgressVariables): QueryRef<GetMyModuleProgressData, GetMyModuleProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyModuleProgressVariables): QueryRef<GetMyModuleProgressData, GetMyModuleProgressVariables>;
  operationName: string;
}
export const getMyModuleProgressRef: GetMyModuleProgressRef;

export function getMyModuleProgress(vars: GetMyModuleProgressVariables): QueryPromise<GetMyModuleProgressData, GetMyModuleProgressVariables>;
export function getMyModuleProgress(dc: DataConnect, vars: GetMyModuleProgressVariables): QueryPromise<GetMyModuleProgressData, GetMyModuleProgressVariables>;

interface RecordGameAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordGameAttemptVariables): MutationRef<RecordGameAttemptData, RecordGameAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordGameAttemptVariables): MutationRef<RecordGameAttemptData, RecordGameAttemptVariables>;
  operationName: string;
}
export const recordGameAttemptRef: RecordGameAttemptRef;

export function recordGameAttempt(vars: RecordGameAttemptVariables): MutationPromise<RecordGameAttemptData, RecordGameAttemptVariables>;
export function recordGameAttempt(dc: DataConnect, vars: RecordGameAttemptVariables): MutationPromise<RecordGameAttemptData, RecordGameAttemptVariables>;

interface UpdateMyModuleProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyModuleProgressVariables): MutationRef<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyModuleProgressVariables): MutationRef<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
  operationName: string;
}
export const updateMyModuleProgressRef: UpdateMyModuleProgressRef;

export function updateMyModuleProgress(vars: UpdateMyModuleProgressVariables): MutationPromise<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
export function updateMyModuleProgress(dc: DataConnect, vars: UpdateMyModuleProgressVariables): MutationPromise<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;

