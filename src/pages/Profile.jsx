import { Link } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import { CgProfile } from "react-icons/cg";
import Form from "../components/Form";

function Profile() {
  return (
    <div className="h-screen">
      <main className="bg-gray-100 w-full flex flex-col items-center justify-center h-full gap-8">
        <CgProfile className="text-8xl" />
        <Form>
          <InputForm placeholder="User" type="text" id="nome" />
          <InputForm placeholder="user@email.com" type="email" id="email" />
          <InputForm placeholder="Senha ataul" type="password" id="Senha " />
          <InputForm placeholder="Nova senha" type="password" id="senha" />
          <Submit value="Salvar" />
        </Form>

        <Link to={-1}> Voltar </Link>
      </main>
    </div>
  );
}
export default Profile;
