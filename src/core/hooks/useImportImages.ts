import { useMemo } from "react";

type ImageType = Record<string, string>;

const images = import.meta.glob("@/assets/images/**/*.{png,jpg,jpeg,gif,svg}", {
  eager: true,
  import: "default",
});
export function useImportImages(imagePath: string[]): ImageType {
  return useMemo(() => {
    const importedImages: ImageType = {};

    imagePath.forEach((path) => {
      const fullPath = `/src/assets/images/${path}`;
      const image = images[fullPath];
      if (image) {
        importedImages[path] = fullPath as string;
      } else {
        console.warn(`圖片路徑錯誤或找不到: ${fullPath}`);
      }
    });

    return importedImages;
  }, [imagePath]);
}
