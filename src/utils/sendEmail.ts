import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    //port: your_smtp_port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
});
//test Transporter
transporter.verify((error,success)=>{
if(error){
    console.log(error);
}
else
console.log("Ready FOR Messages");
console.log(success)
});

//send actual email
export const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};