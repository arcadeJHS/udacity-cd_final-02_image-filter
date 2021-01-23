import { Router, Request, Response } from 'express';
import { FilteredimageRouter } from './filteredimage/routes/filteredimage.router';

const router: Router = Router();

router.use('/filteredimage', FilteredimageRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`image filter API`);
});

export const IndexRouter: Router = router;