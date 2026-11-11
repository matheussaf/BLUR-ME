# ETAPA B — Lógica e fotos (itens 2 e 3)

No arquivo index.html atual (jogo "BLUR ME"), aplique SOMENTE as alterações descritas neste arquivo, como edições pontuais. NÃO reescreva o arquivo inteiro. NÃO remova nem altere regras existentes (5 rodadas, 3 erros, blur 20→12→5→0, dicas, pontuação, áudio Web Audio API, anti-vazamento do nome no DOM, validarBanco) e NÃO apague nenhum artista de ARTISTAS. Preserve também o que já foi implementado na etapa anterior (tema escuro, colagens laterais, rastro e glow do mouse). Mantenha o arquivo único, sem bibliotecas externas. Se não conseguir aplicar direto no arquivo, mostre cada mudança como trecho, indicando a seção/função afetada.

Não implemente nada além do que está descrito abaixo.

## 2) VALIDAÇÃO COM TOLERÂNCIA (alterar apenas a função de comparação)

- Pré-processar palpite e candidatos (nome + alias) com normalizar() existente e depois COLAPSAR letras repetidas consecutivas ("pabllo vittar" e "pablo vitar" ficam iguais).
- Ordem de decisão:
  - (a) igual ao artista da rodada após colapso → acerto;
  - (b) igual a outro artista do banco → erro;
  - (c) distância de Levenshtein (implementada em JS, sem biblioteca) ao artista da rodada ≤ limite proporcional ao tamanho do candidato (≤4 caracteres: 0; 5–7: 1; ≥8: 2) E nenhum outro artista dentro da tolerância → acerto;
  - (d) senão → erro.
- Nunca usar includes/substring. Palpite repetido continua sem consumir vida.
- Exemplos: "pablo vitar" acerta Pabllo Vittar; "mc ig" nunca acerta MC PH e vice-versa.

## 3) FOTOS (sem inventar URLs)

- NÃO tente "garantir" URLs de memória. Mantenha a pipeline existente (foto → API da Wikipédia via campo `wiki` → placeholder).
- Placeholder durante a rodada: silhueta com "?" genérico. Mostrar iniciais do artista SOMENTE após a revelação (acerto ou derrota).
- Adicionar modo diagnóstico ativado apenas por `?debug=1` na URL: painel listando os 50 artistas com status "FOTO OK", "WIKI OK" ou "PLACEHOLDER", testando no máximo 5 por vez. Sem o parâmetro, o painel não existe.

## CHECKLIST FINAL (silencioso, não imprimir)

- Nenhum erro no console.
- validarBanco sem avisos novos.
- Jogo funcionando como antes (rodadas, erros, blur, dicas, pontuação, sons), com o tema escuro e os efeitos de mouse da etapa A intactos.
- Rodapé de crédito da Wikipédia mantido.