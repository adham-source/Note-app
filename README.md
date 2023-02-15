# Create Note Simple App
> This is a simple web application that allows users to create, read, update, and delete notes. It is built using Express, PugJS, TypeScript, Google OAuth, and Mongoose for data persistence.

## Installation
### To install this application, follow the steps below:
> Clone the repository using `git clone`.
- `git clone https://github.com/adham-source/Note-app.git`
> Install the dependencies using `npm install`.
- `npm install`
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


