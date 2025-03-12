import { useState, useEffect, useContext } from "react";

import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";

import { DataContext } from "../context/DataProvider";
import Loader from "../components/Loader";

function Search() {
  const accessKey = import.meta.env.VITE_PEXELS_API_KEY;
  const [toggleFigure, setToggleFigure] = useState(false);
  const [figures, setFigures] = useState([]);

  const { loadMoreFig, setLoadMoreFig } = useContext(DataContext);

  const { search } = useContext(DataContext);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { setDataLike } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateArrayLike();
  }, [figures]);

  useEffect(() => {
    setIsLoading(true);
    async function loadData() {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            search
          )}&per_page=${loadMoreFig}`,
          {
            headers: {
              Authorization: accessKey,
            },
          }
        );

        const data = await response.json();
        const filteredPhotos = data.photos

          .filter((photo) =>
            photo.alt.toLowerCase().includes(search.toLowerCase())
          )
          .map((photo) => ({
            ...photo,
            liked: false,
          }));

        setFigures(filteredPhotos);
      } catch (error) {
        console.error("Erro ao buscar fotos", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [search, loadMoreFig]);

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

  function updateArrayLike() {
    const likedPhotos = figures.filter((photo) => photo.liked === true);
    setDataLike((prevData) => {
      const newPhotos = likedPhotos.filter(
        (photo) => !prevData.some((prevPhoto) => prevPhoto.id === photo.id)
      );
      return [...prevData, ...newPhotos];
    });
  }

  function toggleLiked(photoId) {
    setFigures((prevFigures) =>
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

  function loadMore() {
    setLoadMoreFig((prevPage) => prevPage + 6);
  }
  function handleScroll() {
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 10
    ) {
      loadMore();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        {figures.length > 0 ? (
          <Title title={`Results for: "${search}"`} />
        ) : (
          <Title
            title={`Oops, We couldn't find any results for : "${search}" `}
          />
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {figures.map((photo) => (
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
