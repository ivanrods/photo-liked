import { useState, useContext } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";

import { DataContext } from "../context/DataProvider";

function Galeria() {
  const { dataLike } = useContext(DataContext);

  const [toggleFigure, setToggleFigure] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function showModal(obj) {
    setToggleFigure(true);
    setSelectedPhoto(obj);
  }
  function closeModal() {
    setToggleFigure(false);
    setSelectedPhoto(null);
  }

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <Title title="Galeria" />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataLike.map((index) => (
            <Figure
              src={index.src.large}
              key={index.id}
              description={index.alt}
              alt={index.alt}
              like={index.liked}
              onClick={() => showModal(index)}
            />
          ))}
        </section>
        {toggleFigure && selectedPhoto && (
          <Modal
            src={selectedPhoto.src.large}
            description={selectedPhoto.alt}
            alt={selectedPhoto.alt}
            like={selectedPhoto.liked}
            onClick={closeModal}
          />
        )}
      </div>
    </main>
  );
}
export default Galeria;
