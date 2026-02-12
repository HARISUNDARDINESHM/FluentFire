# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllModules*](#listallmodules)
  - [*GetMyModuleProgress*](#getmymoduleprogress)
- [**Mutations**](#mutations)
  - [*RecordGameAttempt*](#recordgameattempt)
  - [*UpdateMyModuleProgress*](#updatemymoduleprogress)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllModules
You can execute the `ListAllModules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllModules(): QueryPromise<ListAllModulesData, undefined>;

interface ListAllModulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllModulesData, undefined>;
}
export const listAllModulesRef: ListAllModulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllModules(dc: DataConnect): QueryPromise<ListAllModulesData, undefined>;

interface ListAllModulesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllModulesData, undefined>;
}
export const listAllModulesRef: ListAllModulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllModulesRef:
```typescript
const name = listAllModulesRef.operationName;
console.log(name);
```

### Variables
The `ListAllModules` query has no variables.
### Return Type
Recall that executing the `ListAllModules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllModulesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllModulesData {
  modules: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    level?: string | null;
  } & Module_Key)[];
}
```
### Using `ListAllModules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllModules } from '@dataconnect/generated';


// Call the `listAllModules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllModules();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllModules(dataConnect);

console.log(data.modules);

// Or, you can use the `Promise` API.
listAllModules().then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

### Using `ListAllModules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllModulesRef } from '@dataconnect/generated';


// Call the `listAllModulesRef()` function to get a reference to the query.
const ref = listAllModulesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllModulesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.modules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

## GetMyModuleProgress
You can execute the `GetMyModuleProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyModuleProgress(vars: GetMyModuleProgressVariables): QueryPromise<GetMyModuleProgressData, GetMyModuleProgressVariables>;

interface GetMyModuleProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyModuleProgressVariables): QueryRef<GetMyModuleProgressData, GetMyModuleProgressVariables>;
}
export const getMyModuleProgressRef: GetMyModuleProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyModuleProgress(dc: DataConnect, vars: GetMyModuleProgressVariables): QueryPromise<GetMyModuleProgressData, GetMyModuleProgressVariables>;

interface GetMyModuleProgressRef {
  ...
  (dc: DataConnect, vars: GetMyModuleProgressVariables): QueryRef<GetMyModuleProgressData, GetMyModuleProgressVariables>;
}
export const getMyModuleProgressRef: GetMyModuleProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyModuleProgressRef:
```typescript
const name = getMyModuleProgressRef.operationName;
console.log(name);
```

### Variables
The `GetMyModuleProgress` query requires an argument of type `GetMyModuleProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyModuleProgressVariables {
  moduleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyModuleProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyModuleProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyModuleProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyModuleProgress, GetMyModuleProgressVariables } from '@dataconnect/generated';

// The `GetMyModuleProgress` query requires an argument of type `GetMyModuleProgressVariables`:
const getMyModuleProgressVars: GetMyModuleProgressVariables = {
  moduleId: ..., 
};

// Call the `getMyModuleProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyModuleProgress(getMyModuleProgressVars);
// Variables can be defined inline as well.
const { data } = await getMyModuleProgress({ moduleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyModuleProgress(dataConnect, getMyModuleProgressVars);

console.log(data.userModuleProgresses);

// Or, you can use the `Promise` API.
getMyModuleProgress(getMyModuleProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userModuleProgresses);
});
```

### Using `GetMyModuleProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyModuleProgressRef, GetMyModuleProgressVariables } from '@dataconnect/generated';

// The `GetMyModuleProgress` query requires an argument of type `GetMyModuleProgressVariables`:
const getMyModuleProgressVars: GetMyModuleProgressVariables = {
  moduleId: ..., 
};

// Call the `getMyModuleProgressRef()` function to get a reference to the query.
const ref = getMyModuleProgressRef(getMyModuleProgressVars);
// Variables can be defined inline as well.
const ref = getMyModuleProgressRef({ moduleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyModuleProgressRef(dataConnect, getMyModuleProgressVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userModuleProgresses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userModuleProgresses);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## RecordGameAttempt
You can execute the `RecordGameAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recordGameAttempt(vars: RecordGameAttemptVariables): MutationPromise<RecordGameAttemptData, RecordGameAttemptVariables>;

interface RecordGameAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordGameAttemptVariables): MutationRef<RecordGameAttemptData, RecordGameAttemptVariables>;
}
export const recordGameAttemptRef: RecordGameAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordGameAttempt(dc: DataConnect, vars: RecordGameAttemptVariables): MutationPromise<RecordGameAttemptData, RecordGameAttemptVariables>;

interface RecordGameAttemptRef {
  ...
  (dc: DataConnect, vars: RecordGameAttemptVariables): MutationRef<RecordGameAttemptData, RecordGameAttemptVariables>;
}
export const recordGameAttemptRef: RecordGameAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordGameAttemptRef:
```typescript
const name = recordGameAttemptRef.operationName;
console.log(name);
```

### Variables
The `RecordGameAttempt` mutation requires an argument of type `RecordGameAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordGameAttemptVariables {
  gameId: UUIDString;
  score: number;
  durationSeconds: number;
  completedAt: TimestampString;
}
```
### Return Type
Recall that executing the `RecordGameAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordGameAttemptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordGameAttemptData {
  attempt_insert: Attempt_Key;
}
```
### Using `RecordGameAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordGameAttempt, RecordGameAttemptVariables } from '@dataconnect/generated';

// The `RecordGameAttempt` mutation requires an argument of type `RecordGameAttemptVariables`:
const recordGameAttemptVars: RecordGameAttemptVariables = {
  gameId: ..., 
  score: ..., 
  durationSeconds: ..., 
  completedAt: ..., 
};

// Call the `recordGameAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordGameAttempt(recordGameAttemptVars);
// Variables can be defined inline as well.
const { data } = await recordGameAttempt({ gameId: ..., score: ..., durationSeconds: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordGameAttempt(dataConnect, recordGameAttemptVars);

console.log(data.attempt_insert);

// Or, you can use the `Promise` API.
recordGameAttempt(recordGameAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.attempt_insert);
});
```

### Using `RecordGameAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordGameAttemptRef, RecordGameAttemptVariables } from '@dataconnect/generated';

// The `RecordGameAttempt` mutation requires an argument of type `RecordGameAttemptVariables`:
const recordGameAttemptVars: RecordGameAttemptVariables = {
  gameId: ..., 
  score: ..., 
  durationSeconds: ..., 
  completedAt: ..., 
};

// Call the `recordGameAttemptRef()` function to get a reference to the mutation.
const ref = recordGameAttemptRef(recordGameAttemptVars);
// Variables can be defined inline as well.
const ref = recordGameAttemptRef({ gameId: ..., score: ..., durationSeconds: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordGameAttemptRef(dataConnect, recordGameAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attempt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attempt_insert);
});
```

## UpdateMyModuleProgress
You can execute the `UpdateMyModuleProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyModuleProgress(vars: UpdateMyModuleProgressVariables): MutationPromise<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;

interface UpdateMyModuleProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyModuleProgressVariables): MutationRef<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
}
export const updateMyModuleProgressRef: UpdateMyModuleProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyModuleProgress(dc: DataConnect, vars: UpdateMyModuleProgressVariables): MutationPromise<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;

interface UpdateMyModuleProgressRef {
  ...
  (dc: DataConnect, vars: UpdateMyModuleProgressVariables): MutationRef<UpdateMyModuleProgressData, UpdateMyModuleProgressVariables>;
}
export const updateMyModuleProgressRef: UpdateMyModuleProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyModuleProgressRef:
```typescript
const name = updateMyModuleProgressRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyModuleProgress` mutation requires an argument of type `UpdateMyModuleProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyModuleProgressVariables {
  progressId: UUIDString;
  completedGamesCount: number;
  completionPercentage: number;
  lastAccessedAt: TimestampString;
}
```
### Return Type
Recall that executing the `UpdateMyModuleProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyModuleProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyModuleProgressData {
  userModuleProgress_update?: UserModuleProgress_Key | null;
}
```
### Using `UpdateMyModuleProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyModuleProgress, UpdateMyModuleProgressVariables } from '@dataconnect/generated';

// The `UpdateMyModuleProgress` mutation requires an argument of type `UpdateMyModuleProgressVariables`:
const updateMyModuleProgressVars: UpdateMyModuleProgressVariables = {
  progressId: ..., 
  completedGamesCount: ..., 
  completionPercentage: ..., 
  lastAccessedAt: ..., 
};

// Call the `updateMyModuleProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyModuleProgress(updateMyModuleProgressVars);
// Variables can be defined inline as well.
const { data } = await updateMyModuleProgress({ progressId: ..., completedGamesCount: ..., completionPercentage: ..., lastAccessedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyModuleProgress(dataConnect, updateMyModuleProgressVars);

console.log(data.userModuleProgress_update);

// Or, you can use the `Promise` API.
updateMyModuleProgress(updateMyModuleProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userModuleProgress_update);
});
```

### Using `UpdateMyModuleProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyModuleProgressRef, UpdateMyModuleProgressVariables } from '@dataconnect/generated';

// The `UpdateMyModuleProgress` mutation requires an argument of type `UpdateMyModuleProgressVariables`:
const updateMyModuleProgressVars: UpdateMyModuleProgressVariables = {
  progressId: ..., 
  completedGamesCount: ..., 
  completionPercentage: ..., 
  lastAccessedAt: ..., 
};

// Call the `updateMyModuleProgressRef()` function to get a reference to the mutation.
const ref = updateMyModuleProgressRef(updateMyModuleProgressVars);
// Variables can be defined inline as well.
const ref = updateMyModuleProgressRef({ progressId: ..., completedGamesCount: ..., completionPercentage: ..., lastAccessedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyModuleProgressRef(dataConnect, updateMyModuleProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userModuleProgress_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userModuleProgress_update);
});
```

