import Button from "./Button";
import Figure from "./Figure";

function Main() {
  return (
    <main className="flex flex-col bg-gray-100 px-4 py-10 min-h-screen">
      <div className="max-w-screen-xl justify-center mx-auto ">
        <h2 className="text-2xl font-bold text-gray-700 pb-8 mt-16">Galeria</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Figure />
          <Figure />
          <Figure />
          <Figure />
          <Figure />
          <Figure />
        </section>
        <Button />
      </div>
    </main>
  );
}
export default Main;
