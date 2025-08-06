import { useContext } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";

import { DataContext } from "../context/DataProvider";
import usePhotos from "../hooks/usePhotos";
import { useLikes } from "../hooks/useLikes";

function Liked() {
  const { selectedPhoto, toggleFigure, handleFigureClick, closeModal } =
    usePhotos();

  const { dataLike } = useContext(DataContext);
  const { removeLikeFromFavorites } = useLikes();

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <Title title="Liked images" />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataLike.map((photo) => (
            <Figure
              src={photo.src.large}
              key={photo.id}
              description={photo.alt}
              alt={photo.alt}
              like={photo.liked}
              onClick={() => handleFigureClick(photo)}
              onLike={() => removeLikeFromFavorites(photo.id)}
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
            onLike={() => removeLikeFromFavorites(selectedPhoto.id)}
          />
        )}
      </div>
    </main>
  );
}
export default Liked;
