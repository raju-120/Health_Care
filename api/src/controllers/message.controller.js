import Message from '../models/message.model.js';

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message, senderusername, receiverusername } = req.body;

        //if pdf
        let pdfData = null;
        if(req.file) {
            pdfData = {
                data: req.file.buffer, // The raw binary data of the PDF file
                contentType: req.file.mimetype // The MIME type, e.g., "application/pdf"
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            senderusername,
            receiverusername,
            pdf: pdfData
        });

    
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { sendMessage, getMessages };
