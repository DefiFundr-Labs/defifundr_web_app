import { useCallback, useState } from "react";
import useModal from "../../hooks/useModal";
import Cropper, { Area } from "react-easy-crop";
import { CancelIcon } from "../../assets/svg/svg";

interface EditImageModalProps {
  imageSrc: string;

  onSave: (croppedBlob: Blob) => void;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas is empty"));
    }, "image/jpeg");
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

const EditImageModal = ({ imageSrc, onSave }: EditImageModalProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(blob);
      hideModal();
    } catch (e) {
      console.error("Crop failed", e);
    }
  };

  const { hideModal } = useModal();

  return (
    <div className="w-full">
      <div className="relative">
        <button className="cursor-pointer absolute">
          <CancelIcon size={32} />
        </button>
        <h3 className="text-xl font-bold text-gray-500 text-center">
          Select language
        </h3>
      </div>

      <div className="relative w-full max-w-72 h-72 mx-auto my-14">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          classes={{
            containerClassName: "size-full",
            cropAreaClassName:
              "rounded-full !size-full !border-3 !border-primary-500",
            mediaClassName: "object-cover",
          }}
        />
      </div>

      <div className="flex justify-end mt-6 space-x-3 h-14">
        <button
          onClick={hideModal}
          className="button !w-full py-3 rounded-full border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="button !w-full py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditImageModal;
