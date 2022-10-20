# Exportar todos os produtos
- O script exporta todos os produtos da loja, porém com as informações desejadas como ID, sku e quantidade.
## Como fazer?
- git clone https://github.com/matheusgnreis/export-all-products
- cd export-all-products
- npm i
<hr>
- Modificar as credenciais da loja no headers, para buscar todos os produtos da loja que preferir.
- Em **size**, altere para a quantidade de produtos desejada.
- No seu terminal, execute o seguinte script: **node index.js > log-file.json**, ele irá exportar um arquivo para a mesma aba, com o log criado.
- Se abrir no seu pc, clique pra substituir tudo que tem ' por espaço vazio e depois jogue no https://csvjson.com/json2csv para gerar um csv e enviar para o cliente desejado

