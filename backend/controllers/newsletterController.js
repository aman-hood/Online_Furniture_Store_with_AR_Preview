import { Newsletter } from "../models/newsletterModel.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const exists = await Newsletter.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Already subscribed" });

    await Newsletter.create({ email });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
