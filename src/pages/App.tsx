import {
  Alert,
  AlertIcon,
  Button,
  ChakraProvider,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import theme from "../styles/global";
import formatCep from "../utils/formatCep";
import formatPhone from "../utils/formatPhone";

type FormFields = {
  nome: string;
  descricao: string;
  cep: string;
  cidade: string;
  estado: string;
  responsavel: string;
  telResponsavel: string;
  emailResponsavel: string;
};

export const App = () => {
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const requiredMessage = "Campo obrigatório.";
  const schemaValidation = yup.object().shape({
    nome: yup.string().required(requiredMessage),
    descricao: yup.string().required(requiredMessage),
    cep: yup.string().required(requiredMessage),
    cidade: yup.string().required(requiredMessage),
    estado: yup.string().required(requiredMessage),
    responsavel: yup.string().required(requiredMessage),
    telResponsavel: yup.string().required(requiredMessage).length(15, "Telefone inválido."),
    emailResponsavel: yup.string().email("E-mail inválido.").required(requiredMessage),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    resetField,
    formState: { isValid, errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  function resetForm() {
    reset();
    setPhone("");
    setCep("");
  }

  async function onSubmit(data: FormFields) {
    if (isOpen) {
      onClose();
    }
    console.log(data);
    onOpen();
    resetForm();
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCep(formatCep(event.target.value));
  }

  async function handleCepBlur(event: React.FocusEvent<HTMLInputElement>) {
    resetField("cidade");
    resetField("estado");
    try {
      const cep = event.target.value.replace(/\D/g, "");
      if (cep.length !== 8) {
        setError("cep", { message: "CEP inválido." });
      }
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) {
        setError("cep", { message: "CEP inválido." });
      }
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    } catch (error) {
      setError("cep", { message: "CEP inválido." });
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex w={"100%"} minH={"100vh"} align={"center"} justify={"center"} bg={"#fafafa"} direction={"column"}>
        <Flex
          w={"640px"}
          minH={"480px"}
          maxW={"80%"}
          my={"2rem"}
          bg={"white"}
          borderRadius={"20px"}
          boxShadow={"md"}
          align={"center"}
          py={"32px"}
          direction={"column"}
        >
          <Heading fontWeight={"900"}>🗽 Pontos Turísticos</Heading>
          <Flex
            as={"form"}
            direction={"column"}
            w={"100%"}
            px={"70px"}
            mt={"32px"}
            gap={"24px"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={errors.nome ? true : false}>
              <Input placeholder="Nome *" {...register("nome")} />
              <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.descricao ? true : false}>
              <Input placeholder="Descrição *" {...register("descricao")} />
              <FormErrorMessage>{errors?.descricao?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap={"1.5rem"}>
              <FormControl
                isInvalid={errors.cep ? true : false}
                w={"45%"}
                onBlur={handleCepBlur}
                onChange={handleCepChange}
              >
                <Input placeholder="CEP *" {...register("cep")} value={cep} />
                <FormErrorMessage>{errors?.cep?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.cidade ? true : false} isDisabled>
                <Input placeholder="Cidade *" {...register("cidade")} />
                <FormErrorMessage>{errors?.cidade?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.estado ? true : false} w={"30%"} isDisabled>
                <Input placeholder="UF*" {...register("estado")} />
                <FormErrorMessage>{errors?.estado?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl isInvalid={errors.responsavel ? true : false}>
              <Input placeholder="Responsável *" {...register("responsavel")} />
              <FormErrorMessage>{errors?.responsavel?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap={"48px"}>
              <FormControl isInvalid={errors.telResponsavel ? true : false}>
                <Input
                  placeholder="Telefone Responsável *"
                  {...register("telResponsavel")}
                  maxLength={15}
                  onChange={handlePhoneChange}
                  value={phone}
                />
                <FormErrorMessage>{errors?.telResponsavel?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.emailResponsavel ? true : false}>
                <Input placeholder="E-mail Responsável *" {...register("emailResponsavel")} type="email" />
                <FormErrorMessage>{errors?.emailResponsavel?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap={"48px"}>
              <Button
                w={"100%"}
                variant={"outline"}
                onClick={() => resetForm()}
                colorScheme={"red"}
                isLoading={isSubmitting}
              >
                Limpar
              </Button>
              <Button w={"100%"} colorScheme={"primaryApp"} type="submit" disabled={!isValid} isLoading={isSubmitting}>
                Enviar
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {isOpen && (
          <Flex w={"640px"} maxW={"80%"} id="success">
            <Alert status="success" borderRadius={"20px"} boxShadow={"md"}>
              <AlertIcon />
              <Flex align={"center"} justify={"space-between"} grow={1}>
                <Text>Dados cadastrados com sucesso!</Text>
                <CloseButton alignSelf="flex-start" position="relative" onClick={onClose} />
              </Flex>
            </Alert>
          </Flex>
        )}
      </Flex>
    </ChakraProvider>
  );
};
