import { useSearchParams } from "react-router-dom";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useEffect } from "react";

function Search() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // Estados da store
  const searchFigures = usePhotoStore((state) => state.searchFigures);
  const isLoading = usePhotoStore((state) => state.isLoading);
  const selectedPhoto = usePhotoStore((state) => state.selectedPhoto);
  const toggleFigure = usePhotoStore((state) => state.toggleFigure);

  // Funções da store
  const setSearchTerm = usePhotoStore((state) => state.setSearchTerm);
  const fetchSearchPhotos = usePhotoStore((state) => state.fetchSearchPhotos);
  const openModal = usePhotoStore((state) => state.openModal);
  const closeModal = usePhotoStore((state) => state.closeModal);
  const handleToggleLike = usePhotoStore((state) => state.handleToggleLike);

  // Atualiza o termo de pesquisa e busca fotos
  useEffect(() => {
    setSearchTerm(searchTerm);
    fetchSearchPhotos();
  }, [searchTerm, setSearchTerm, fetchSearchPhotos]);

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        {searchFigures.length > 0 ? (
          <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">
            Resultados para: {searchTerm}
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-gray-700 mt-10 mb-6">
            Ops, não conseguimos encontrar nenhum resultado para: {searchTerm}
          </h2>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchFigures
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
                onClick={() => openModal(photo)}
                onLike={() => handleToggleLike(photo.id)}
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
            onLike={() => handleToggleLike(selectedPhoto.id)}
          />
        )}
      </div>
      {isLoading && <Loader />}
    </main>
  );
}
export default Search;
