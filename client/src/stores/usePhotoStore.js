// src/stores/usePhotoStore.js
import { create } from "zustand";
import { getLikes, saveLikes } from "../api/likes";
import { toggleLike, removeLike } from "../services/likeService";
import { fetchPhotos } from "../api/pexels";

export const usePhotoStore = create((set, get) => ({
  // ESTADOS

  homeFigures: [],
  searchFigures: [],
  search: "",
  isLoading: false,
  selectedPhoto: null,
  toggleFigure: false,
  dataLike: [],
  loadMore: 6,
  loadMoreSearch: 3,

  // AÇÕES DE MODAL

  openModal: (photo) => set({ selectedPhoto: photo, toggleFigure: true }),
  closeModal: () => set({ toggleFigure: false }),

  // AÇÕES CARREGAR MAIS FOTOS

  setLoadMore: (updater) =>
    set((state) => ({
      loadMore:
        typeof updater === "function" ? updater(state.loadMore) : updater,
    })),

  setLoadMoreSearch: (updater) =>
    set((state) => ({
      loadMoreSearch:
        typeof updater === "function" ? updater(state.loadMoreSearch) : updater,
    })),

  // AÇÕES DE PESQUISA

  setSearchTerm: (value) => {
    set({ search: value });
    get().fetchSearchPhotos(); // dispara a busca automaticamente
  },

  // LIKES

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

  persistLikes: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Só persiste se já tiver carregado os dados iniciais
    if (get().dataLike.length === 0) return;

    try {
      await saveLikes(get().dataLike);
    } catch (err) {
      console.error("Erro ao salvar likes:", err);
    }
  },

  handleToggleLike: (photoId, type = "home") => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Você precisa estar logado.");

    const figuresKey = type === "home" ? "homeFigures" : "searchFigures";
    const figures = get()[figuresKey];
    const selected = get().selectedPhoto;

    const photoToUpdate = figures.find((p) => p.id === photoId);
    if (!photoToUpdate) return;

    const updatedPhoto = { ...photoToUpdate, liked: !photoToUpdate.liked };

    set((state) => ({
      dataLike: toggleLike(updatedPhoto, state.dataLike),
      [figuresKey]: state[figuresKey].map((p) =>
        p.id === photoId ? updatedPhoto : p
      ),
      selectedPhoto:
        selected?.id === photoId ? updatedPhoto : state.selectedPhoto,
    }));

    // Persiste apenas após atualizar localmente
    get().persistLikes();
  },

  removeLikeFromFavorites: (photoId, type = "home") => {
    const figuresKey = type === "home" ? "homeFigures" : "searchFigures";

    const selected = get().selectedPhoto;

    set((state) => ({
      dataLike: removeLike(photoId, state.dataLike), // agora remove por id
      [figuresKey]: state[figuresKey].map((p) =>
        p.id === photoId ? { ...p, liked: false } : p
      ),
      selectedPhoto:
        selected?.id === photoId
          ? { ...state.selectedPhoto, liked: false }
          : state.selectedPhoto,
    }));

    get().persistLikes();
  },

  // FETCH FOTOS

  fetchHomePhotos: async () => {
    set({ isLoading: true });
    const { loadMore, dataLike } = get();

    try {
      const photos = await fetchPhotos("", loadMore); // curated photos
      // adiciona liked se já estiver em favoritos
      const updated = photos.map((photo) => ({
        ...photo,
        liked: dataLike.some((liked) => liked.id === photo.id),
      }));
      set({ homeFigures: updated });
    } catch (err) {
      console.error("Erro ao buscar fotos da Home:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSearchPhotos: async () => {
    const { loadMoreSearch, search, dataLike } = get();
    set({ isLoading: true });
    if (!search) return;

    try {
      const photos = await fetchPhotos(search, loadMoreSearch);
      const updated = photos.map((photo) => ({
        ...photo,
        liked: dataLike.some((liked) => liked.id === photo.id),
      }));
      set({ searchFigures: updated });
    } catch (err) {
      console.error("Erro ao buscar fotos de pesquisa:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
