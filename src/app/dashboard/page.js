"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import CreateModal from "./create";
import EditModal from "./edit";
import DeleteModal from "./delete";

export default function ToDoPage() {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from("todo")
            .select("*")
            .order("created_at", { ascending: true }); // Sort by created_at ascending

        if (!error && data) setTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setEditModal(true);
    };

    const confirmDelete = async () => {
        const { error } = await supabase.from("todo").delete().eq("id", deleteId);
        if (!error) {
            setSuccessMsg("✅ To-Do deleted successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
            await fetchTodos();
        } else {
            setErrorMsg(error?.message || "❌ Failed to delete to-do.");
            setTimeout(() => setErrorMsg(""), 3000);
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

            {successMsg && <div className="mb-4 text-green-600 font-semibold">{successMsg}</div>}
            {errorMsg && <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>}

            <button
                onClick={() => setShowModal(true)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + Create To-Do
            </button>

            <div className="overflow-x-auto"> {/* Add horizontal scrolling */}
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">To Do</th>
                            <th className="px-6 py-3 border-b">Description</th>
                            <th className="px-6 py-3 border-b">Created By</th>
                            <th className="px-6 py-3 border-b">Assigned To</th>
                            <th className="px-6 py-3 border-b">Type</th>
                            <th className="px-6 py-3 border-b">Progress</th>
                            <th className="px-6 py-3 border-b">Created Date</th>
                            <th className="px-6 py-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b text-left whitespace-normal break-words max-w-xs">{todo.name}</td>
                                <td className="px-6 py-4 border-b text-left whitespace-normal break-words max-w-sm">{todo.description}</td>
                                <td className="px-6 py-4 border-b">{todo.created_by}</td>
                                <td className="px-6 py-4 border-b">{todo.assigned_to}</td>
                                <td className="px-6 py-4 border-b">{todo.type}</td>
                                <td className="px-6 py-4 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-full 
                                            ${todo.progress === "NOT STARTED"
                                                ? "text-red-600"
                                                : todo.progress === "DEPLOYED"
                                                    ? "text-green-600"
                                                    : todo.progress === "IN PROGRESS"
                                                        ? "text-blue-600"
                                                        : todo.progress === "BLOCKER"
                                                            ? "text-violet-600"
                                                            : "text-gray-300"
                                            }`}
                                    >
                                        {todo.progress}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b">
                                    {new Date(todo.created_at).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="px-6 py-4 border-b">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleEdit(todo)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDeleteId(todo.id);
                                                setDeleteModal(true);
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <CreateModal
                    setShowModal={setShowModal}
                    fetchTodos={fetchTodos}
                    setSuccessMsg={setSuccessMsg}
                    setErrorMsg={setErrorMsg}
                />
            )}

            {editModal && (
                <EditModal
                    selectedTodo={selectedTodo}
                    setEditModal={setEditModal}
                    fetchTodos={fetchTodos}
                    setSuccessMsg={setSuccessMsg}
                    setErrorMsg={setErrorMsg}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    setDeleteModal={setDeleteModal}
                    handleConfirmDelete={confirmDelete}
                />
            )}
        </div>
    );
}
