import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

import usePhotos from "../hooks/usePhotos";
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";

function Search() {
  const { search } = useContext(DataContext);
  const {
    loadFigures,
    isLoading,
    selectedPhoto,
    toggleFigure,
    handleFigureClick,
    closeModal,
    toggleLiked,
  } = usePhotos(search);

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        {loadFigures.length > 0 ? (
          <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">
            Resultados para: {search}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">
            Ops, não conseguimos encontrar nenhum resultado para: {search}
          </h2>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      {isLoading && <Loader />}
    </main>
  );
}
export default Search;
