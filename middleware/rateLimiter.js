import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 48 * 60 * 60 * 1000,
    max: 1,
    message: 'Free usage exceeded. Retry after 48hrs !',
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter