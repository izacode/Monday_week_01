const videos = [
  { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
  { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
  { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
  { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
  { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

export const videosRepository = {
  getVideos() {
    return videos;
  },
  getVideoById(id: number) {
    const video = videos.find((v) => v.id === id);
    return video ? video : 0;
  },

  createVideo(title: string) {
    const newVideo = {
      id: Number(videos.length + 1),
      title,
      author: "it-incubator.eu",
    };
    videos.push(newVideo);
    return newVideo;
  },
  updateVideoById(id: number, title: string) {
    const updatedVideo = {
      id,
      title,
      author: "it-incubator.eu",
    };
    videos.splice(id - 1, 1, updatedVideo);
    return updatedVideo;
  },
  deleteVideoById(id: number) {
    const video = videos.find((v) => v.id === id);
    return video ? videos.splice(id - 1, 1) : 0;
  },
};
