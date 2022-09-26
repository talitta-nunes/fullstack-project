import { Button, VStack, Center, Heading, Text, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("Nome obrigatório")
      .max(18, "Nome no máximo 18 caracteres"),
    email: Yup.string()
      .required("E-mail obrigatório")
      .email("E-mail inválido!"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Sua senha deve conter ao menos um dígito, ao menos uma letra minúscula, ao menos uma letra maiúscula, pelo menos um caractere especial ($*&@#) e deve conter ao menos 8 dos caracteres mencionados"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "As senhas devem ser iguais!"
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

  const handleRegister = (data) => {
    //console.log(data);
    api
      .post('/users', data)
      .then(() => {
        navigate("/login");
        toast({
          title: "Cadastro de servidores.",
          description: "'Cadastro realizado com sucesso! Faça o login'",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err)
       toast({
         title: "Erro",
         description: "Cadastro inválido",
         status: "error",
         duration: 5000,
         isClosable: true,
       });
      })
  
  };
  
  return (
    <Center w={"100vw"} h={"100vh"} bgColor={"#adb9e3"}>
      <VStack
        w={"80%"}
        maxW={"350px"}
        bgColor={"purple.300"}
        border={"3px solid #6553c8"}
        borderRadius={"8px"}
        p={3}
        as={"form"}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Heading fontSize={"20px"} textColor={"blue.600"}>
          Cadastro Staff
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
          placeholder="Digite seu e-mail"
          label="Email"
          register={register}
          errors={errors.email?.message}
        />
        <Input
          name={"password"}
          placeholder="Coloque sua senha"
          label="Senha"
          type="password"
          register={register}
          errors={errors.password?.message}
        />
        <Input
          name={"confirmPassword"}
          placeholder="Confirme sua senha"
          label="Confirme sua senha"
          type="password"
          register={register}
          errors={errors.confirmPassword?.message}
        />
        <Button type={"submit"} w={"50%"} colorScheme={"purple"}>
          Cadastrar
        </Button>
        <Text fontSize="15px" pt="8px">
          Já possui conta? Clique{" "}
          <Link to="/login">
            <chakra.span fontWeight="900" color="#ff0202">
              aqui
            </chakra.span>
          </Link>
        </Text>
      </VStack>
    </Center>
  );
}
export default Signup;
