import { useState, useContext } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";

import { DataContext } from "../context/DataProvider";

function Galeria() {
  const { dataLike } = useContext(DataContext);

  const [toggleFigure, setToggleFigure] = useState(false);

  function showModal() {
    setToggleFigure(true);
  }
  function closeModal() {
    setToggleFigure(false);
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
              onClick={showModal}
              description={index.alt}
              alt={index.alt}
              like={index.liked}
            />
          ))}
        </section>
        {toggleFigure && (
          <Modal
            src="https://cdn.pixabay.com/photo/2024/03/03/20/44/cat-8611246_1280.jpg"
            onClick={closeModal}
          />
        )}
      </div>
    </main>
  );
}
export default Galeria;
