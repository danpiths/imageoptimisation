import Resizer from "react-image-file-resizer";

export default function InputFile(props) {
  const uploadImage = async (img) => {
    props.setImage(img);
  };

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

  const resizeImage = (file) => {
    let quality = 100;

    file.size > 4000000 && (quality = 90);
    file.size > 8000000 && (quality = 85);

    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        quality,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  };

  const handleUpload = async (img) => {
    const width = await checkImageWidth(img.file.originFileObj);
    if (width <= 500) {
      uploadImage(img);
    } else {
      const resizedImage = await resizeImage(img.file.originFileObj);
      const resizedFile = {
        file: {
          originFileObj: resizedImage,
        },
      };
      uploadImage(resizedFile);
    }
  };

  return (
    <input
      className="mt-2"
      value={props.image}
      onChange={(file) => {
        handleUpload(file);
      }}
      type="file"
    />
  );
}
