import { google } from "googleapis";

export const oauthClient  = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:2000/auth/google/callback"
)

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]

export const url = oauthClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true

});