import dotenv from 'dotenv'
dotenv.config()

const { PORT, MONGODB_URI, SECREST_SESSION, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env

const config = {
    port: Number(PORT) as number,
    mongodb_uri: MONGODB_URI as string,
    secret: SECREST_SESSION as string,
    clientID: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string,
    callbackURL: GOOGLE_CALLBACK_URL as string
}

export default config