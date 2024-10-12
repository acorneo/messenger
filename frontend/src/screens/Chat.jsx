import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [chats, setChats] = useState([
        { id: 1, name: 'Chat 1' },
        { id: 2, name: 'Chat 2' },
        { id: 3, name: 'Chat 3' }
    ]);
    const [selectedChat, setSelectedChat] = useState(chats[0]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (currentMessage.trim()) {
            setMessages([...messages, { text: currentMessage, sender: 'You' }]);
            setCurrentMessage('');
        }
    };

    return (
        <div className="flex h-screen bg-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="w-1/4 bg-gray-700 p-4">
                <h2 className="text-2xl font-bold mb-4 text-white">Chats</h2>
                <ul>
                    {chats.map(chat => (
                        <li
                            key={chat.id}
                            className={`p-2 mb-2 rounded cursor-pointer ${selectedChat.id === chat.id ? 'bg-gray-600' : 'bg-gray-800'} text-white`}
                            onClick={() => setSelectedChat(chat)}
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col w-3/4 p-4">
                <div className="flex-1 bg-gray-700 p-4 rounded-lg shadow-lg overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-white">{selectedChat.name}</h2>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className="bg-gray-800 p-2 rounded text-white">
                                <strong>{message.sender}:</strong> {message.text}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;