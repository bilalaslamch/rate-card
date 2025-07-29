import { X } from "lucide-react";
import React, { useState } from "react";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (email: string, name: string) => Promise<void>;
  loading?: boolean;
}

export function EmailModal({
  open,
  onClose,
  onSend,
  loading,
}: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    await onSend(email, name);
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div className="absolute inset-0  bg-opacity-40 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
        <X
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold mb-4">Send Rate Card via Email</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
