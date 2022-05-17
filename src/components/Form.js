import { useState } from "react";
import FileUpload from "./FileUpload";

export default function Form() {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState("");

  return (
    <form
      action="#"
      className="flex flex-col bg-gray-100 border-2 border-gray-800 rounded-md p-5"
    >
      <h1 className="text-3xl text-center">Upload Image</h1>
      <input
        className="mt-4 w-full py-2 px-3 border-[1.5px] caret-gray-800 border-gray-800 rounded-md focus:ring-gray-800 focus:border-gray-800 selection:bg-gray-800 selection:text-white"
        type="text"
        name="ImageName"
        id="ImageName"
        placeholder="Image Name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <FileUpload setImage={setImage} />
    </form>
  );
}
