import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { fetchPhotos } from "../api/pexels";
import { useInfiniteScroll } from "./usePhotoLoader";
import { useLikes } from "./useLikes";
import { getLikes } from "../api/likes";

const usePhotos = (searchTerm = "") => {
  const { loadFigures, setLoadFigures, loadMoreFig, setLoadMoreFig, dataLike } =
    useContext(DataContext);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [toggleFigure, setToggleFigure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleToggleLike, removeLikeFromFavorites } = useLikes();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const photos = await fetchPhotos(searchTerm, loadMoreFig);
        let likedPhotos = [];
        const token = localStorage.getItem("token");

        if (token) {
          likedPhotos = await getLikes(); // só chama se tiver token
        }

        const updatedPhotos = photos.map((photo) => {
          const isLiked = likedPhotos.some((liked) => liked.id === photo.id);
          return { ...photo, liked: isLiked };
        });

        setLoadFigures((prev) => [...prev, ...updatedPhotos]);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, loadMoreFig, dataLike]);
  // No final do usePhotos
  useEffect(() => {
    if (selectedPhoto) {
      const updated = loadFigures.find((p) => p.id === selectedPhoto.id);
      if (updated && updated.liked !== selectedPhoto.liked) {
        setSelectedPhoto(updated);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFigures]);

  useInfiniteScroll(() => setLoadMoreFig((prev) => prev + 6));

  const handleFigureClick = (photo) => {
    setSelectedPhoto(photo);
    setToggleFigure(true);
  };

  const closeModal = () => {
    setToggleFigure(false);
  };

  return {
    loadFigures,
    isLoading,
    selectedPhoto,
    toggleFigure,
    handleFigureClick,
    closeModal,
    handleToggleLike,
    removeLikeFromFavorites,
    setSelectedPhoto,
    setLoadFigures,
  };
};

export default usePhotos;
