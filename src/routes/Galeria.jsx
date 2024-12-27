import { useState } from "react";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";
function Galeria() {
  const [toggleFigure, setToggleFigure] = useState(false);

  function showModal() {
    setToggleFigure(true);
  }
  function closeModal() {
    setToggleFigure(false);
  }
  const figures = [0, 1, 2];
  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <Title title="Galeria" />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {figures.map((index) => (
            <Figure
              src="https://cdn.pixabay.com/photo/2024/03/03/20/44/cat-8611246_1280.jpg"
              key={index}
              onClick={showModal}
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
