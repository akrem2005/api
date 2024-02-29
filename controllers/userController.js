const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const hashAsync = promisify(bcrypt.hash);

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Compare the hashed password with the input password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { email: user.email, userId: user._id, isAdmin: user.isAdmin },
      "ardax",
      {
        expiresIn: "48h",
      }
    );
    const activated = user.activated;
    const id = user._id;

    res.json({ token, activated, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const saltRounds = 10;
    const code = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    // Hash the password before saving the user
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Failed to save user" });
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        referal: `https://aradax.com.et/?code=${code}`,
        code,
        shares: 0,
      });

      try {
        const savedUser = await newUser.save();
        res.json(savedUser);
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Failed to save user" });
      }
    });

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codethicaet@gmail.com", // Replace with your Gmail email
        pass: "crbo clfa vtry eovh", // Replace with your Gmail password
      },
    });

    // Setup email data
    const mailOptions = {
      from: "codethicaet@gmail.com",
      to: req.body.email,
      subject: "እንኳን ወደ ARADAX በደህና መጡ።",
      html: `
    <div style="background-color: #161616; color: #ffffff; text-align: center; padding: 20px;">
      <p style="font-size: 20px;">ARADAX Community</p>
      <p style="font-size: 16px;">Welcome to the future of wealth! Get mentorship on how to achieve financial success from actual millionaires. Start your 30-day journey to become rich.</p>
      <img src="https://www.forexfraud.com/wp-content/uploads/2022/09/20-forex-trading-tips-to-be-successful-1024x626.jpg" alt="Sample Image" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0;">
      <button style="background-color: #800080; color: #ffffff; padding: 10px 20px; font-size: 16px; border: none; outline: none; cursor: pointer; border-radius: 5px;">Get Started</button>
    </div>
  `,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error:", error);
      }
      console.log("Message sent:", info.messageId);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the URL parameters

    // Use findByIdAndDelete to find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update only the fields that are provided in the request
    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.profile) {
      user.profile = req.body.profile;
    }

    if (req.body.password) {
      const saltRounds = 10;

      // Hash the password before saving the user
      const hashedPassword = await hashAsync(req.body.password, saltRounds);

      user.password = hashedPassword;
    }

    if (req.body.activated !== undefined) {
      user.activated = req.body.activated;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Failed to update user", details: error.message });
  }
};
exports.passwordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Generate a new password for recovery
    const newPassword = generateRandomPassword();

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Save the new hashed password in the user's document
    user.password = hashedPassword;
    await user.save();

    // Send an email with the new password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codethicaet@gmail.com", // Replace with your Gmail email
        pass: "crbo clfa vtry eovh", // Replace with your Gmail password
      },
    });

    const mailOptions = {
      from: "codethicaet@gmail.com",
      to: email,
      subject: "Password Recovery",
      html: `
        <p>Dear User,</p>
        <p>You have requested to recover your password. Here is your new password:</p>
        <p><strong>${newPassword}</strong></p>
        <p>Please change your password after logging in for security reasons.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      res.json({ message: "Password recovery email sent successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create recovery token" });
  }
};
exports.newsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codethicaet@gmail.com", // Replace with your Gmail email
        pass: "crbo clfa vtry eovh", // Replace with your Gmail password
      },
    });

    // Email options
    const mailOptions = {
      from: "codethicaet@gmail.com", // Sender email address
      to: "lighttech96@gmail.com", // Destination email address
      subject: "Newsletter Request",
      text: `Email: ${email}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: " Newsletter Acepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.feedBack = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codethicaet@gmail.com", // Replace with your Gmail email
        pass: "crbo clfa vtry eovh", // Replace with your Gmail password
      },
    });

    // Email options
    const mailOptions = {
      from: "codethicaet@gmail.com", // Sender email address
      to: "lighttech96@gmail.com", // Destination email address
      subject: "Feedback from " + name,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Feedback sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
exports.incrementSharesForReferringUser = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Referal code is required" });
    }

    const referringUser = await User.findOneAndUpdate({ code: code });

    if (!referringUser) {
      return res.status(404).json({ error: "Referring user not found" });
    }

    referringUser.shares += 1;
    await referringUser.save();

    res.json({ message: "Shares incremented successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to increment shares", details: error.message });
  }
};

function generateRandomPassword(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return newPassword;
}
