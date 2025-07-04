const ConfirmationCode = require('../models/confirmationCode');
const sendEmail = require('../utils/sendEmail');
const Users = require('../models/user');

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateConfirmationCode = async (req, res) => {
  const { email } = req.body;
  const code = generateCode();

  if (!email) {
    return res.status(400).json({ error: 'Please provide an email' });
  }

  const emailExist = await Users.findOne({ email });
  if (!emailExist) {
    return res.status(404).json({ error: 'Email not found' });
  }

  try {
    // 👇 Check latest code sent for this email
    const recentCode = await ConfirmationCode.findOne({ userEmail: email })
      .sort({ createdAt: -1 }); // assumes timestamps: true

    if (recentCode) {
      const timeElapsed = Date.now() - new Date(recentCode.createdAt).getTime();
      const cooldownMs = 60 * 1000;

      if (timeElapsed < cooldownMs) {
        const secondsLeft = Math.ceil((cooldownMs - timeElapsed) / 1000);
        return res.status(429).json({
          error: `Please wait ${secondsLeft} seconds before requesting another code.`,
          cooldown: secondsLeft
        });
      }
    }

    // ✅ Passed cooldown check — continue
    const newConfirmationCode = new ConfirmationCode({
      userEmail: email,
      code
    });

    await newConfirmationCode.save();
    await sendEmail(email, code);

    return res.status(200).json({ message: 'Confirmation code created and sent.' });

  } catch (err) {
    console.error('Error generating confirmation code:', err);
    return res.status(500).json({ error: 'Server error while generating confirmation code' });
  }
};

module.exports = {
  generateConfirmationCode
};
