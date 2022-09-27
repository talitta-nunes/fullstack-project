import { Button, Center, VStack, Heading } from "@chakra-ui/react";
import Input from "../../components/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUser } from "../../providers/user";

const Login = () => {
  const formSchema = Yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { login } = useUser();

  const handleLogin = (data) => login(data);
  

  return (
    <Center w={"100vw"} h={"100vh"} bgColor={"#adb9e3"}>
      <VStack
        w={"80%"}
        maxW={"350px"}
        bgColor={"#ADB9E3"}
        border={"2px solid #B744B8"}
        borderRadius={"8px"}
        p={3}
        as={"form"}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Heading fontSize={"20px"} textColor={"blue.600"}>
          Login Staff
        </Heading>

        <Input
          name={"email"}
          placeholder="Email"
          label="E-mail"
          register={register}
          errors={errors.email?.message}
        />
        <Input
          name={"password"}
          placeholder="Senha"
          label="Senha"
          type="password"
          register={register}
          errors={errors.password?.message}
        />
        <Button type={"submit"} w={"50%"} colorScheme={"purple"}>
          Logar!
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
