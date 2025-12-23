import Contact from "../models/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Send email (CC yourself automatically)
    await sendEmail({
      to: contact.email,
      subject: "Reply from Homespace Support",
      text: reply,
      cc: process.env.MAIL_USER,
    });

    // Store reply
    contact.replies.push({ message: reply });
    contact.status = "replied";
    await contact.save();

    res.json({ success: true, contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send reply" });
  }
};

