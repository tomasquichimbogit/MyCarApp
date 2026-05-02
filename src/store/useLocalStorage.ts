import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getFavoriteVehicles,
  KEYS_LOCAL_STORAGE,
  setFavoriteVehicles,
} from "../helper/localStore";

interface LocalStorageContextValue {
  favoriteVehiclesId?: string;
  setFavoriteVehiclesId: (favoriteVehiclesId?: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextValue | undefined>(
  undefined,
);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteVehiclesId, setFavoriteVehiclesIdState] = useState<
    string | undefined
  >(() => getFavoriteVehicles());

  const setFavoriteVehiclesId = useCallback((favoriteVehicleId?: string) => {
    if (favoriteVehicleId === undefined) {
      localStorage.removeItem(KEYS_LOCAL_STORAGE.FAVORITE_VEHICLES_ID);
    } else {
      setFavoriteVehicles(favoriteVehicleId);
    }

    setFavoriteVehiclesIdState(favoriteVehicleId);
  }, []);

  const value = useMemo(
    () => ({
      favoriteVehiclesId,
      setFavoriteVehiclesId,
    }),
    [favoriteVehiclesId, setFavoriteVehiclesId],
  );

  return createElement(
    LocalStorageContext.Provider,
    { value },
    children,
  );
};

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error("useLocalStorage must be used within LocalStorageProvider");
  }

  return context;
};