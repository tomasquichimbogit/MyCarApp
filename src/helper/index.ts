import type { FieldErrors, FieldValues } from "react-hook-form";


export const normalizeNumber = (value: string | number | null | undefined): number | undefined => {
    if (value === null || value === undefined || value === "null") {
        return undefined;
    }
    return Number(value);
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    return Object.prototype.toString.call(value) === "[object Object]";
};

const isInvalidObjectValue = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === "string") {
        return value === "";
    }

    return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObjectData = (data: any): any => {
    if (!isPlainObject(data)) {
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: any = {};

    Object.entries(data).forEach(([key, value]) => {
        if (isInvalidObjectValue(value)) {
            return;
        }

        cleanData[key] = isPlainObject(value) ? cleanObjectData(value) : value;
    });

    return cleanData;
};

export const normalizeErrorForm = (errors: FieldErrors<FieldValues>): string[] => {
    return Object.values(errors)
        .map((error) => (typeof error?.message === "string" ? error.message : ""))
        .filter(Boolean);
}