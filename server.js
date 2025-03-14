const express=require('express');
require('dotenv').config();
const twilio=require('twilio');

const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber="whatsapp:+14155238886";

const client = new twilio(accountSid, authToken);
app.post("/whatsapp", (req, res) => {
    const message = req.body.Body;
    const sender = req.body.From;

    console.log(`Received message: ${message} from ${sender}`);

    client.messages.create({
        from: twilioPhoneNumber,
        to: sender,
        body: 'Poda Patti 😎',
    }).then(response => {
        res.status(200).send("Message Sent!");
    }).catch(error => {
        res.status(500).send(error.message);
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});