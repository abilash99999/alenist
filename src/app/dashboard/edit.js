"use client";
import { supabase } from "../../../lib/supabaseClient";
import { useState, useEffect } from "react";

export default function EditModal({
    selectedTodo,
    setEditModal,
    fetchTodos,
    setSuccessMsg,
    setErrorMsg,
}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        assigned_to: "",
        type: "",
        progress: "",
    });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (selectedTodo) {
            setFormData({
                name: selectedTodo.name,
                description: selectedTodo.description,
                assigned_to: selectedTodo.assigned_to,
                type: selectedTodo.type,
                progress: selectedTodo.progress || "",
            });
        }
    }, [selectedTodo]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase.from("users").select("email");
            if (error) {
                console.error("Error fetching users:", error);
            } else {
                setUsers(data);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitEdit = async () => {
        if (!selectedTodo) return;

        setLoading(true);
        setErrorMsg("");
        const { name, description, assigned_to, type, progress } = formData;

        const { error } = await supabase
            .from("todo")
            .update({ name, description, assigned_to, type, progress })
            .eq("id", selectedTodo.id)
            .select();

        setLoading(false);

        if (!error) {
            setEditModal(false);
            setSuccessMsg("✅ To-Do updated successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
            await fetchTodos();
        } else {
            setErrorMsg(error?.message || "❌ Failed to update to-do.");
            console.error("Edit error:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4">
                <h2 className="text-xl font-semibold mb-2">Edit To-Do</h2>

                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter task name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter task description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Assign To</label>
                    <select
                        name="assigned_to"
                        value={formData.assigned_to}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select user</option>
                        {users.map((user, index) => (
                            <option key={index} value={user.email}>
                                {user.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select type</option>
                        <option value="LEGAL">LEGAL</option>
                        <option value="TECHNICAL">TECHNICAL</option>
                        <option value="OTHER">OTHER</option>
                        <option value="HR">HR</option>
                        <option value="FINANCE">FINANCE</option>
                        <option value="MARKETING">MARKETING</option>
                        <option value="SALES">SALES</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Progress</label>
                    <select
                        name="progress"
                        value={formData.progress}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        <option value="">Select progress</option>
                        <option value="NOT STARTED">NOT STARTED</option>
                        <option value="DEPLOYED">DONE</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="DEPLOYED">DEPLOYED</option>
                        <option value="BLOCKER">BLOCKER</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        onClick={() => setEditModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submitEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
