import User from '../models/User.js';

// @desc    Edit phone number
// @route   PUT /api/edit/phonenumber
export const editPhoneNumber = async (req, res) => {
  try {
    const phone = req.body.phone_number;
       
    // +91 followed by 6, 7, 8 or 9 and 9 digits
    const phoneRegex = /^\+91[6-9]\d{9}$/; 
    
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: `${phone} is not a valid phone number!` });
    }

    const existingUser = await User.findOne({ phone_number: phone });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ success: false, message: `This number ${phone} already exists` });
    }

    const user = await User.findByIdAndUpdate(req.userId, { phone_number: phone },
      { new: true }); 

    await user.save();

    return res.status(200).json({ success: true, message: 'Phone number changed / added successfully'});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};





    const phoneRegex = /^\+91[6-9]\d{9}$/;
