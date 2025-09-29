import { useContext, useState, type JSX } from "react";
import { AuthContext } from "../context/AuthContext";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

function Spinner({ loading }: { loading: boolean }): JSX.Element {
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <ArrowPathIcon className={
                loading ?
                    "h-8 w-8 text-blue-600 animate-spin" :
                    "h-8 w-8 text-blue-600"
                } />
        </div>
    )
}

export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"));
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { loading, setLoading } = useContext(AuthContext);

    const handleSave = () => {
        if (selectedNote) {
            // Update existing note
            setNotes(
                notes.map((n) =>
                    n.id === selectedNote.id ? { ...n, title, content, isLive: false } : n
                )
            );
            localStorage.setItem("notes", JSON.stringify(notes.map((n) => (n.id === selectedNote.id ? { ...n, title, content, isLive: false } : n))));
        } else {
            // Add new note
            const newNote = {
                id: Date.now(),
                title: title || "Untitled",
                content,
                isLive: false,
            };
            setNotes([...notes, newNote]);
            localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
        }
        resetForm();
    };

    const syncChanges = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/sync", {
                method: "POST",
                body: JSON.stringify(notes.filter((note) => note.isLive === false)),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.ok) {
                const notesFromServer = data.note.map((note: NoteType) => ({ id: note._id.toString(), title: note.title, content: note.content, isLive: note.isLive }));
                setNotes(notesFromServer);
                localStorage.setItem("notes", JSON.stringify(notesFromServer));
            } else {
                console.log(data);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id: number) => {
        setNotes(notes.filter((n) => n.id !== id));
        localStorage.setItem("notes", JSON.stringify(notes.filter((n) => n.id !== id)));
        resetForm();
    };

    const resetForm = () => {
        setSelectedNote(null);
        setTitle("");
        setContent("");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold mb-4">My Notes</h2>
                    <button className="cursor-pointer" onClick={(e) => syncChanges(e)} >
                        <Spinner loading={loading} />
                    </button>
                </div>
                <ul>
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            onClick={() => {
                                setSelectedNote(note);
                                setTitle(note.title);
                                setContent(note.content);
                            }}
                            className={`p-3 mb-2 rounded-lg cursor-pointer ${selectedNote?.id === note.id
                                ? "bg-blue-100 border border-blue-400"
                                : "bg-gray-50 hover:bg-gray-100"
                                }`}
                        >
                            <h3 className="font-semibold">{note.title}</h3>
                            <p className="text-sm text-gray-600 truncate">
                                {note.content || "No content"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Editor */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">
                    {selectedNote ? "Edit Note" : "New Note"}
                </h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full p-3 mb-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                    {selectedNote && (
                        <button
                            onClick={() => handleDelete(Number(selectedNote.id))}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
