import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import InputForm from "../components/InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registro bem-sucedido!");
      navigate("/signIn");
    } catch (error) {
      toast.error("Erro ao registrar: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="hidden md:block md:w-1/2">
          <img
            src="wallpaper.jpg"
            alt="Imagem de registro"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <FaCamera className="text-5xl text-gray-600" />

            <h2 className="text-2xl font-bold text-gray-700">Crie sua conta</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              register={register}
              placeholder="Digite seu nome"
              type="text"
              label="Nome"
              name="name"
              errors={errors}
            />
            <InputForm
              register={register}
              name="email"
              label="Email"
              placeholder="Digite seu email"
              type="email"
              errors={errors}
            />
            <InputForm
              register={register}
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              errors={errors}
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
