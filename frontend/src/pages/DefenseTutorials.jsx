import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DefenseTutorials = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/feature/defense-tutorials'); 
        const data = await res.json();

        if (res.ok) {
          console.log(data)
          setVideos(data.videos);
        } else {
            toast.error(data.message || 'Failed to fetch videos')
        }
      } 
      catch (err) {
        toast.error(err.message || 'Failed to fetch videos')
      } 
      finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <h2 className="text-3xl font-semibold mb-6 text-center">Self-Defense Tutorials</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1 line-clamp-2">{video.snippet.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{video.snippet.description}</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">{video.snippet.channelTitle}</span> • Published on {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default DefenseTutorials;
