import { google } from 'googleapis';
import { Readable } from 'stream';
import { sendOTP } from './nodemailerConfig';
import { User } from '../schema/user.model';

export async function uploadBasic(fileName: string, modifiedPdfBytes: Uint8Array, clientId: string, clientSecret: string, refreshToken: string, redirectUri: string, email: string) {

    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    client.setCredentials({ refresh_token: refreshToken, scope: 'https://www.googleapis.com/auth/drive'});
    
    const fileContent = new Uint8Array(modifiedPdfBytes);

    const readableStream = new Readable();
    readableStream.push(fileContent);
    readableStream.push(null); 


    const service = google.drive({ version: 'v3', auth:client });
    const requestBody = {
        name: fileName,
        mimeType: 'application/pdf',
    };
    const media = {
        mimeType: 'application/pdf',
        body: readableStream,
    };
    try {
        const file = await service.files.create({            
            requestBody: requestBody,
            media: media,
            fields: 'id',
        });
        const fileId = file.data.id;
        await service.permissions.create({
            fileId:String(fileId),
            requestBody: {
              role: 'reader',
              type: 'anyone'
            }
          });
        // console.log('File url:',`https://drive.google.com/file/d/${file.data.id}/view?usp=sharing`);
          sendOTP (email,`https://drive.google.com/file/d/${file.data.id}/view?usp=sharing`);
          const user = await User.findOne({ email });
          if (!user) return console.log('User not found');
          user.certificateLink = `https://drive.google.com/file/d/${file.data.id}/view?usp=sharing`;
          user?.save();
        return file.data.id;
    } catch (err) {
        throw err;
    }
}

