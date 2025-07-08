import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection';
import GalleryGrid from '../components/GalleryGrid';
import '../styles/Gallery.css';

const Gallery = () => {
  const { t } = useTranslation();
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/31643020/pexels-photo-31643020/free-photo-of-serene-river-landscape-in-ramamangalam-kerala.png?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.1.alt', 'Village Landscape'),
      category: t('gallery.images.1.category', 'village')
    },
    {
      id: 2,
      src: 'https://media.istockphoto.com/id/491267876/photo/cauliflower-plantation.jpg?b=1&s=612x612&w=0&k=20&c=llHvM15l90TuKxzShH03fgYD57dVT3cMaEOEAnqbXO8=',
      alt: t('gallery.images.2.alt', 'Farming Activities'),
      category: t('gallery.images.2.category', 'agriculture')
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/57901/pexels-photo-57901.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.3.alt', 'Local Festival Celebration'),
      category: t('gallery.images.3.category', 'culture')
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.4.alt', 'Community Meeting'),
      category: t('gallery.images.4.category', 'events')
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.5.alt', 'School Children'),
      category: t('gallery.images.5.category', 'education')
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/28236020/pexels-photo-28236020/free-photo-of-kerala-cultural-programmes.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.6.alt', 'Cultural Program'),
      category: t('gallery.images.6.category', 'culture')
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/31942685/pexels-photo-31942685/free-photo-of-vibrant-temple-scene-in-badami-karnataka.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.7.alt', 'Village Temple'),
      category: t('gallery.images.7.category', 'village')
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/27442241/pexels-photo-27442241/free-photo-of-sultan-sazligi.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.8.alt', 'Wheat Fields'),
      category: t('gallery.images.8.category', 'agriculture')
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/31959161/pexels-photo-31959161/free-photo-of-indian-farmer-bathing-water-buffaloes-in-summer-pond.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.9.alt', 'Village Pond'),
      category: t('gallery.images.9.category', 'village')
    },
    {
      id: 10,
      src: 'https://media.istockphoto.com/id/544678254/photo/inside-field-hospital-tent.jpg?b=1&s=612x612&w=0&k=20&c=DO4_3bruHVM4vOcQOzsGaVyYS83vJlJKGE6D-ZqfnB4=',
      alt: t('gallery.images.10.alt', 'Health Camp'),
      category: t('gallery.images.10.category', 'events')
    },
    {
      id: 11,
      src: 'https://images.pexels.com/photos/31940733/pexels-photo-31940733/free-photo-of-indonesian-students-in-classroom-exam-setting.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: t('gallery.images.11.alt', 'School Activities'),
      category: t('gallery.images.11.category', 'education')
    },
    {
      id: 12,
      src: 'https://media.istockphoto.com/id/143917716/photo/traditional-folk-dancers-in-india.jpg?b=1&s=612x612&w=0&k=20&c=hMcjole_JmhuoLOCops8zjJ1J310lrhCxky5fg4zPro=',
      alt: t('gallery.images.12.alt', 'Traditional Dance'),
      category: t('gallery.images.12.category', 'culture')
    }
  ];

  const videoGallery = [
    {
      id: 1,
      title: t('gallery.videos.1.title', 'Village Development Project'),
      thumbnail: 'https://images.pexels.com/photos/5812063/pexels-photo-5812063.jpeg',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Example video URL
      duration: '3:45',
    },
    {
      id: 2,
      title: t('gallery.videos.2.title', 'Republic Day Celebration 2025'),
      thumbnail: 'https://images.pexels.com/photos/1582493/pexels-photo-1582493.jpeg',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Example video URL
      duration: '5:12',
    },
    {
      id: 3,
      title: t('gallery.videos.3.title', 'Gram Sabha Meeting Highlights'),
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Example video URL
      duration: '7:30',
    }
  ];

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadMessage(t('gallery.uploadSuccess', 'Media uploaded successfully!'));
      setTimeout(() => setUploadMessage(null), 3000);
    }, 1500);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="gallery-page">
      <HeroSection 
        title={t('gallery.title', 'Our Gallery')} 
        subtitle={t('gallery.subtitle', 'Capturing the essence and spirit of Janori')}
        backgroundImage="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=compress&fit=crop&w=1200&q=80"
      />

      <section className="photo-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('gallery.photoGalleryTitle', 'Photo Gallery')}</h2>
            <p>{t('gallery.photoGallerySubtitle', 'A visual journey through our village life and activities')}</p>
          </div>
          <div className="gallery-grid">
            {images.map((img, idx) => (
              <div key={img.id} className="gallery-image-wrapper" onClick={() => openLightbox(idx)} style={{cursor: 'pointer', position: 'relative'}}>
                <img src={img.src} alt={img.alt} className="gallery-image" />
                <div className="gallery-image-overlay">{img.alt}</div>
              </div>
            ))}
          </div>
          {lightboxOpen && (
            <div className="lightbox-overlay" style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}} onClick={closeLightbox}>
              <button onClick={e => {e.stopPropagation(); prevImage();}} style={{position:'absolute', left:30, top:'50%', transform:'translateY(-50%)', fontSize:32, color:'#fff', background:'none', border:'none', cursor:'pointer'}}>&#8592;</button>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} style={{maxHeight:'80vh', maxWidth:'80vw', borderRadius:8}} onClick={e => e.stopPropagation()} />
                <div style={{color:'#fff', marginTop:16, fontSize:20, fontWeight:500, textAlign:'center'}}>{images[lightboxIndex].alt}</div>
              </div>
              <button onClick={e => {e.stopPropagation(); nextImage();}} style={{position:'absolute', right:30, top:'50%', transform:'translateY(-50%)', fontSize:32, color:'#fff', background:'none', border:'none', cursor:'pointer'}}>&#8594;</button>
              <button onClick={e => {e.stopPropagation(); closeLightbox();}} style={{position:'absolute', top:30, right:30, fontSize:32, color:'#fff', background:'none', border:'none', cursor:'pointer'}}>✕</button>
            </div>
          )}
        </div>
      </section>

      <section className="video-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('gallery.videoGalleryTitle', 'Video Gallery')}</h2>
            <p>{t('gallery.videoGallerySubtitle', 'Watch videos showcasing village events and achievements')}</p>
          </div>
          <div className="video-gallery">
            {videoGallery.map(video => (
              <div key={video.id} className="video-item">
                <div className="video-thumbnail" onClick={() => setPlayingVideo(video.id)} style={{ cursor: 'pointer' }}>
                  {playingVideo === video.id ? (
                    <div className="video-player-wrapper">
                      <button className="close-video-btn" onClick={e => { e.stopPropagation(); setPlayingVideo(null); }} style={{position: 'absolute', top: 8, right: 8, zIndex: 2}}>✕</button>
                      <video src={video.videoUrl} controls autoPlay style={{ width: '100%', borderRadius: 8 }} />
                    </div>
                  ) : (
                    <>
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="play-button">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="video-duration">{video.duration}</span>
                    </>
                  )}
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-cta-section">
        <div className="container">
          <div className="gallery-cta-content">
            <h2>{t('gallery.ctaTitle', 'Share Your Village Moments')}</h2>
            <p>{t('gallery.ctaDescription', 'Do you have photos or videos of Janori village events or beautiful locations? Share them with us to be featured in our gallery.')}</p>
            <label className="btn-primary" style={{ cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
              {t('gallery.submitMedia', 'Submit Media')}
              <input
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }}
                disabled={uploading}
                onChange={handleMediaUpload}
                multiple
              />
            </label>
            {uploading && <p style={{ color: '#007bff', marginTop: 8 }}>{t('gallery.uploading', 'Uploading...')}</p>}
            {uploadMessage && <p style={{ color: 'green', marginTop: 8 }}>{uploadMessage}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;