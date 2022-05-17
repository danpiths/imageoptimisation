import { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../hooks/canvasPreview";
import { useDebounceEffect } from "../hooks/useDebounceEffect";

export default function FileUpload(props) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const checkImageWidth = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          resolve(image.width);
          return image.width;
        };
        reader.onerror = (err) => reject(err);
      };
    });
  };

  const handleFileChange = async (e) => {
    const width = await checkImageWidth(e.target.files[0]);
    console.log(width);
    if (width <= 500) {
      props.setImage(e);
      setSrc(null);
    } else if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: 500,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1 / 1));
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          props.setImage
        );
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div>
      <input
        className="mt-2"
        type="file"
        name="Image"
        id="Image"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div>
        {src && (
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1 / 1}
          >
            <img src={src} onLoad={onImageLoad} alt="Crop Me" ref={imgRef} />
          </ReactCrop>
        )}
        {completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </div>
  );
}
