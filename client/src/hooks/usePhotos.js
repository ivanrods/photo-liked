import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider";

const usePhotos = (searchTerm = "") => {
  const accessKey = import.meta.env.VITE_PEXELS_API_KEY;

  const [toggleFigure, setToggleFigure] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setDataLike,
    dataLike,
    loadFigures,
    setLoadFigures,
    loadMoreFig,
    setLoadMoreFig,
  } = useContext(DataContext);

  const token = localStorage.getItem("token");

  // Carrega as fotos da API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const url = searchTerm
          ? `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${loadMoreFig}`
          : `https://api.pexels.com/v1/curated?per_page=${loadMoreFig}`;

        const response = await fetch(url, {
          headers: { Authorization: accessKey },
        });

        const data = await response.json();
        const newPhotos = data.photos.filter(
          (photo) => !loadFigures.some((p) => p.id === photo.id)
        );

        const updatedPhotos = newPhotos.map((photo) => ({
          ...photo,
          liked: dataLike.some((liked) => liked.id === photo.id),
        }));

        setLoadFigures((prev) => [...prev, ...updatedPhotos]);
      } catch (error) {
        console.error("Erro ao buscar fotos", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadMoreFig, searchTerm]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 10
      ) {
        setLoadMoreFig((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal
  function handleFigureClick(photo) {
    setSelectedPhoto(photo);
    setToggleFigure(true);
  }

  function closeModal() {
    setToggleFigure(false);
  }

  // Curtir / Descurtir
  function toggleLiked(photoId) {
    if (!token) {
      alert("Você precisa estar logado para curtir imagens.");
      return;
    }

    setLoadFigures((prevFigures) =>
      prevFigures.map((photo) => {
        if (photo.id === photoId) {
          const liked = !photo.liked;
          const updatedPhoto = { ...photo, liked };

          setDataLike((prevData) => {
            if (liked) {
              return [...prevData, updatedPhoto];
            }
            return prevData.filter((p) => p.id !== photoId);
          });

          if (selectedPhoto?.id === photoId) {
            setSelectedPhoto(updatedPhoto);
          }

          return updatedPhoto;
        }
        return photo;
      })
    );
  }

  function toggleLikedFromFavorites(photoId) {
    setDataLike((prevData) => prevData.filter((photo) => photo.id !== photoId));
    setLoadFigures((prevFigures) =>
      prevFigures.map((photo) =>
        photo.id === photoId ? { ...photo, liked: false } : photo
      )
    );

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prev) => ({ ...prev, liked: false }));
    }
  }

  return {
    loadFigures,
    isLoading,
    loadMore: () => setLoadMoreFig((prev) => prev + 6),
    selectedPhoto,
    toggleFigure,
    handleFigureClick,
    closeModal,
    toggleLiked,
    toggleLikedFromFavorites,
    setSelectedPhoto,
    setLoadFigures,
  };
};

export default usePhotos;
