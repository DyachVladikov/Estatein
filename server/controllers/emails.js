import Emails from "../models/Emails.js";

export const setEmails = async (req, res) => {
  try {
    const { email } = req.body;

    const isEmailHasYet = await Emails.findOne({ email });
    if (isEmailHasYet) {
      return res.status(409).json({
        message: "Email already send",
        ok: 409,
      });
    }
    const newEmail = new Emails({
      email: email,
    });

    await newEmail.save();

    return res.status(200).json({
      message: "Email sent successfully",
      ok: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wrong",
      ok: 500,
    });
  }
};
