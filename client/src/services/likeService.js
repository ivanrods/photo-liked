export function addLike(photo, currentLikes) {
  const alreadyExists = currentLikes.some((p) => p.id === photo.id);
  if (!alreadyExists) {
    return [...currentLikes, { ...photo, liked: true }];
  }
  return currentLikes;
}

export function removeLike(photoId, currentLikes) {
  return currentLikes.filter((p) => p.id !== photoId);
}

export function toggleLike(photo, currentLikes) {
  const exists = currentLikes.some((p) => p.id === photo.id);
  return exists
    ? removeLike(photo.id, currentLikes)
    : addLike(photo, currentLikes);
}
