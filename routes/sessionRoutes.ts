import express from 'express'
import Session from "../schemas/Session";

const router = express.Router()

router.get('/', async (req: any, res: any) => {
    const storedSession: any = await Session.findOne({'expires': {$gt: new Date()}}) 
    if (storedSession) {
        res.json({session: storedSession});
    } else {
        res.json({session: null});
    }
})

export default router