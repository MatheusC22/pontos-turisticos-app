import {
  ChakraProvider,
  Text,
  Flex,
  Heading,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import theme from "../styles/global";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from "react";

type FormFields = {
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  responsavel: string;
  telResponsavel: string;
  emailResponsavel: string;
}

export const App = () => {

  const requiredMessage = 'Campo obrigatório.';
  const schemaValidation = yup.object().shape({
    nome: yup.string().required(requiredMessage),
    descricao: yup.string().required(requiredMessage),
    cidade: yup.string().required(requiredMessage),
    estado: yup.string().required(requiredMessage),
    responsavel: yup.string().required(requiredMessage),
    telResponsavel: yup.string().required(requiredMessage),
    emailResponsavel: yup.string().required(requiredMessage)
  })

  const { register, handleSubmit, formState: { isValid, errors } } = useForm<FormFields>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  function onSubmit(data: FormFields) {
    console.log(data);
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <ChakraProvider theme={theme}>
      <Flex w={'100%'} minH={'100vh'} align={'center'} justify={'center'} bg={'#fafafa'}>
        <Flex w={'640px'} minH={'480px'} maxW={'80%'} my={'2rem'} bg={'white'} borderRadius={'20px'} boxShadow={'md'} align={'center'} py={'32px'} direction={'column'}>
          <Heading fontWeight={'900'}>🗽 Pontos Turísticos</Heading>
          <Flex as={'form'} direction={'column'} w={'100%'} px={'70px'} mt={'32px'} gap={'24px'} onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.nome ? true : false}>
              <Input placeholder="Nome" {...register("nome")} />
              <FormErrorMessage>{errors?.nome?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <Input placeholder="Descrição" {...register("descricao")} />
              <FormErrorMessage>{errors?.descricao?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap={'48px'}>
              <FormControl >
                <Input placeholder="Cidade" {...register("cidade")} />
                {errors.cidade && <FormErrorMessage>{errors.cidade.message}</FormErrorMessage>}
              </FormControl>
              <FormControl >
                <Input placeholder="Estado" {...register("estado")} />
                <FormErrorMessage>{errors?.estado?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl >
              <Input placeholder="Responsável" {...register("responsavel")} />
              <FormErrorMessage>{errors?.responsavel?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap={'48px'}>
              <FormControl >
                <Input placeholder="Telefone Responsável" {...register("telResponsavel")} />
                <FormErrorMessage>{errors?.telResponsavel?.message}</FormErrorMessage>
              </FormControl>
              <FormControl >
                <Input placeholder="E-mail Responsável" {...register("emailResponsavel")} type="email" />
                <FormErrorMessage>{errors?.emailResponsavel?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap={'48px'}>
              <Button w={'100%'} variant={'outline'} colorScheme={'red'}>Limpar</Button>
              <Button w={'100%'} colorScheme={'teal'} type="submit" disabled={!isValid}>Enviar</Button>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
