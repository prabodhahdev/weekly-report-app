import { useState } from "react";
import { Bot, Send, X, LoaderCircle } from "lucide-react";
import apiFetch from "../../api/apiFetch";

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userMessage,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await apiFetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "AI request failed"
                );
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: data.answer,
                },
            ]);

        } catch (error) {
            console.error("AI chat error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Sorry, I couldn't process your request.",
                },
            ]);

        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between bg-[#0a1f3d] px-4 py-4 text-white">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#518a88]">
                                <Bot size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    AI Assistant
                                </h3>

                                <p className="text-xs text-gray-300">
                                    Team report assistant
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-2 transition hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">

                        {messages.length === 0 && (
                            <div className="mt-10 text-center">

                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f3f1] text-[#518a88]">
                                    <Bot size={26} />
                                </div>

                                <h4 className="font-semibold text-gray-700">
                                    How can I help?
                                </h4>

                                <p className="mt-1 text-xs text-gray-500">
                                    Ask me about your team's weekly reports.
                                </p>

                                <div className="mt-5 space-y-2 text-left">

                                    <button
                                        onClick={() =>
                                            setMessage(
                                                "What did the team work on last week?"
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-600 transition hover:bg-gray-100"
                                    >
                                        What did the team work on last week?
                                    </button>

                                    <button
                                        onClick={() =>
                                            setMessage(
                                                "What were the main blockers last week?"
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-600 transition hover:bg-gray-100"
                                    >
                                        What were the main blockers last week?
                                    </button>

                                    <button
                                        onClick={() =>
                                            setMessage(
                                                "Give me a summary of the team's work."
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-gray-600 transition hover:bg-gray-100"
                                    >
                                        Give me a summary of the team's work.
                                    </button>

                                </div>

                            </div>
                        )}

                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                                        item.role === "user"
                                            ? "rounded-br-md bg-[#518a88] text-white"
                                            : "rounded-bl-md bg-white text-gray-700 shadow-sm"
                                    }`}
                                >
                                    {item.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                                    <LoaderCircle
                                        size={16}
                                        className="animate-spin"
                                    />
                                    Thinking...
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 bg-white p-3">

                        <div className="flex items-end gap-2">

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about team reports..."
                                rows={1}
                                className="max-h-24 flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#518a88] focus:ring-1 focus:ring-[#518a88]"
                            />

                            <button
                                onClick={handleSend}
                                disabled={
                                    loading ||
                                    !message.trim()
                                }
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#518a88] text-white transition hover:bg-[#426f6d] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>

                        </div>

                        <p className="mt-1 px-1 text-[10px] text-gray-400">
                            Press Enter to send
                        </p>

                    </div>

                </div>
            )}

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#518a88] text-white shadow-lg transition hover:scale-105 hover:bg-[#426f6d]"
                aria-label="Open AI Assistant"
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <Bot size={26} />
                )}
            </button>
        </>
    );
};

export default AIChat;