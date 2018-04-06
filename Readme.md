```
clone this repo
```

```
npm install
```

```
npm test
```

```
npm start
```

```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/{representacao-numerica-codigo-de-barras}
```


A aplicação processa representações numéricas de códigos de barra, fazendo em um primeiro momento a validação do parâmetro passado ao API (se não for uma sequência de 47 ou 48 números retorna status code 400), depois converte a representação numérica em um código de barras de 44 dígitos que é validado de acordo com os dígitos validadores (se for inválido, retorna 400), então retorna JSON com os campos código de barras, valor, data de validade e válido.

