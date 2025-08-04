import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";
import Loader from "../components/Loader";

import usePhotos from "../hooks/usePhotos";

function Home() {
  const {
    loadFigures,
    isLoading,
    selectedPhoto,
    toggleFigure,
    handleFigureClick,
    closeModal,
    toggleLiked,
  } = usePhotos();
  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      {loadFigures.length > 0 && (
        <div className="max-w-screen-xl justify-center mx-auto ">
          <Title title="Home" />

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadFigures.map((photo) => (
              <Figure
                src={photo.src.large}
                description={photo.alt}
                alt={photo.alt}
                key={photo.id}
                like={photo.liked}
                onClick={() => handleFigureClick(photo)}
                onLike={() => toggleLiked(photo.id)}
              />
            ))}
          </section>
          {toggleFigure && (
            <Modal
              src={selectedPhoto.src.large}
              description={selectedPhoto.alt}
              alt={selectedPhoto.alt}
              like={selectedPhoto.liked}
              onClick={closeModal}
              onLike={() => toggleLiked(selectedPhoto.id)}
            />
          )}
        </div>
      )}
      {isLoading && <Loader />}
    </main>
  );
}
export default Home;
