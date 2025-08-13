import Figure from "../components/Figure";
import Modal from "../components/Modal";
import { usePhotoStore } from "../stores/usePhotoStore";

function Liked() {
  const dataLike = usePhotoStore((state) => state.dataLike);
  const selectedPhoto = usePhotoStore((state) => state.selectedPhoto);
  const toggleFigure = usePhotoStore((state) => state.toggleFigure);

  // Funções
  const openModal = usePhotoStore((state) => state.openModal);
  const closeModal = usePhotoStore((state) => state.closeModal);
  const removeLikeFromFavorites = usePhotoStore(
    (state) => state.removeLikeFromFavorites
  );

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">
          Imagens curtidas
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataLike.map((photo) => (
            <Figure
              src={photo.src.large}
              key={photo.id}
              description={photo.alt}
              alt={photo.alt}
              like={photo.liked}
              onClick={() => openModal(photo)}
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
