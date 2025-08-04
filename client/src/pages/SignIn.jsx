import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import Title from "../components/Title";
import Form from "../components/Form";
import { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    alert(res.token ? "Login bem-sucedido!" : res.error);
  };
  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-full flex flex-col items-center justify-center h-full gap-8"
      >
        <Title title=" Bem vindo de volta" />
        <Form>
          <InputForm
            placeholder="Digite seu email"
            type="email"
            label="Email"
            id="email"
            onChange={handleChange}
          />

          <InputForm
            placeholder="Digite sua senha"
            type="password"
            label="Senha"
            id="senha"
            onChange={handleChange}
          />
          <Link to="/profile">
            <Submit value="Entrar" />
          </Link>
        </Form>

        <Link to="/signUp">Não tem uma conta?</Link>
      </form>
    </div>
  );
}
export default SignIn;
