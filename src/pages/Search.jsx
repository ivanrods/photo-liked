import { useState } from "react";
import Button from "../components/Button";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";
function Search() {
  const [toggleFigure, setToggleFigure] = useState(false);

  function showModal() {
    setToggleFigure(true);
  }
  function closeModal() {
    setToggleFigure(false);
  }
  const figures = [0, 1];
  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <Title title="Search" />

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
export default Search;
