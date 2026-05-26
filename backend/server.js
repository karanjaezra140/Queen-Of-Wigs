const express = require('express');
const cors = require('cors');
const axios = require('axios');

const nodemailer = require('nodemailer');

const EMAIL_USER = 'karanjaezra140@gmail.com';
const EMAIL_PASS = 'ooak eoof qnqm kvzk';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// FILL IN THESE DETAILS (Owner's credentials)
// ============================================
const CONSUMER_KEY    = 'gAHm4MvUL8Ie7GPyLi4yj04PuM8Yh7iNpW8PyZjnEoFtDKss';
const CONSUMER_SECRET = 'Mfv968bBtXpzl1cd64pDwWIa7d7anB2U0I5X4FAGgr7G8QPcMaOUamWfMpJEOiFQ';
const SHORTCODE       = '174379'; // sandbox till
const PASSKEY         = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // sandbox passkey
// ============================================
const CALLBACK_URL    = 'https://judge-affected-thaw.ngrok-free.app/api/mpesa/callback';
const MPESA_BASE_URL = 'https://sandbox.safaricom.co.ke';

// Get access token
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return response.data.access_token;
}

// STK Push route
app.post('/api/mpesa/pay', async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: 'QueenOfWigs',
        TransactionDesc: 'Wig Purchase'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Callback route (Safaricom sends payment result here)
app.post('/api/mpesa/callback', (req, res) => {
  const callbackData = req.body;
  console.log('Payment callback received:', JSON.stringify(callbackData, null, 2));

  const resultCode = callbackData?.Body?.stkCallback?.ResultCode;
  if (resultCode === 0) {
    console.log('✅ Payment successful!');
  } else {
    console.log('❌ Payment failed or cancelled');
  }

  res.json({ ResultCode: 0, ResultDesc: 'Success' });
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `New message from ${name} — Queen of Wigs`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Queen of Wigs server running on port ${PORT}`);
});
