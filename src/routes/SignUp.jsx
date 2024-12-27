import { Link } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import Title from "../components/Title";
import Form from "../components/Form";
function SignUp() {
  return (
    <div className="h-screen">
      <main className="bg-gray-100 w-full flex flex-col items-center justify-center h-full gap-8">
        <Title title="Crie sua conta" />
        <Form>
          <InputForm placeholder="Nome" type="text" label="Nome" id="nome" />
          <InputForm
            placeholder="@email.com"
            type="email"
            label="Email"
            id="email"
          />
          <InputForm
            placeholder="senha"
            type="password"
            label="Senha"
            id="senha"
          />

          <Link to="/profile">
            <Submit value="Criar conta" />
          </Link>
        </Form>

        <Link to="/signIn">Já tem uma conta?</Link>
      </main>
    </div>
  );
}
export default SignUp;
