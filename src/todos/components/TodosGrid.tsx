'use client'
import { Todo } from "@prisma/client"
import { Todoitem } from "./Todoitem";

import * as TodosApi from '@/todos/helpers/todos'
import { useRouter } from "next/navigation";
import { toogleTodo } from "../actions/todo-actions";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();
  // const toogleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await TodosApi.updateTodo(id, complete);
  //   router.refresh()
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map(todo => (
          <Todoitem key={todo.id} todo={todo} toogleTodo={toogleTodo} />
        ))
      }
    </div>
  )
}
