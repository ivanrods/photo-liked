import { useState, useEffect, useContext } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Submit from "../components/Submit";

import { DataContext } from "../context/DataProvider";

function Home() {
  const accessKey = import.meta.env.VITE_PEXELS_API_KEY;
  const [toggleFigure, setToggleFigure] = useState(false);
  const [loadFigures, setLoadFigures] = useState([]);
  const [loadMoreFig, setLoadMoreFig] = useState(6);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { setDataLike } = useContext(DataContext);

  const arrayLike = [];
  
  useEffect(() => {
    updateArrayLike();
  }, [loadFigures]);

  
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
          setLoadFigures(
            data.photos.map((photo) => ({
              ...photo,
              liked: photo.liked || false,
            }))
          );
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
    setSelectedPhoto(photo);
    showModal();
  }
  function closeModal() {
    setToggleFigure(false);
  }
  function loadMore() {
    setLoadMoreFig((prevPage) => prevPage + 6);
  }
  function updateArrayLike() {
    const likedPhotos = loadFigures.filter((photo) => photo.liked === true);
    arrayLike.length = 0;
    arrayLike.push(...likedPhotos);
    setDataLike(arrayLike);
  }

  function toggleLiked(photoId) {
    setLoadFigures((prevFigures) =>
      prevFigures.map((photo) =>
        photo.id === photoId ? { ...photo, liked: !photo.liked } : photo
      )
    );

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prevPhoto) => ({
        ...prevPhoto,
        liked: !prevPhoto.liked,
      }));
    }

    updateArrayLike();
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
          <Submit value="Veja mais" onClick={loadMore} />
        </div>
      )}
      {loadFigures == 0 && <Loader />}
    </main>
  );
}
export default Home;
