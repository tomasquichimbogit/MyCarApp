export const normalizeNumber = (value: string | number | null | undefined): number | undefined => {
    if (value === null || value === undefined || value === "null") {
        return undefined;
    }
    return Number(value);
}