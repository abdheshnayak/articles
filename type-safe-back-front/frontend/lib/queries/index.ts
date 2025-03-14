import gql from "graphql-tag";

import { executor } from "./executor";

import {
  MainAddTodoMutation,
  MainAddTodoMutationVariables,
  MainGetTodoQuery,
  MainGetTodoQueryVariables,
  MainListTodosQuery,
  MainListTodosQueryVariables,
  MainUpdateTodoMutation,
  MainUpdateTodoMutationVariables,
} from "@/generated/types/server";

export const queries = ({} = {}) => {
  return {
    listTodos: executor(
      gql`
        query ListTodos {
          todos {
            title
            done
            Model {
              ID
            }
          }
        }
      `,
      {
        transform: (data: MainListTodosQuery) => data.todos,
        vars(_: MainListTodosQueryVariables) {},
      },
    ),

    getTodo: executor(
      gql`
        query GetTodo($input: ID!) {
          todo(id: $input) {
            title
          }
        }
      `,
      {
        transform: (data: MainGetTodoQuery) => data.todo,
        vars(_: MainGetTodoQueryVariables) {},
      },
    ),

    addTodo: executor(
      gql`
        mutation AddTodo($input: TodoIn!) {
          createTodo(input: $input) {
            title
            Model {
              ID
            }
          }
        }
      `,
      {
        transform: (data: MainAddTodoMutation) => data.createTodo,
        vars(_: MainAddTodoMutationVariables) {},
      },
    ),

    updateTodo: executor(
      gql`
        mutation updateTodo($input: TodoIn!, $id: ID!) {
          updateTodo(id: $id, input: $input) {
            done
            title
          }
        }
      `,
      {
        transform: (data: MainUpdateTodoMutation) => data.updateTodo,
        vars(_: MainUpdateTodoMutationVariables) {},
      },
    ),
  };
};
