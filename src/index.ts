import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import dbConnect from './config/dbConnect'
import config from './config/config'
import session from 'express-session'
import passport from 'passport'; 
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
import { createLocals } from './services/customFunctions'

const app: Application = express()
const port: number = 4500 || Number(process.env.PORT)


// configure express-session middleware
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: config.mongodb_uri
        // crypto: {
        //     secret: 'squirrel' // If i want ?
        // }
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // check this 
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', __dirname + '/../views')

app.set('trust proxy', 1)
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', 'http://localhost:4500/assets/js/main.js']
    }
}));
app.use(morgan('dev'))

app.use("/", routes)

app.use("*", (_req: Request, res: Response): void => {
    res.status(404).render('errors/404', { locals: createLocals("Errors") })
})

const start = async () => {
    try {
        await dbConnect(config.mongodb_uri)
        app.listen(port, () => console.info(`Server is running on : http://localhost:${port}`)) 
    } catch (error) {
        console.error(error)
    }
}

start()