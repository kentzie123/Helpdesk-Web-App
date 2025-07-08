const TicketComment = require('../models/ticketComment');

const createTicketComment = async (req, res) => {
    const { ticketId, userId, fullname, comment } = req.body;
    console.log({ticketId, userId, fullname, comment});
    
    if (!ticketId || !userId || !fullname || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newComment = new TicketComment({
            ticketId,
            userId,
            fullname,
            comment
        });

        await newComment.save();
        return res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error creating ticket comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getTicketComments = async (req, res) => {
    const { ticketId } = req.params;

    if (!ticketId) {
        return res.status(400).json({ message: "Ticket ID is required" });
    }

    try {
        const comments = await TicketComment.find({ ticketId }).sort({ createdAt: -1 });
        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching ticket comments:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteTicketComment = async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        return res.status(400).json({ message: "Comment ID is required" });
    }

    try {
        const comment = await TicketComment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting ticket comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createTicketComment,
    getTicketComments,
    deleteTicketComment
}