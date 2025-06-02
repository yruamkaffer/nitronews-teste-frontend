import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button } from "@heroui/react";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Nome completo é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados validados:", data);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Nome completo */}
      <div>
        <Input
          label="Nome completo"
          type="text"
          {...register("fullName")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* E-mail */}
      <div>
        <Input
          label="E-mail"
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Senha */}
      <div>
        <Input
          label="Senha"
          type="password"
          {...register("password")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar senha */}
      <div>
        <Input
          label="Confirme a senha"
          type="password"
          {...register("confirmPassword")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <Button
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent 
                     rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Cadastrar usuário
        </Button>
      </div>
    </Form>
  );
}

export function RegisterModalContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Cadastrar usuário
      </ModalHeader>
      <ModalBody>RegisterForm();</ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Fechar
        </Button>
        <Button color="primary" onPress={onClose}>
          Cadastrar
        </Button>
      </ModalFooter>
    </>
  );
}
