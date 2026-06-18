import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { ImageComponent } from "@/components/Render/ImageComponent";
import { BucketName, USER_ADMIN_EMAIL } from "@/constants";
import { useCurrentPerson } from "@/services/person/person.services";
import { useUpdateWorkshop, useWorkshops } from "@/services/workshops/workshops.services";
import type { DefaultOptionType } from "antd/es/select";
import { useMemo, useState } from "react";
import { Select } from "tomascomponents";

type TWorkshopSelectOption = DefaultOptionType & { searchText?: string };

type TBucketName = typeof BucketName;
export const UploadLogoWorkshopUI = () => {
    const [selectedWorkshopId, setSelectedWorkshopId] = useState<number>();
    const [selectedPathImage, setSelectedPathImage] = useState<TBucketName>();
    const { data: person } = useCurrentPerson();
    const userEmail = person?.email;
    const { mutateAsync: updateWorkshop } = useUpdateWorkshop();

    const {
        data: workshops = [],
        isLoading: isLoadingWorkshops,
        isError: isErrorWorkshops,
    } = useWorkshops();

    const selectedWorkshop = useMemo(
        () => workshops.find((workshop) => workshop.id === selectedWorkshopId),
        [workshops, selectedWorkshopId],
    );

    const normalizedWorkshops = useMemo<TWorkshopSelectOption[]>(
        () =>
            workshops.map((workshop) => ({
                label: workshop.name,
                value: workshop.id,
                searchText: workshop.name.toLowerCase(),
            })),
        [workshops],
    );

    const filterOption = (input: string, option?: DefaultOptionType) =>
        String((option as TWorkshopSelectOption | undefined)?.searchText ?? "").includes(
            input.trim().toLowerCase(),
        );

    const handleImageUploaded = async () => {
        if (!selectedWorkshop) return;

        await updateWorkshop({
            id: selectedWorkshop.id,
            name: selectedWorkshop.name,
            logo_url: `${selectedWorkshop.id}.webp`,
        });
    };

    if (userEmail !== USER_ADMIN_EMAIL) {
        return (
            <div>
                <p>No tienes permisos para acceder a esta página</p>
            </div>
        );
    }

    return (
        <CentralContainerUI title="Subir logo de taller">
            <div className="flex flex-col gap-4">

                <div>
                    <span>Seleccionar ruta de la imagen</span>
                </div>
                <Select
                    options={[
                        {
                            label: "Logo del taller",
                            value: BucketName.WORKSHOP_LOGOS,
                        },
                        {
                            label: "Taller imagen",
                            value: BucketName.WORKSHOP_IMAGES,
                        },
                    ]}
                    placeholder="Seleccionar ruta de la imagen"
                    allowClear
                    value={selectedPathImage}
                    onChange={(value) => setSelectedPathImage(value ? value as TBucketName : undefined)}
                />

                <div>
                    <span>Seleccionar taller</span>
                </div>
                <Select
                    options={normalizedWorkshops}
                    placeholder="Toca aquí para elegir un taller"
                    loading={isLoadingWorkshops}
                    disabled={isErrorWorkshops}
                    allowClear
                    value={selectedWorkshopId}
                    onChange={(value) => setSelectedWorkshopId(value ? Number(value) : undefined)}
                    showSearch={{
                        optionFilterProp: "searchText",
                        filterOption,
                    }}
                />

                <div>   <span>Imagen</span></div>

                {selectedWorkshopId && selectedPathImage && (
                    <div className="flex flex-col items-center gap-2">
                        <p className="m-0 text-sm text-desert-sand">
                            {selectedWorkshop?.name ?? "Taller seleccionado"}
                        </p>
                        <ImageComponent
                            key={selectedWorkshopId}
                            bucket={selectedPathImage as unknown as string}
                            path={`${selectedWorkshopId}.webp`}
                            alt="Logo del taller"
                            width={160}
                            height={160}
                            uploadOnError
                            showImageActions
                            uploadOnEdit
                            deleteFromStorage
                            onImageUploaded={handleImageUploaded}
                        />
                    </div>
                )}
            </div>
        </CentralContainerUI>
    );
};
