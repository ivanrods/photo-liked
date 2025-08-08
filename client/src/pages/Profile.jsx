import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../schemas/profileSchema";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import { getUser, deleteUser, updateUser } from "../api/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getUser();
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setAvatar(user.avatar);
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      toast.success("Perfil atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirm) return;

    const res = await deleteUser();
    toast.success(res.message || "Conta deletada");
    handleLogout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-700">Meu Perfil</h2>
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border shadow "
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            register={register}
            name="name"
            label="Nome"
            placeholder="Seu nome"
            type="text"
            errors={errors}
          />

          <InputForm
            register={register}
            name="email"
            label="Email"
            placeholder="Seu email"
            type="email"
            errors={errors}
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
            className="text-gray-600 hover:underline text-sm font-medium"
          >
            ← Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Profile;
