import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles, isValidImageURL, requireAuth } from '../../../util/util';

const router: Router = Router();

/**
 * GET /filteredimage?image_url={{URL}}
 * 
 * QUERY PARAMETERS
 * image_url: URL of a publicly accessible image
 * 
 * RETURNS
 * the filtered image file
 */
router.get('/',
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            let image_url: string = req.query.image_url as string;

            // Validate the image_url query
            if (!image_url) {
                return res.status(400).send(`image_url is required`);
            }

            // Check is an image URL
            if (!isValidImageURL(image_url)) {
                return res.status(400).send(`image_url not well formed`);
            }

            // Filter and image to local path
            const filteredImageLocalPath: string = await filterImageFromURL(image_url);

            // Send the resulting file in the response
            await res.sendFile(filteredImageLocalPath, null, async (error) => {
                if (error) {
                    return res.status(500).send('Image processing error');
                }
                // Deletes any files on the server on finish of the response
                await deleteLocalFiles([filteredImageLocalPath]);
                return res.status(200);
            });
        }
        catch (e) {
            return res.status(500).send('Server error');
        }
    });

export const FilteredimageRouter: Router = router;
