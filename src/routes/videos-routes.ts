import { Request, Response, Router } from "express";
import { videosRepository } from "../repositories/videos-repository";
import { body, param } from "express-validator";
import { inputValidatorMiddleware } from "../middlewares/input-validator-middleware";

const titleValidation = body("title")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Title should be at least one character");

const idValidation = param("id")
  .trim()
  .isInt()
  .withMessage("Invalid ID, what is wrong with you?????");

export const videosRouter = Router({});

// bind here videosRouter with all handlers

//  GET ALL VIDEOS =========================================
videosRouter.get("/", (req: Request, res: Response) => {
  const videos = videosRepository.getVideos();
  res.status(200).json(videos);
});

//  GET A SINGLE VIDEO =========================================
videosRouter.get(
  "/:id",
  idValidation,
  inputValidatorMiddleware,
  (req: Request, res: Response) => {
    const video = videosRepository.getVideoById(+req.params.id);
    if(video===0){
      res.status(404).json(video);
    }
    res.status(200).json(video);
  }
);

//  CREATE VIDEO =========================================

videosRouter.post(
  "/",
  titleValidation,
  inputValidatorMiddleware,
  (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title);
    res.status(201).json(newVideo);
  }
);

//  UPDATE VIDEO =========================================

videosRouter.put(
  "/:id",
  titleValidation,
  idValidation,
  inputValidatorMiddleware,
  (req: Request, res: Response) => {
    const updatedVideo = videosRepository.updateVideoById(
      +req.params.id,
      req.body.title
    );
    res.sendStatus(204);
  }
);

//  DELETE VIDEO =========================================

videosRouter.delete(
  "/:id",
  idValidation,
  inputValidatorMiddleware,
  (req: Request, res: Response) => {
    const deletedVideo = videosRepository.deleteVideoById(+req.params.id);
    if (deletedVideo === 0) {
      res.sendStatus(404);
    }


    res.sendStatus(204);
  }
);
