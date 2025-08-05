import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import { CgProfile } from "react-icons/cg";
import { getUser, deleteUser } from "../api/auth";
import { useEffect, useState } from "react";
function Profile() {
  const [form, setForm] = useState({ name: "", email: "" });
  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getUser();
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    };

    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Salvo! (funcionalidade de update ainda não implementada)");
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signIn"); // ou o caminho da sua página de login
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirm) return;

    const res = await deleteUser();
    alert(res.message || "Conta deletada");
    handleLogout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <CgProfile className="text-8xl text-black" />
          <h2 className="text-2xl font-bold text-gray-700">Meu Perfil</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <InputForm
            label="Nome"
            placeholder="Seu nome"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputForm
            label="Email"
            placeholder="Seu email"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <Submit value="Salvar" type={"submit"} />
            <Submit
              value=" Deletar Conta"
              type={"button"}
              onClick={handleDeleteAccount}
            />
            <Submit value=" Sair" type={"button"} onClick={handleLogout} />
          </div>
        </form>

        <div className="text-center mt-2">
          <Link
            to={-1}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Profile;
