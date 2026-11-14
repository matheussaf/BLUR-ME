# ETAPA B2 — Ajuste da pipeline de fotos

No arquivo index.html atual (jogo "BLUR ME"), aplique SOMENTE as alterações descritas neste arquivo, como edições pontuais. NÃO reescreva o arquivo inteiro. NÃO remova nem altere regras existentes (5 rodadas, 3 erros, blur 20→12→5→0 desenhado no canvas, dicas, pontuação, áudio Web Audio API, anti-vazamento do nome no DOM, validarBanco, sorteio em baralho) e NÃO apague nenhum artista de ARTISTAS. Preserve também o que já foi implementado nas etapas anteriores (tema escuro, colagens laterais, rastro e glow do mouse, validação com tolerância, anti-trapaça da foto, modo diagnóstico `?debug=1`). Mantenha o arquivo único, sem bibliotecas externas. Se não conseguir aplicar direto no arquivo, mostre cada mudança como trecho, indicando a seção/função afetada.

Não implemente nada além do que está descrito abaixo.

## 3b) FOTOS: fallback de busca e diagnóstico

**1) Fallback de busca na Wikipédia.** Ordem final da pipeline: `foto` (se não vazia) → consulta por `wiki` → busca por nome em pt.wikipedia → busca por nome em en.wikipedia → placeholder.

- Se `wiki` estiver vazio, pular a consulta direta e ir para a busca.
- Se a consulta por `wiki` falhar (404, sem thumbnail ou type ≠ 'standard'), ir para a busca.
- Busca em https://pt.wikipedia.org/w/api.php com os parâmetros: action=query, generator=search, gsrsearch=<nome do artista> + " cantor", gsrlimit=1, prop=pageimages, piprop=thumbnail, pithumbsize=600, format=json, origin=*.
- Usar o thumbnail.source do resultado SOMENTE se o título da página, normalizado com a função normalizar() existente, contiver o nome do artista normalizado (ou vice-versa). Isso evita foto de outra pessoa em nomes curtos como "Kyan" ou "Teto".
- Se falhar, repetir em https://en.wikipedia.org/w/api.php com os mesmos parâmetros e o mesmo critério.
- Só depois usar o placeholder. Manter timeout de 6s por tentativa e try/catch: nenhuma falha de rede pode travar o jogo.
- Manter o cache (Map) e o pré-carregamento da próxima foto.

**2) Painel `?debug=1`.** Para cada artista, mostrar:

- A etapa que funcionou: "FOTO", "WIKI", "BUSCA PT" ou "BUSCA EN"; ou, no placeholder, o motivo ("wiki vazio", "404", "sem foto no artigo", "sem resultado").
- O título da página encontrada e uma miniatura de 40px, para conferir se a foto é da pessoa certa.
- O painel só existe com `?debug=1` e nunca deve ser criado no jogo normal (nenhuma URL de foto pode ir para o DOM durante o jogo).

**3) Kyan e Vulgo FK.** Os títulos atuais do campo `wiki` dão 404. Trocar o valor de `wiki` desses dois por "" (string vazia). Não mexer em mais nenhum campo do array ARTISTAS.

## CHECKLIST FINAL (silencioso, não imprimir)

- Console sem os erros 404 de Kyan e Vulgo FK.
- Nenhum erro novo no console; validarBanco sem avisos novos.
- Jogo funcionando como antes (rodadas, erros, blur no canvas, dicas, pontuação, sons, sorteio em baralho), com tudo das etapas A, B e D intacto.
- Rodapé de crédito da Wikipédia mantido.