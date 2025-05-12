import { useState, useEffect, useCallback } from "react";
import { fetchTasksByUserId, addTask, updateTask, deleteTask } from "@/services/taskService";

const useTasks = (user) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasks = useCallback(async () => {
        if (!user || !user._id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const data = await fetchTasksByUserId(user._id);
            setTasks(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false)
        }
    }, [user]);

    
    useEffect(() => {
        getTasks();
    }, [getTasks]);
    
    const handleAddTask = useCallback(async (task) => {
        try {
            const newTask = await addTask(task);
            setTasks((prev) => [ ...prev, newTask]);
        } catch (err) {
            setError(err);
        }
    }, []);

    const handleUpdateTask = useCallback(async (taskId, updatedTask) => {
        try {
            const updated = await updateTask(taskId, updatedTask);
            setTasks((prev) => prev.map((task) => (task._id === taskId ? updated : task)));
        } catch (err) {
            setError(err);
        }
    }, []);

    const handleDeleteTask = useCallback(async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (err) {
            setError(err);
        }
    }, []);
    
    return { tasks, loading, error, getTasks, handleAddTask, handleUpdateTask, handleDeleteTask };
};

export default useTasks;
