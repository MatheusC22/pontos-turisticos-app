import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

test("Botão Enviar rendeniza Desabilitado", () => {
  render(<App />);
  //verifrica se o botao de enviar é reendenizado desabilitado
  expect(screen.getByRole("button", { name: /enviar/i })).toBeDisabled;
});

test("Campo telefone é valido", () => {
  render(<App />);
  //digita o valor 14996277355 juntamente com texto "teste" para validar o campo
  userEvent.type(
    screen.getByPlaceholderText(/Telefone Responsável */i),
    "14996277355teste"
  );
  const telInput = screen.getByPlaceholderText(/Telefone Responsável */i);
  //verifica se a string retornada bate com o regex de telefone (xx) xxxxx-xxxx
  expect(telInput.value).toEqual(
    expect.stringMatching(/^\([1-9]{2}\) (?:[1-9]|9[1-9])[0-9]{4}\-[0-9]{4}$/)
  );
});

test("campo de E-mail é valido", () => {
  render(<App />);

  userEvent.type(
    screen.getByPlaceholderText(/E-mail Responsável */i),
    "matheuscolombo@gmail.com"
  );
  //verifica se a string retornada bate com o regex de email xxxxx.xxx@xxx.xxx
  const emailInput = screen.getByPlaceholderText(/E-mail Responsável */i);
  expect(emailInput.value).toEqual(
    expect.stringMatching(/^[a-z0-9.]{0,25}@[a-z0-9]+\.[a-z]{3}/i)
  );
});

test("campo de CEP é valido", () => {
  render(<App />);
  //digita o valor 17500-300 juntamente com texto "teste" para validar o campo
  userEvent.type(screen.getByPlaceholderText(/CEP */i), "17500-300teste");
  const cepInput = screen.getByPlaceholderText(/CEP */i);
  //verifica se a string retornada bate com o regex de CEP xx.xxx-xxx
  expect(cepInput.value).toEqual(
    expect.stringMatching(/^[0-9]{2}.[0-9]{3}-[0-9]{3}/i)
  );
});

test("Botão enviar é liberado quando tudo e preenchido", async () => {
  render(<App />);
  //digita todos os valores necessarios para cadastras um ponto turistico
  userEvent.type(screen.getByPlaceholderText(/CEP */i), "17500-300");
  userEvent.type(
    screen.getByPlaceholderText(/E-mail Responsável */i),
    "matheuscolombo@gmail.com"
  );
  userEvent.type(
    screen.getByPlaceholderText(/Telefone Responsável */i),
    "14996277355teste"
  );
  userEvent.type(screen.getByPlaceholderText(/Nome */i), "Cristo redentor");
  userEvent.type(
    screen.getByPlaceholderText(/Descrição */i),
    "imagem de cristo no alto do monte corcovado"
  );
  userEvent.type(
    screen.getByPlaceholderText(/^Responsável */i),
    "prefeitura do estado do rio"
  );
  //espera os valores serem preenchidos para verificar se o botão de enviar foi
  //liberado
  expect(await screen.getByRole("button", { name: /enviar/i })).toBeEnabled;
});

test("Botão Limpar funcionando corretamente", async () => {
  render(<App />);
  //digita um valor no campo de Nome
  userEvent.type(screen.getByPlaceholderText(/Nome */i), "Cristo redentor");
  const nomeInput = screen.getByPlaceholderText(/Nome */i);
  //acha e clica no botão de limpar
  const btnLimpar = screen.getByRole("button", { name: /Limpar/i });
  btnLimpar.click();
  //verifica se o valor digitado foi limpo
  expect(await nomeInput.value).toEqual("");
});
