import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [image, setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen gap-5 text-gray-800">
      <div>
        <Form
          image={image}
          setImage={setImage}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {image && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 mt-2 ml-auto block px-4 py-2 text-gray-100 font-bold uppercase text-lg rounded-md hover:bg-gray-800 active:bg-gray-900 transition duration-75 ease-out"
          >
            Crop Image
          </button>
        )}
      </div>
      {image && (
        <div className="">
          <h3 className="text-center text-2xl font-bold mb-2">Final Image</h3>
          <img src={image} alt="FinalImage" />
        </div>
      )}
    </div>
  );
}

export default App;
