import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/messages.model.js"; // Ensure this path matches your folder structure
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // ⚡️ FIX 1: Extract the 'id' parameter sent from the frontend route (/messages/:id)
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // ⚡️ FIX 2: Corrected $or array to fetch messages in BOTH directions
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId, // ⚡️ FIX 3: Updated to match schema spelling
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const recieverSocketId=getRecieverSocketId(receiverId);

    if(recieverSocketId){
    io.to(recieverSocketId).emit("newMessage", newMessage);   // ✅ use the socket id
}

    // TODO: Realtime implementation using socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};