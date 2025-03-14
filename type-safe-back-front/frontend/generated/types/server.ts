export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Any: { input: any; output: any };
  Date: { input: any; output: any };
  FieldSet: { input: any; output: any };
  Json: { input: any; output: any };
  Map: { input: any; output: any };
  _Any: { input: any; output: any };
  federation__Policy: { input: any; output: any };
  federation__Scope: { input: any; output: any };
};

export type TodoIn = {
  done: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type MainListTodosQueryVariables = Exact<{ [key: string]: never }>;

export type MainListTodosQuery = {
  todos: Array<{ title: string; done: boolean; Model: { ID: number } }>;
};

export type MainGetTodoQueryVariables = Exact<{
  input: Scalars["ID"]["input"];
}>;

export type MainGetTodoQuery = { todo?: { title: string } };

export type MainAddTodoMutationVariables = Exact<{
  input: TodoIn;
}>;

export type MainAddTodoMutation = {
  createTodo: { title: string; Model: { ID: number } };
};

export type MainUpdateTodoMutationVariables = Exact<{
  input: TodoIn;
  id: Scalars["ID"]["input"];
}>;

export type MainUpdateTodoMutation = {
  updateTodo: { done: boolean; title: string };
};
