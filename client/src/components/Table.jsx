/* Axios: funcionalidade ou biblioteca do react. Refere-se a um cliente HTTP
baseado em Promisses para fazer requisições. Pode ser utilizado
tanto no navegador quanto no node.js (client ou server) ou qualquer
serviço de API.*/

import React, { useState } from "react";
/* Usestate atualiza o objeto - retorna um valor e uma função para atualizar o valor */
import Axios from "axios";

export default function Table() {
  const [isOpen, setIsOpen] = useState();
  const [mostraTable, setMostraTable] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [pais, setPais] = useState("");
  const [funcao, setFuncao] = useState("");
  const [salario, setSalario] = useState(0);

  const [novoSalario, setNovoSalario] = useState(0);

  const [funcionarioLista, setFuncionarioLista] = useState([]);

  /* lado client que adiciona um item no db */
  const addFuncionario = () => {
    Axios.post("http://localhost:3001/create", {
      // codigo: codigo,

      nome: nome,
      idade: idade,
      pais: pais,
      funcao: funcao,
      salario: salario,
    }).then(() => {
      setFuncionarioLista([
        ...funcionarioLista,
        {
          // codigo: codigo,

          nome: nome,
          idade: idade,
          pais: pais,
          funcao: funcao,
          salario: salario,
        },
      ]);
    });
  };
  /* lado client que pega um dado do db */
  const getFuncionarios = () => {
    Axios.get("http://localhost:3001/funcionario").then((response) => {
      setFuncionarioLista(response.data);
    });
  };

  const updateSalarioFuncionario = (codigo) => {
    Axios.put("http://localhost:3001/update", {
      salario: novoSalario,
      codigo: codigo,
    }).then((response) => {
      setFuncionarioLista(
        funcionarioLista.map((val) => {
          return val.codigo === codigo
            ? {
                codigo: val.codigo,
                nome: val.nome,
                idade: val.idade,
                pais: val.pais,
                funcao: val.funcao,
                salario: novoSalario,
              }
            : val;
        })
      );
    });
  };
  /* lado client que deleta um dado do db */
  const deleteFuncionario = (codigo) => {
    Axios.delete(`http://localhost:3001/delete/${codigo}`).then((response) => {
      setFuncionarioLista(
        funcionarioLista.filter((val) => {
          return val.codigo !== codigo;
        })
      );
    });
  };
}
