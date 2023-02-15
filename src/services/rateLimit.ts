import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express';
import { createLocals } from './customFunctions';

const retryAfter = 15 * 60 * 1000; // 15 minutes


function getIp(req: Request): string {
    const ip = req.headers['x-forwarded-for'] as string | undefined;
    if (ip) {
        return ip.split(',')[0];
    }
    return req.socket.remoteAddress as string;
}

const limiter = rateLimit({
    windowMs: retryAfter,
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
    handler: (_req: Request, res: Response): void => {
        res.setHeader('Retry-After', retryAfter);
        res.status(429).render("errors/429", {
            locals: createLocals("Errors")
        });
        return
    },
    keyGenerator: getIp
});


export default limiter
