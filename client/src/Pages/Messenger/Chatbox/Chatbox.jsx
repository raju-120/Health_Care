export default function ChatBox({selectedUser,messages,newMessage,handleMessageChange,handleSendMessage}) {
  return (
    <div className="">
        {selectedUser && (
            <>
              <div className="message-container mb-72">
                {messages?.map((message, index) => (
                  <div key={index} className={message.sender === "user" ? "user-message" : "other-message"}>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleMessageChange}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          )}
    </div>
  )
}
