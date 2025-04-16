const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const connectionString = 'mongodb+srv://ekmtutor:Chino123%25@clusterhomepurchase.54c77fu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHomePurchase'; // Replace with your connection string
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Form Data Schema
const formDataSchema = new mongoose.Schema({  
  categories: String,
  firstName: String,
  lastName: String,
  email: String,
  userEmail: String,
  password: String,
  minPrice: String,
  maxPrice: String,
  houseType: String,
  bedrooms: String,
  bathrooms: String,
  parking: String,
  yearBuilt: String,
  plotSize: String,
  nearBy: String,
  interiorDesign: String,
  facing: String,
  additionalFeatures: String,
});

//Form Data Model
const FormData = mongoose.model('FormData', formDataSchema);

const User = mongoose.model('User', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

app.post('/api/register', async (req, res) => {
  console.log('Request to /api/register');
  console.log('Request body:', req.body);
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  console.log('Request to /api/login');
  console.log('Request body:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Fake token for now
    const token = 'fake_token_for_now';

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.post('/api/submitForm', async (req, res) => {
  console.log('Request to /api/submitForm');
  const formData = req.body;
  console.log('1. Received form data:', formData);

  try {
    const { userEmail } = formData;
    
    const existingFormData = await FormData.findOne({ userEmail });

    if (existingFormData) {
        console.log("Form already submitted by this user");
        return res.status(409).json({ message: 'Form already submitted' });
    }


    const submitData = { ...formData };
    console.log('2. submitData before parsing:', submitData);

    for (const key in submitData) {
        if (submitData[key] && typeof submitData[key] === 'object' && 'label' in submitData[key]) {
            submitData[key] = submitData[key].label;
        }
    }

    console.log('3. submitData after parsing:', submitData);
    
    const newFormData = new FormData(submitData);

    console.log("4. New FormData Object:", newFormData);

    console.log('5. About to save to database...');

    await newFormData.save();

    console.log('6. submitData after saving:', submitData);

    res.status(200).send('Form data saved to database');
  } catch (error) {
    console.error('Error saving form data:', error);
    console.log("Error saving data", error);
    res.status(500).json({ message: 'Error saving form data' , error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});