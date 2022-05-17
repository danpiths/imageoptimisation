import { useEffect, useRef, useState } from "react";
import EditorModal from "./EditorModal";

export default function UploadFile({ setImage, isModalOpen, setIsModalOpen }) {
  const [uploadImage, setUploadImage] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isOver500, setIsOver500] = useState(false);
  const editorRef = useRef(null);

  const handleCrop = (e) => {
    const canvasScaled = editorRef.current.getImageScaledToCanvas();
    setImage(canvasScaled.toDataURL("image/jpeg"));
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUploadImage(reader.result.toString() || "");
        setImage("");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const i = new Image();
    i.onload = function () {
      setWidth(i.width);
      setHeight(i.height);
    };
    i.src = uploadImage;
  }, [uploadImage]);

  useEffect(() => {
    if (width === 500 && height === 500) {
      setIsOver500(true);
    } else if (width >= 500 && height >= 500) {
      setIsOver500(true);
      setIsModalOpen(true);
    } else {
      setIsOver500(false);
    }
  }, [width, height, setIsModalOpen]);

  return (
    <>
      <input
        className="mt-2"
        accept="image/*"
        type="file"
        name="Image"
        id="Image"
        onChange={handleFileChange}
      />
      {uploadImage && isOver500 && isModalOpen && (
        <EditorModal
          editorRef={editorRef}
          image={uploadImage}
          handleCrop={handleCrop}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
