import { NextFunction,Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { CreateProfileSchema } from '../schemas/userProfile.schema';
import { findUserByEmail, findUserById } from '../services/user.service';
import { createProfile } from '../services/userProfile.service';

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000, files: 1 },
});

export const uploadPostImage = upload.single('image');

export const resizePostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) return next();

    const user = res.locals.user;

    const fileName = `user-${user.id}-${Date.now()}.jpeg`;
    await sharp(req.file?.buffer)
      .resize(800, 450)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`${__dirname}/../../public/posts/${fileName}`);

    req.body.image = fileName;

    next();
  } catch (err: any) {
    next(err);
  }
};

export const userProfileCreateHandler = async (
  req: Request<{}, {}, CreateProfileSchema>,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await findUserByEmail({ email: req.body.email });

    //const user = await findUserByEmail(req.body.email as string);

    const post = await createProfile(req.body, user!);

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'user profile not created',
      });
    }
    next(err);
  }
};
