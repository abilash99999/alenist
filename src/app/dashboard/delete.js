// components/delete.js
"use client";

import { useState } from "react";

export default function DeleteModal({ setDeleteModal, handleConfirmDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async () => {
        setIsDeleting(true);
        await handleConfirmDelete();
        setIsDeleting(false);
        setDeleteModal(false);
    };

    return (
        <div className="fixed inset-0 bg-transparent bc:\Users\Abilash\Downloads\world-wide-web.png c:\Users\Abilash\Downloads\settings.png c:\Users\Abilash\Downloads\backend.png c:\Users\Abilash\Downloads\home.png c:\Users\Abilash\Downloads\android (1).png c:\Users\Abilash\Downloads\apple.pngg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setDeleteModal(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
