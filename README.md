# Create Note Simple App
> This is a simple web application that allows users to create, read, update, and delete notes. It is built using Express, PugJS, TypeScript, Google OAuth, and Mongoose for data persistence.

## Installation
### To install this application, follow the steps below:
> Clone the repository using `git clone`.
- `git clone https://github.com/adham-source/Note-app.git`
> Install the dependencies using `npm install`.
- `npm install`
> This will install the following `dependencies`:
- "connect-mongo": "^4.6.0",
- "cors": "^2.8.5",
- "dotenv": "^16.0.3",
- "express": "^4.18.2",
- "express-rate-limit": "^6.7.0",
- "express-session": "^1.17.3",
- "helmet": "^6.0.1",
- "method-override": "^3.0.0",
- "mongoose": "^6.8.3",
- "morgan": "^1.10.0",
- "passport": "^0.6.0",
- "passport-google-oauth20": "^2.0.0",
- "pug": "^3.0.2",
- "quill": "^1.3.7",
- "zod": "^3.20.2"
> This will install the following `devDependencies`:
- "@types/cors": "^2.8.13",
- "@types/express": "^4.17.15",
- "@types/express-session": "^1.17.5",
- "@types/method-override": "^0.0.32",
- "@types/morgan": "^1.9.4",
- "@types/passport": "^1.0.11",
- "@types/passport-google-oauth20": "^2.0.11",
- "@types/pug": "^2.0.6",
- "@types/quill": "^2.0.10",
- "nodemon": "^2.0.20",
- "ts-node": "^10.9.1",
- "typescript": "^4.9.4"
> Create a Google OAuth 2.0 client ID in the Google Cloud Console and add the client ID to your environment variables with the name `GOOGLE_CLIENT_ID` and the client secret with the name `GOOGLE_CLIENT_SECRET`.

> Create a MongoDB database and add the connection string to your environment variables with the name `MONGODB_URI`.

> Create file `.env` to set all your environment variables
- `PORT`
- `MONGODB_URI`
- `SECREST_SESSION`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

> Start the server using `npm run dev`.


