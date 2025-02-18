'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { addTodo, deleteCompleted } from "../actions/todo-actions";
import { useSession } from "next-auth/react";



export const NewTodo = () => {
    const [description, setDescription] = useState("")

    const { data } = useSession()
    if (!data) { return }
    const userId = (data as any).token.id ?? 'noId'



    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (description.trim().length === 0) return;

        await addTodo(description, userId)
        setDescription('')

    }


    return (
        <form onSubmit={onSubmit} className='flex w-full'>
            <input id="description" value={description} type="text" onChange={(e) => setDescription(e.target.value)}
                className="text-black  w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                placeholder="Nuevo ToDo" />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                onClick={() => deleteCompleted()}
                type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
                <IoTrashOutline />
                Borrar completadas
            </button>


        </form>
    )
}