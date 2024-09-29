/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      masa
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        masa
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTodos = /* GraphQL */ `
  query SyncTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        masa
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getStatisticx = /* GraphQL */ `
  query GetStatisticx($id: ID!) {
    getStatisticx(id: $id) {
      id
      username
      savedvalue
      totalvalue
      currerntsavedvalue
      currentotalvalue
      startdate
      visitcount
      lastupdatetime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listStatisticxes = /* GraphQL */ `
  query ListStatisticxes(
    $filter: ModelStatisticxFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatisticxes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        savedvalue
        totalvalue
        currerntsavedvalue
        currentotalvalue
        startdate
        visitcount
        lastupdatetime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncStatisticxes = /* GraphQL */ `
  query SyncStatisticxes(
    $filter: ModelStatisticxFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStatisticxes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        savedvalue
        totalvalue
        currerntsavedvalue
        currentotalvalue
        startdate
        visitcount
        lastupdatetime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
