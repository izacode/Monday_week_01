import { Request, Response, Router } from "express";
import { videosRepository } from "../repositories/videos-repository";

// put here array with videos
export const videosRouter = Router({});

// bind here videosRouter with all handlers



//  GET ALL VIDEOS =========================================
videosRouter.get('/', (req: Request, res: Response ) => {
    const videos = videosRepository.getVideos()
    res.status(200).json(videos);
})

//  GET A SINGLE VIDEO =========================================
videosRouter.get('/:id', (req: Request, res: Response ) => {
    const videoID = Number(req.params.id)
    const video = videosRepository.getVideoById(videoID)
    if(video){
       res.status(200).json(video)
    }else{
        res.status(404).json({
            status: 'fail',
            message: 'ID is not found'
        })
    } 
})

//  CREATE VIDEO =========================================

videosRouter.post('/', (req: Request, res: Response) => {
  if(!req.body.title){
      return res.status(400).json({
          status: 'fail',
          message: "Title is missing"
      })
  }
    const newVideo = videosRepository.createVideo(req.body.title)
    res.status(200).json(newVideo)
})

//  UPDATE VIDEO =========================================

videosRouter.put('/:id',(req: Request,res:Response)=>{
    const videoID = Number(req.params.id); 
    if(isNaN(videoID)){
        res.status(400).json({
            status:  'fail',
            message: 'Invalid ID'
        })
    }else{
        const updatedVideo = videosRepository.updateVideoById(videoID,req.body.title) 
        res.status(200).send(updatedVideo);
    }
})




//  DELETE VIDEO =========================================

videosRouter.delete('/:id', (req: Request, res: Response) => {
  const videoID = Number(req.params.id)
    if(videoID){
       videosRepository.deleteVideoById(videoID)
       res.status(204).json({
           status: 'success',
           message: 'deleted'
       }) 
    }else{
        res.send(404)
    } 
})