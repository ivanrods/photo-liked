import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { toggleLike, removeLike } from "../services/likeService";

export function useLikes() {
  const {
    setDataLike,
    loadFigures,
    setLoadFigures,
    selectedPhoto,
    setSelectedPhoto,
  } = useContext(DataContext);

  const token = localStorage.getItem("token");

  const handleToggleLike = (photoId) => {
    if (!token) {
      alert("Você precisa estar logado para curtir imagens.");
      return;
    }

    // Encontrar a foto
    const photoToUpdate = loadFigures.find((photo) => photo.id === photoId);
    if (!photoToUpdate) return;

    const updatedPhoto = { ...photoToUpdate, liked: !photoToUpdate.liked };

    // Atualizar likes
    setDataLike((prev) => toggleLike(updatedPhoto, prev));

    // Atualizar lista de fotos
    const updatedFigures = loadFigures.map((photo) =>
      photo.id === photoId ? updatedPhoto : photo
    );
    setLoadFigures(updatedFigures);

    // Atualizar foto selecionada se necessário
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(updatedPhoto);
    }
  };

  const removeLikeFromFavorites = (photoId) => {
    setDataLike((prev) => removeLike(photoId, prev));
    setLoadFigures((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, liked: false } : photo
      )
    );

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prev) => ({ ...prev, liked: false }));
    }
  };

  return {
    handleToggleLike,
    removeLikeFromFavorites,
  };
}
