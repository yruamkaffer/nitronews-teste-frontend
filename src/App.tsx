import { Button, Modal, ModalContent, useDisclosure } from "@heroui/react";

import { RegisterForm } from "./components/register-form";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-96 text-center justify-center">
          <span className={title()}>Teste&nbsp;</span>
          <span className={title({ color: "blue" })}>Front-End&nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-8" })}>
            O desafio consiste em desenvolver uma funcionalidade de cadastro de
            usuários, com validação de campos, integração com o backend para
            garantir a consistência dos dados e um layout que proporcione uma
            experiência agradável ao usuário.
          </div>
        </div>

        <div className="flex gap-3">
          <Button onPress={onOpen}>Cadastrar usuário</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>{(onClose) => <RegisterForm />}</ModalContent>
          </Modal>
        </div>
      </section>
    </DefaultLayout>
  );
}
