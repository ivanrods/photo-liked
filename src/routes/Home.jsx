import { useState, useEffect } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Submit from "../components/Submit";

function Home() {
  const accessKey = import.meta.env.VITE_PEXELS_API_KEY;
  const [toggleFigure, setToggleFigure] = useState(false);
  const [loadFigures, setLoadFigures] = useState([]);
  const [loadMoreFig, setLoadMoreFig] = useState(6);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function loadData() {
        try {
          const response = await fetch(
            `https://api.pexels.com/v1/curated?per_page=${loadMoreFig}`,
            {
              headers: {
                Authorization: accessKey,
              },
            }
          );
          const data = await response.json();
          setLoadFigures(data.photos);
          console.log(data);
        } catch (error) {
          console.error("Erro ao buscar fotos", error);
        }
      }
      loadData();
    }, 500);
    return () => clearTimeout(timer);
  }, [loadMoreFig]);

  function showModal() {
    setToggleFigure(true);
  }

  function handleFigureClick(photo) {
    setSelectedPhoto({
      src: photo.src.original,
      description: photo.alt,
      alt: photo.alt,
    });
    showModal();
  }
  function closeModal() {
    setToggleFigure(false);
  }
  function loadMore() {
    setLoadMoreFig((prevPage) => prevPage + 3);
  }

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
                onClick={() => handleFigureClick(photo)}
              />
            ))}
          </section>
          {toggleFigure && (
            <Modal
              src={selectedPhoto.src}
              description={selectedPhoto.description}
              alt={selectedPhoto.alt}
              onClick={closeModal}
            />
          )}
          <Submit value="Veja mais" onClick={loadMore} />
        </div>
      )}
      {loadFigures == 0 && <Loader />}
    </main>
  );
}
export default Home;
