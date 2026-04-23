import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        try {
            if (!title) return;

            await API.post("/tasks", {
                title,
                dueDate: dueDate || null, // 🔥 FIX HERE
            });

            setTitle("");
            setDueDate("");
            fetchTasks();
        } catch (err) {
            alert(err.response?.data?.error || "Error adding task");
        }
    };

    const updateTask = async (task, newStatus) => {
        try {
            await API.put(`/tasks/${task.id}`, {
                status: newStatus,
                dueDate: task.dueDate || null,
            });

            fetchTasks();
        } catch (err) {
            alert("Update failed");
        }
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">

            {/* Header */}
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Task Manager</h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location = "/login";
                    }}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Add Task */}
            <div className="flex gap-3 mb-6">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 p-3 rounded bg-gray-700"
                    placeholder="Enter task..."
                />

                <input
                    type="date"
                    value={dueDate}
                    min={new Date().toISOString().split("T")[0]} // ❗ prevents past dates
                    onChange={(e) => setDueDate(e.target.value)}
                    className="p-3 rounded bg-gray-700"
                />
                <button
                    onClick={addTask}
                    className="bg-green-500 px-6 rounded"
                >
                    Add
                </button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {tasks.map((t) => (
                    <div
                        key={t.id}
                        className="bg-gray-800 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="text-lg">{t.title}</p>

                            <div className="flex gap-2 mt-1 text-sm">
                                <span
                                    className={`px-2 py-1 rounded ${t.status === "completed"
                                            ? "bg-green-600"
                                            : "bg-yellow-600"
                                        }`}
                                >
                                    {t.status}
                                </span>

                                {t.dueDate && (
                                    <span className="bg-blue-600 px-2 py-1 rounded">
                                        📅 {t.dueDate}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 items-center">

                            {/* Status Dropdown */}
                            <select
                                value={t.status}
                                onChange={(e) => updateTask(t, e.target.value)}
                                className="bg-gray-700 p-1 rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                            <button
                                onClick={() => deleteTask(t.id)}
                                className="bg-red-500 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}