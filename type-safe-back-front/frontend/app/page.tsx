"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { useEffect, useState } from "react";

import { MainListTodosQuery } from "@/generated/types/server";
import { queries } from "@/lib/queries";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "done",
    label: "STATUS",
  },
];

export default function App() {
  const [todos, setTodos] = useState<MainListTodosQuery["todos"]>([]);

  useEffect(() => {
    (async () => {
      const todos = await queries().listTodos({});

      setTodos(todos);
    })();
  }, []);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={todos.map((todo) => ({
          ...todo,
          done: todo.done ? "done" : "pending",
        }))}
      >
        {(item) => (
          <TableRow key={item.Model.ID}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
