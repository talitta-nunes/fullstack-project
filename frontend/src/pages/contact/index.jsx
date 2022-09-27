import { Button, Center, VStack, Heading, HStack } from "@chakra-ui/react";
import Input from "../../components/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const Contact = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .max(18, "Nome no máximo 18 caracteres")
      .matches(/^[a-zA-Z_ ]*$/, "Somente letras permitidas")
      .required("Nome obrigatório"),
    email: Yup.string()
      .email("E-mail inválido!")
      .required("E-mail obrigatório"),
    phone: Yup.string().matches(
      phoneRegExp,
      "O numero de telefone não é válido"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const toast = useToast();

  const handleContact = (contact) => {
    toast({
      title: "Registro de Contato.",
      description: "Contato adicionado ao banco de dados.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    console.log(contact);
  };
 
  return (
    <Center w={"100vw"} h={"100vh"} bgColor={"#7192BE"}>
      <VStack
        w={"80%"}
        maxW={"350px"}
        bgColor={"#9E8FB2"}
        border={"3px solid #6553c8"}
        borderRadius={"8px"}
        p={3}
        as={"form"}
        onSubmit={handleSubmit(handleContact)}
      >
        <Heading
          color="#ffffff"
          fontSize="18px"
          fontWeight="normal"
          textAlign={"justify"}
        >
          Cadastro Contato
        </Heading>

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
          placeholder="(99) 99999-9999"
          label="Telefone"
          register={register}
          errors={errors.phone?.message}
        />
        <HStack>
          <Button type={"submit"} w={"80%"} colorScheme={"blue"}>
            Registrar
          </Button>
          <IconButton aria-label="edit" icon={<EditIcon color="green.500" />} />
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon color="red.500" />}
          />
        </HStack>
      </VStack>
    </Center>
  );
};

export default Contact;
