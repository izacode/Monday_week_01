import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import fs from 'fs';

const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]


app.get('/', (req: Request, res: Response ) => {
    res.send('Hello World!')
})

//  GET ALL VIDEOS =========================================
app.get('/videos', (req: Request, res: Response ) => {
    res.status(200).json(videos);
})

//  GET A SINGLE VIDEO =========================================
app.get('/videos/:id', (req: Request, res: Response ) => {
    const videoID = Number(req.params.id)
    const video = videos.find(v=> v.id===videoID)
    
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

app.post('/videos', (req: Request, res: Response) => {
  if(!req.body.title){
      return res.status(400).json({
          status: 'fail',
          message: "Title is missing"
      })
  }
    const newVideo = {
        id: Number(videos.length+1),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(200).json(videos)
})

//  UPDATE VIDEO =========================================

app.put('/videos/:id',(req: Request,res:Response)=>{
  
    const videoID = Number(req.params.id);
    
    if(isNaN(videoID)){
        res.status(400).json({
            status:  'fail',
            message: 'Invalid ID'
        })
    }else{
        const updatedVideo = {
            id: videoID, 
            title: req.body.title, 
            author: 'it-incubator.eu'
            }
        videos.splice(videoID-1,1,updatedVideo)
        console.log(videos)
        
        res.status(200).send(videos)
    }
})




//  DELETE VIDEO =========================================

app.delete('/videos/:id', (req: Request, res: Response) => {

  const videoID = Number(req.params.id)

    if(videoID){
       videos.splice(videoID-1,1)
       res.status(204).json({
           status: 'success',
           message: 'deleted'
       }) 
    }else{
        res.send(404)
    } 
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
