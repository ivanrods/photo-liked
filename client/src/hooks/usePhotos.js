import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { fetchPhotos } from "../api/pexels";
import { useInfiniteScroll } from "./usePhotoLoader";
import { useLikes } from "./useLikes";

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

        const newPhotos = photos.filter(
          (photo) => !loadFigures.some((p) => p.id === photo.id)
        );

        const updatedPhotos = newPhotos.map((photo) => ({
          ...photo,
          liked: dataLike.some((liked) => liked.id === photo.id),
        }));

        setLoadFigures((prev) => [...prev, ...updatedPhotos]);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [searchTerm, loadMoreFig]);

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
