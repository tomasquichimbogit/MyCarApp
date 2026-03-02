import { useNavigate } from "react-router-dom";

export interface IUseAppNavigation {
    navigateTo: (path: string, replace?: boolean) => void;
}

export const useAppNavigation = (): IUseAppNavigation => {
    const navigate = useNavigate();

    const navigateTo = (path: string, replace = false) => {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        navigate(normalizedPath, { replace });
    };

    return {
        navigateTo,
    };
};
