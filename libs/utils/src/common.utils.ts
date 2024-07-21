import {
  MAILING_EMAIL,
  MAILING_HOST,
  MAILING_PASSWORD,
  MAILING_USERNAME,
} from '@app/config';
import { throwRpcError } from '@app/global/errors';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createTransport } from 'nodemailer';
import { catchError, lastValueFrom, timeout } from 'rxjs';

export const sendSvcRequest = async (
  clientProxy: ClientProxy,
  cmd: string,
  data?: any,
) => {
  return await lastValueFrom(
    clientProxy
      .send(cmd, data ?? {})
      .pipe(timeout(60000)) // 1 minutes
      .pipe(catchError((error) => throwRpcError(error))),
  );
};

export const sendMail = (
  sendee: string | string[],
  title: string,
  message: {
    cc?: Array<string>;
    html?: string;
    text?: string;
    attachments?: Array<{ filename: string; content: Buffer | string }>;
  },
  senderName?: string,
) => {
  if (!sendee) return;

  try {
    console.log('Sent mail => ', {
      auth: {
        user: MAILING_USERNAME,
      },
    });

    const transporter = createTransport({
      host: MAILING_HOST,
      port: 465,
      auth: {
        user: MAILING_USERNAME,
        pass: MAILING_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${senderName || 'Schedular-App'} <${MAILING_EMAIL}>`,
      to: sendee,
      subject: title,
      text: message.text,
      html: message.html,
      attachments: message?.attachments || [],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log('Error while sending email => ' + err);
          reject('Error while sending email' + err);
        } else {
          console.log('Email sent => ', info);
          resolve(info);
        }
      });
    }).catch((exp) => {
      Logger.error(exp);
    });
  } catch (exp) {
    Logger.error(exp);
    throw new InternalServerErrorException(null, 'Unable to send mail');
  }
};
