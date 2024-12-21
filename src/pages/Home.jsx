import { useState } from "react";
import Button from "../components/Button";
import Figure from "../components/Figure";
import Modal from "../components/Modal";
import Title from "../components/Title";

function Home() {
  const [toggleFigure, setToggleFigure] = useState(false);
  const [loadFigures, setLoadFigures] = useState([0, 1, 2, 3, 4, 5]);

  function showModal() {
    setToggleFigure(true);
  }
  function closeModal() {
    setToggleFigure(false);
  }
  function loadMore() {
    setLoadFigures((prevLoad) => [...prevLoad, (prevLoad.length += 3)]);
  }

  return (
    <main className=" flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <Title title="Home" />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadFigures.map((index) => (
            <Figure key={index} onClick={showModal} />
          ))}
        </section>
        {toggleFigure && <Modal onClick={closeModal} />}

        <Button onClick={loadMore} />
      </div>
    </main>
  );
}
export default Home;
