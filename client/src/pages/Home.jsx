import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useEffect } from "react";

function Home() {
  // Estados da store
  const loadFigures = usePhotoStore((state) => state.homeFigures); // array específico da Home
  const isLoading = usePhotoStore((state) => state.isLoading);
  const selectedPhoto = usePhotoStore((state) => state.selectedPhoto);
  const toggleFigure = usePhotoStore((state) => state.toggleFigure);

  // Funções da store
  const fetchHomePhotos = usePhotoStore((state) => state.fetchHomePhotos);
  const handleFigureClick = usePhotoStore((state) => state.openModal);
  const closeModal = usePhotoStore((state) => state.closeModal);
  const handleToggleLike = usePhotoStore((state) => state.handleToggleLike);

  // Pegar da store
  const loadMore = usePhotoStore((state) => state.loadMore);
  const setLoadMore = usePhotoStore((state) => state.setLoadMore);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 10
      ) {
        setLoadMore((prev) => prev + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setLoadMore]);

  useEffect(() => {
    fetchHomePhotos();
  }, [loadMore, fetchHomePhotos]);

  return (
    <main className="flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      {loadFigures.length > 0 && (
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">Home</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadFigures
              .filter(
                (photo, index, self) =>
                  index === self.findIndex((p) => p.id === photo.id)
              )
              .map((photo) => (
                <Figure
                  key={photo.id}
                  src={photo.src.large}
                  alt={photo.alt}
                  description={photo.alt}
                  like={photo.liked}
                  onClick={() => handleFigureClick(photo)}
                  onLike={() => handleToggleLike(photo.id)}
                />
              ))}
          </section>
          {toggleFigure && selectedPhoto && (
            <Modal
              src={selectedPhoto.src.large}
              description={selectedPhoto.alt}
              alt={selectedPhoto.alt}
              like={selectedPhoto.liked}
              onClick={closeModal}
              onLike={() => handleToggleLike(selectedPhoto.id)}
            />
          )}
        </div>
      )}
      {isLoading && <Loader />}
    </main>
  );
}

export default Home;
