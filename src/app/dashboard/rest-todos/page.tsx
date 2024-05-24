
import prisma from "@/lib/prisma";
import { TodosGrid } from '../../../todos/components/';
import { NewTodo } from "@/todos/components/";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Todos Admin',
  description: 'FH Next 14 Course project',
}

export default async function RestTodosPage() {


  const session = await auth()
  if (!session) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: session?.user?.id },
    orderBy: { description: 'asc' }
  })

  return (
    <div className="flex flex-col">
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />

      </div>

      <TodosGrid todos={todos} />

    </div>
  );
}