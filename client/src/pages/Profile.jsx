import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import { CgProfile } from "react-icons/cg";
import Form from "../components/Form";
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
    handleLogout(); // faz logout automático após deletar
  };

  return (
    <div className="h-screen">
      <main className="bg-gray-100 w-full flex flex-col items-center justify-center h-full gap-8">
        <CgProfile className="text-8xl" />
        <Form onSubmit={handleSubmit}>
          <InputForm
            placeholder="Nome"
            type="text"
            id="name"
            label="Nome"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
          <InputForm
            placeholder="user@email.com"
            type="email"
            id="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />

          <Submit value="Salvar" />
          <div className="flex gap-4">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Deletar Conta
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Sair
            </button>
          </div>
        </Form>

        <Link to={-1}> Voltar </Link>
      </main>
    </div>
  );
}
export default Profile;
