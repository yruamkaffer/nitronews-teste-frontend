import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Input,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { ModalHeader, ModalBody } from "@heroui/react";

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Nome completo é obrigatório")
      .refine((name) => name.trim().split(" ").length >= 2, {
        message: "Informe nome e sobrenome",
      }),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número")
      .regex(
        /[^A-Za-z0-9]/,
        "A senha deve conter ao menos um caractere especial",
      ),
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (data: FormData, onClose: () => void) => {
    console.log(JSON.stringify(data, null, 2));
    addToast({
      title: "Usuário cadastrado com sucesso",
      color: "success",
      promise: new Promise((resolve) => setTimeout(resolve, 2000)),
      timeout: 4000,
    });
    reset();
    onClose();
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Cadastrar usuário
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            const handleFormSubmit = (data: FormData) =>
              onSubmit(data, onClose);

            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Cadastrar usuário
                </ModalHeader>
                <ModalBody>
                  <Form
                    className="w-full justify-center items-center space-y-2 mt-10 mb-10"
                    onSubmit={handleSubmit(handleFormSubmit)}
                  >
                    <div>
                      <Input
                        label="Nome completo"
                        type="text"
                        {...register("fullName")}
                        className="w-96 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="E-mail"
                        type="email"
                        {...register("email")}
                        className="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Senha"
                        type="password"
                        {...register("password")}
                        className="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        label="Confirme a senha"
                        type="password"
                        {...register("confirmPassword")}
                        className="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <Button
                      className="w-96 inline-flex justify-center py-4 px-4"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Cadastrar usuário
                    </Button>
                  </Form>
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
