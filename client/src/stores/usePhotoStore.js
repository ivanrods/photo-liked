// src/stores/usePhotoStore.js
import { create } from "zustand";
import { getLikes, saveLikes } from "../api/likes";
import { toggleLike, removeLike } from "../services/likeService";
import { fetchPhotos } from "../api/pexels";

export const usePhotoStore = create((set, get) => ({
  // Estado
  search: "",
  loadMoreFig: 12,
  loadFigures: [],
  dataLike: [],
  selectedPhoto: null,
  toggleFigure: false,
  isLoading: false,

  // Ações
  setSearch: (value) => set({ search: value }),
  setLoadMoreFig: (value) => set({ loadMoreFig: value }),
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  closeModal: () => set({ toggleFigure: false }),
  openModal: (photo) => set({ selectedPhoto: photo, toggleFigure: true }),

  // Carregar likes do backend
  fetchLikes: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const likes = await getLikes();
      set({ dataLike: likes });
    } catch (err) {
      console.error("Erro ao buscar likes:", err);
    }
  },

  // Salvar likes no backend
  persistLikes: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await saveLikes(get().dataLike);
    } catch (err) {
      console.error("Erro ao salvar likes:", err);
    }
  },

  // Buscar fotos da API
  fetchAndSetPhotos: async () => {
    const { search, loadMoreFig, dataLike } = get();
    if (!search) return;

    set({ isLoading: true });
    try {
      const photos = await fetchPhotos(search, loadMoreFig);
      const updated = photos.map((photo) => ({
        ...photo,
        liked: dataLike.some((liked) => liked.id === photo.id),
      }));
      set((state) => ({
        loadFigures: [...state.loadFigures, ...updated],
      }));
    } catch (err) {
      console.error("Erro ao buscar fotos:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Like / Unlike
  handleToggleLike: (photoId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para curtir imagens.");
      return;
    }

    const { loadFigures, selectedPhoto } = get();
    const photoToUpdate = loadFigures.find((p) => p.id === photoId);
    if (!photoToUpdate) return;

    const updatedPhoto = { ...photoToUpdate, liked: !photoToUpdate.liked };

    set((state) => ({
      dataLike: toggleLike(updatedPhoto, state.dataLike),
      loadFigures: state.loadFigures.map((p) =>
        p.id === photoId ? updatedPhoto : p
      ),
      selectedPhoto:
        selectedPhoto?.id === photoId ? updatedPhoto : state.selectedPhoto,
    }));

    get().persistLikes();
  },

  removeLikeFromFavorites: (photoId) => {
    set((state) => ({
      dataLike: removeLike(photoId, state.dataLike),
      loadFigures: state.loadFigures.map((p) =>
        p.id === photoId ? { ...p, liked: false } : p
      ),
      selectedPhoto:
        state.selectedPhoto?.id === photoId
          ? { ...state.selectedPhoto, liked: false }
          : state.selectedPhoto,
    }));

    get().persistLikes();
  },
}));
