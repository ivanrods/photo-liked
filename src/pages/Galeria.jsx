import { useState } from "react";
import Button from "../components/Button";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
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
        <h2 className="text-2xl font-bold text-gray-700 pb-8 mt-16">Galeria</h2>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {figures.map((index) => (
            <Figure key={index} onClick={showModal} />
          ))}
        </section>
        {toggleFigure && <Modal onClick={closeModal} />}

        <Button />
      </div>
    </main>
  );
}
export default Galeria;
