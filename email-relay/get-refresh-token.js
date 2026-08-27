import { google } from "googleapis";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

console.log("GOOGLE_CLIENT_ID loaded:", !!process.env.GOOGLE_CLIENT_ID);
console.log(
  "GOOGLE_CLIENT_SECRET loaded:",
  !!process.env.GOOGLE_CLIENT_SECRET
);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback"
);

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

console.log("\n========================================");
console.log("OPEN THIS URL IN YOUR BROWSER:");
console.log("========================================\n");

console.log(authUrl);

console.log("\n========================================\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Paste the authorization code here: ",
  async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);

      console.log("\n========================================");
      console.log("REFRESH TOKEN:");
      console.log("========================================\n");

      console.log(tokens.refresh_token);

      console.log("\n========================================\n");

      rl.close();
    } catch (error) {
      console.error("\n❌ Failed to get refresh token");

      console.error(
        error.response?.data || error.message
      );

      rl.close();
    }
  }
);