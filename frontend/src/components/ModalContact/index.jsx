import Input from "../input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const ModalContact = () => {
  const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("Nome obrigatório")
      .max(18, "Nome no máximo 18 caracteres")
      .matches(/^[a-zA-Z_ ]*$/, "Somente letras permitidas"),
    email: Yup.string()
      .required("E-mail obrigatório")
      .email("E-mail inválido!"),
    phone: Yup.string().matches(phoneRegExp, "O numero de telefone não é válido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  
  const toast = useToast();

  const handlecontact = (data) => {
    toast({
      title: "Registro de Contato.",
      description: "Contato adicionado ao banco de dados.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    console.log(data);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button w={"100px"} bg="#5f60a1" onClick={onOpen} fontSize="15px">
        Add Contato
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        borderRadius={"8px"}
        textAlign={"center"}
      >
        <ModalOverlay borderRadius={"8px"} />
        <form w={"95%"} id="new-form" onSubmit={handleSubmit(handlecontact)}>
          <ModalContent maxW={"350px"} borderRadius={"8px"} bgColor={"#D9D9D9"}>
            <ModalHeader
              color={"black"}
              fontWeight={"bold"}
              bgColor={"#5d9ba6"}
              textAlign={"center"}
              borderRadius={"8px"}
            >
              Adicionar contato
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody
              m={"6"}
              bgColor={"teal.600"}
              borderRadius={"8px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Input
                name={"username"}
                placeholder="Nome Completo"
                label="Nome Completo"
                register={register}
                errors={errors.username?.message}
              />
              <Input
                name={"email"}
                placeholder="Email"
                label="E-mail"
                register={register}
                errors={errors.email?.message}
              />
              <Input
                name={"phone"}
                placeholder="Telefone"
                label="Telefone"
                register={register}
                errors={errors.phone?.message}
              />
            </ModalBody>
            <ModalFooter
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <Button
                alignContent={"center"}
                form="new-form"
                bg="#5d77a6"
                color={"black"}
                type="submit"
              >
                Add Contato
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default ModalContact;
