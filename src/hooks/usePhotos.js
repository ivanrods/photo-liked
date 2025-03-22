import { useState, useEffect, useContext } from "react";

import { DataContext } from "../context/DataProvider";

const usePhotos = (searchTerm = "") => {
  const accessKey = import.meta.env.VITE_PEXELS_API_KEY;
  const [loadMoreFig, setLoadMoreFig] = useState(9);
  const [toggleFigure, setToggleFigure] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setDataLike, loadFigures, setLoadFigures } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
   setLoadFigures([])
  }, []);
  useEffect(() => {
    updateArrayLike();
  }, [loadFigures]);

  useEffect(() => {
    
    setIsLoading(true);
    async function loadData() {
      try {
        const url = searchTerm
          ? `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${loadMoreFig}`
          : `https://api.pexels.com/v1/curated?per_page=${loadMoreFig}`;

        const response = await fetch(url, {
          headers: {
            Authorization: accessKey,
          },
        });
        const data = await response.json();
        setLoadFigures((prevFigures) => {
          const newPhotos = data.photos.filter(
            (photo) =>
              !prevFigures.some((prevPhoto) => prevPhoto.id === photo.id)
          );

          return [
            ...prevFigures,
            ...newPhotos.map((photo) => ({
              ...photo,
              liked: photo.liked || false,
            })),
          ];
        });
      } catch (error) {
        console.error("Erro ao buscar fotos", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [loadMoreFig, searchTerm]);

  //funçoes de renderização
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

  //funçoes do modal
  function showModal() {
    setToggleFigure(true);
  }

  function closeModal() {
    setToggleFigure(false);
  }
  function handleFigureClick(photo) {
    setSelectedPhoto(photo);
    showModal();
  }

  //funçoes de like
  function updateArrayLike() {
    const likedPhotos = loadFigures.filter((photo) => photo.liked === true);
    setDataLike((prevData) => {
      const newPhotos = likedPhotos.filter(
        (photo) => !prevData.some((prevPhoto) => prevPhoto.id === photo.id)
      );
      return [...prevData, ...newPhotos];
    });
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
    
  }

  function toggleLikedFromFavorites(photoId) {
    setDataLike((prevData) => prevData.filter((photo) => photo.id !== photoId));
  
    setLoadFigures((prevFigures) =>
      prevFigures.map((photo) =>
        photo.id === photoId ? { ...photo, liked: false } : photo
      )
    );
  
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prevPhoto) => ({
        ...prevPhoto,
        liked: false,
      }));
    }
  }
  
  return {
    loadFigures,
    isLoading,
    loadMore,
    selectedPhoto,
    toggleFigure,
    handleFigureClick,
    closeModal,
    toggleLiked,
    setLoadFigures,
    setSelectedPhoto,
    toggleLikedFromFavorites
  };
};

export default usePhotos;
