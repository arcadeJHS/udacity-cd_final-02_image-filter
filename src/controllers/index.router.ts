import { Router, Request, Response } from 'express';
import { FilteredimageRouter } from './filteredimage/routes/filteredimage.router';

const router: Router = Router();

router.use('/filteredimage', FilteredimageRouter);

router.get('/', async (req: Request, res: Response) => {    
    return res.status(403).send('/filteredimage');
});

export const IndexRouter: Router = router;