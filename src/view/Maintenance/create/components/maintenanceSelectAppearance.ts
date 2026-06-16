import type { SelectProps } from "antd";

export const maintenanceSelectAppearance: Pick<SelectProps, "classNames" | "styles"> = {
  classNames: {
    popup: {
      root: "maintenance-vehicle-select-popup",
    },
    placeholder: "maintenance-vehicle-select-placeholder",
  },
  styles: {
    placeholder: {
      color: "var(--color-sand-white)",
      opacity: 1,
    },
  },
};
