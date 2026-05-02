
export const KEYS_LOCAL_STORAGE = {
    FAVORITE_VEHICLES_ID: "favoriteVehicles",
}

export const getFavoriteVehicles = (): string | undefined => {
    const favoriteVehiclesId = localStorage.getItem(KEYS_LOCAL_STORAGE.FAVORITE_VEHICLES_ID);
    return favoriteVehiclesId ?? undefined;
}

export const setFavoriteVehicles = (favoriteVehiclesId: string) => {
    localStorage.setItem(KEYS_LOCAL_STORAGE.FAVORITE_VEHICLES_ID, favoriteVehiclesId);
}