export enum ApiData {
  BASE_URL = 'api/users',
  DefaultPort = 4000
}

export enum StatusCode {
  'OK' = 200,
  'Create' = 201,
  'Delete' = 204,
  'NotFound' = 404,
  'BadRequest' = 400,
  'ServerDown' = 500,

}

export enum OperationMessage {
  ServerDown = 'Server is down',
  InvalidId = 'Bad request. Invalid ID',
  NotFound = 'User not found',
  InvalidBodyFields = 'Requred fields is empty',
  NotFoundPath = 'Bad request. Route not found'
}

export enum Processes {
  Current = 'Current process:',
  Run = 'Server is runnig on port',
  Primary = 'Primary started:',
  CPUs = 'CPUs',
  WorkerExid = 'Worker exided:'
  }
