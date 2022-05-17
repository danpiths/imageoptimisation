import AvatarEditor from "react-avatar-editor";

export default function EditorModal(props) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black/50 flex flex-col justify-center items-center gap-2">
      <AvatarEditor
        ref={props.editorRef}
        image={props.image}
        width={500}
        height={500}
        border={50}
        color={[100, 100, 100, 0.3]} // RGBA
        scale={1}
        rotate={0}
      />
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={props.handleCrop}
          className="bg-gray-700 px-4 py-2 text-gray-100 font-bold uppercase text-lg rounded-md hover:bg-gray-800 active:bg-gray-900 transition duration-75 ease-out"
        >
          Crop
        </button>
        <button
          onClick={() => props.setIsModalOpen(false)}
          className="bg-red-500 px-4 py-2 text-gray-100 font-bold uppercase text-lg rounded-md hover:bg-red-600 active:bg-red-700 transition duration-75 ease-out"
        >
          Close
        </button>
      </div>
    </div>
  );
}
