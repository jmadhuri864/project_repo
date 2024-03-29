import { Twilio } from "twilio";

class SmsService {
    private twilioClient: Twilio;
  
    constructor() {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
  
      this.twilioClient = new Twilio(accountSid, authToken);
    }
  
    async sendMessage(phoneNumber: string, message: string): Promise<void> {
      try {
        await this.twilioClient.messages.create({
          body: message,
          from: 'YOUR_TWILIO_PHONE_NUMBER',
          to: phoneNumber
        });
        console.log('SMS sent successfully');
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }
  }
  async function initiatePhoneNumberVerification(phoneNumber: string): Promise<void> {
    // If you don't want to send the verification code, simply return
    // This method will not send any verification
    return;
  }  