import { ImageComponent } from "@/components/Render/ImageComponent";
import { BucketName } from "@/constants";
import { Flex } from "antd";


export const TestImagesUIView = () => {
  return (
    <Flex gap={16} wrap style={{ padding: 16 }}>
      <ImageComponent
        bucket={BucketName.VEHICLE_IMAGES}
        path="10.webp"
        alt="Imagen de ejemplo"
        width={200}
        height={200}
      />
      <ImageComponent
        bucket={BucketName.WORKSHOP_IMAGES}
        path="1.jpg"
        alt="Imagen de ejemplo"
        width={200}
        height={200}
      />
    </Flex>
  );
};