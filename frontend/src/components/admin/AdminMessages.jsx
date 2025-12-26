import { useEffect, useState } from "react";
import {
  getContactMessages,
  sendReply,
} from "../../services/adminContactService";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeMessage, setActiveMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState(null);


  const loadMessages = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // 📊 STATS (derived state)
  const totalMessages = messages.length;
  const repliedCount = messages.filter(
    (m) => m.status === "replied"
  ).length;
  const newCount = messages.filter(
    (m) => m.status !== "replied"
  ).length;

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSending(true);
      await sendReply(activeMessage._id, replyText);
      setReplyText("");
      setActiveMessage(null);
      loadMessages();
    } catch (err) {
      console.error("Reply failed", err);
      alert("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] px-6 pt-30 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-[#1a1816]">
            Contact Messages
          </h1>
          <p className="text-gray-600 mt-2">
            Messages submitted by users from the contact form
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Messages</p>
            <p className="text-3xl font-semibold text-[#1a1816] mt-2">
              {totalMessages}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Replied</p>
            <p className="text-3xl font-semibold text-green-600 mt-2">
              {repliedCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">New Messages</p>
            <p className="text-3xl font-semibold text-yellow-600 mt-2">
              {newCount}
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-600">Loading messages…</p>
        )}

        {/* EMPTY */}
        {!loading && messages.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            No messages yet.
          </div>
        )}

        {/* MESSAGE LIST */}
        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="flex">
                {/* STATUS BAR */}
                <div
                  className={`w-1 ${
                    m.status === "replied"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                />

                {/* CONTENT */}
                <div className="p-6 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium">
                        {m.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-[#1a1816]">
                          {m.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {m.email}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>

                      <span
                        className={`inline-block mt-1 text-xs px-3 py-1 rounded-full ${
                          m.status === "replied"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-800 leading-relaxed whitespace-pre-line">
                    {m.message}
                  </p>

                  {/* REPLIES */}
                  {m.replies?.length > 0 && (
                    <div className="mt-4 border-l-2 pl-4 space-y-2">
                      {m.replies.map((r, i) => (
                        <div key={i} className="text-sm text-gray-700">
                          <span className="text-xs text-gray-400 block">
                            Reply • {new Date(r.repliedAt).toLocaleString()}
                          </span>
                          {r.message}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setActiveMessage(m)}
                      className="px-4 py-2 text-sm rounded-full border hover:bg-gray-100 transition"
                    >
                      Reply
                    </button>

                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(m.email);
                        setCopiedId(m._id);

                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className={`px-4 py-2 text-sm rounded-full border transition ${
                        copiedId === m._id
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {copiedId === m._id ? "Copied!" : "Copy Email"}
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPLY MODAL */}
      {activeMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-2">
              Reply to {activeMessage.name}
            </h3>

            <textarea
              className="w-full border rounded-lg p-3 h-32"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setActiveMessage(null);
                  setReplyText("");
                }}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSendReply}
                disabled={sending}
                className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
