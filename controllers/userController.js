const User = require("../models/User");
const otpGenerator = require("otp-generator");

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
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (user.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    const usersave = new User({
      name: req.body.name,
      phone: req.body.phone,
      otp: otp,
    });
    const request = require("request");
    const to = phone;
    const message = otp;
    const template_id = "otp";
    const server = "https://sms.yegara.com/api2/send";
    const username = "YASMINTRADINGS";
    const password = "";
    const postData = {
      to: to,
      message: message,
      template_id: template_id,
      password: password,
      username: username,
    };
    const content = JSON.stringify(postData);
    request.post(
      {
        url: server,
        headers: {
          "Content-type": "application/json",
        },
        body: content,
      },
      (err, response, body) => {
        if (err) {
          console.log(err);
        } else {
          console.log(body);
        }
      }
    );
    await usersave.save();
    // Send the OTP to the user's phone number
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
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
    user.name = req.body.name;
    user.phone = req.body.phone;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.otp === otp) {
      user.otp = null;
      await user.save();
      return res.json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
