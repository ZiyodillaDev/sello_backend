import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
export const emailSending = async (email: string, res: Response) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'ziyodillazokirkhujayev@gmail.com',
      pass: 'ziyodilla123',
    },
    secure: true,
  });
  const code: number = Math.floor(100000 + Math.random() * 900000);
  res.cookie('code', code, { maxAge: 120 * 100 * 60 });
  res.cookie('email', email, { maxAge: 120 * 100 * 60 });
  const mailData = {
    from: 'ziyodillazokirkhujayev@gmail.com',
    to: `${email}`,
    subject: 'Confirmation Code',
    text: 'This is your Confirmation Code!',
    html: `<b>Hello</b>
             <br>Confirmation Code is ${code}<br/> Note: Please do not give this information to others<br/>`,
  };

  res.status(200).json({ message: 'Verification code sent to your email' });
  await transporter.sendMail(mailData);
};
