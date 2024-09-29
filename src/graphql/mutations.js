/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createStatisticx = /* GraphQL */ `
  mutation CreateStatisticx(
    $input: CreateStatisticxInput!
    $condition: ModelStatisticxConditionInput
  ) {
    createStatisticx(input: $input, condition: $condition) {
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
export const updateStatisticx = /* GraphQL */ `
  mutation UpdateStatisticx(
    $input: UpdateStatisticxInput!
    $condition: ModelStatisticxConditionInput
  ) {
    updateStatisticx(input: $input, condition: $condition) {
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
export const deleteStatisticx = /* GraphQL */ `
  mutation DeleteStatisticx(
    $input: DeleteStatisticxInput!
    $condition: ModelStatisticxConditionInput
  ) {
    deleteStatisticx(input: $input, condition: $condition) {
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
