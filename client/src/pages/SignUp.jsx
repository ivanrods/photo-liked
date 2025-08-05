import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import Title from "../components/Title";
import { useState } from "react";
function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    alert(res.message || res.error);
    navigate("/signIn");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://cdn.pixabay.com/photo/2022/10/04/11/47/glass-front-7498002_960_720.jpg"
            alt="Imagem de registro"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
          <Title title="Crie sua conta" />

          <form onSubmit={handleSubmit}>
            <InputForm
              placeholder="Digite seu nome"
              type="text"
              label="Nome"
              id="name"
              name="name"
              onChange={handleChange}
            />
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

            <Submit type={"submit"} value="Criar conta" />
          </form>

          <div className="text-center">
            <Link
              to="/signIn"
              className="text-gray-600 hover:underline text-sm font-medium"
            >
              Já tem uma conta? Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
