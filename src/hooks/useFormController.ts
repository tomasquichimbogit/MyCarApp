import { normalizeErrorForm } from "@/helper";
import React from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";
import { useNotify } from "tomascomponents";


export interface IUseFormController {
    errorForm: (errors: FieldErrors<FieldValues>) => void;
}
export const useFormController = (): IUseFormController => {
    const { notify } = useNotify();
    
    const errorForm = (errors: FieldErrors<FieldValues>) => {
        const messagesNormalized = normalizeErrorForm(errors);
        const message = React.createElement(
            "span",
            null,
            ...messagesNormalized.flatMap((msg, i) =>
                i < messagesNormalized.length - 1
                    ? [msg, React.createElement("br", { key: i })]
                    : [msg]
            )
        );
        notify("error", {
            title: "Error al validar el formulario",
            description: message,
        });
    }

    return {
        errorForm,
    }
}