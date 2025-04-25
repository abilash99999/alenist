"use client";
import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function CreateModal({ setShowModal, fetchTodos, setSuccessMsg, setErrorMsg }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        assigned_to: "",
        type: "",
    });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

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

    const handleCreate = async () => {
        setLoading(true);
        setErrorMsg("");
        const { name, description, assigned_to, type } = formData;

        if (name && description && assigned_to && type) {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setLoading(false);
                setErrorMsg("User not authenticated.");
                return;
            }

            const { data, error } = await supabase
                .from("todo")
                .insert([{ name, description, assigned_to, type, created_by: user.email, progress: "NOT STARTED" }])
                .select();

            setLoading(false);

            if (!error && data?.length) {
                setFormData({ name: "", description: "", assigned_to: "", type: "" });
                setShowModal(false);
                setSuccessMsg("✅ To-Do created successfully!");
                setTimeout(() => setSuccessMsg(""), 3000);
                await fetchTodos();
            } else {
                setErrorMsg(error?.message || "❌ Failed to add task.");
                console.error("Error inserting task:", error);
            }
        } else {
            setLoading(false);
            setErrorMsg("❌ Please fill in all fields.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4">
                <h2 className="text-xl font-semibold mb-2">Create New To-Do</h2>

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
                        placeholder="Enter description"
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
                        <option value="FEATURE">FEATURE</option>
                        <option value="BUG">BUG</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
