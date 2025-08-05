import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import Title from "../components/Title";
import { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    alert(res.token ? "Login bem-sucedido!" : res.error);
    navigate("/profile");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://cdn.pixabay.com/photo/2022/10/04/11/47/glass-front-7498002_960_720.jpg"
            alt="Imagem de login"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
          <Title title="Bem-vindo de volta" />

          <form onSubmit={handleSubmit}>
            <InputForm
              placeholder="Digite seu email"
              type="email"
              label="Email"
              id="email"
              name="email"
              onChange={handleChange}
            />

            <InputForm
              placeholder="Digite sua senha"
              type="password"
              label="Senha"
              id="password"
              name="password"
              onChange={handleChange}
            />

            <Submit type={"submit"} value="Entrar" />
          </form>

          <div className="text-center">
            <Link
              to="/signUp"
              className="text-gray-600 hover:underline text-sm font-medium"
            >
              Não tem uma conta? Criar agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
