# ETAPA A — Visual (itens 1 e 4)

No arquivo index.html atual (jogo "BLUR ME"), aplique SOMENTE as alterações descritas neste arquivo, como edições pontuais. NÃO reescreva o arquivo inteiro. NÃO remova nem altere regras existentes (5 rodadas, 3 erros, blur 20→12→5→0, dicas, pontuação, áudio Web Audio API, anti-vazamento do nome no DOM, validarBanco) e NÃO apague nenhum artista de ARTISTAS. Mantenha o arquivo único, sem bibliotecas externas. Se não conseguir aplicar direto no arquivo, mostre cada mudança como trecho, indicando a seção/função afetada.

Não implemente nada além do que está descrito abaixo.

## 1) TEMA ESCURO + COLAGEM

- Fundo geral #111 com xadrez pixelado pequeno e discreto (células de ~8–12px, contraste mínimo com #1a1a1a).
- Manter cards/janelas coloridos (texto escuro sobre fundo claro). Qualquer texto direto sobre o fundo escuro deve ser branco ou amarelo, com contraste legível.
- Colagem nas laterais: elementos decorativos ("#fotolog", "#orkut", "#emo2000", "★ BRASIL 2000", selos, adesivos, recortes de jornal) com rotação entre -3deg e 3deg, `pointer-events:none`, `aria-hidden="true"`, abaixo do jogo no z-index. Exibir só em telas ≥ 1100px; abaixo disso, display:none. Nunca cobrir o jogo.
- Animações leves, desativadas com prefers-reduced-motion.

## 4) EFEITOS DE MOUSE

- Rastro: canvas fixo em tela cheia, `pointer-events:none`, quadradinhos pixelados de 6px (rosa/ciano/amarelo) que somem em ~400ms, máximo 40 partículas, requestAnimationFrame, pausa com document.hidden. Ativar só em `(hover:hover) and (pointer:fine)` e desativar com prefers-reduced-motion.
- Glow em :hover e :focus-visible de inputs, botões e cards de dica (box-shadow neon + transição de 150ms), preservando a sombra seca. Não pode atrapalhar cliques nem digitação.

## CHECKLIST FINAL (silencioso, não imprimir)

- Nenhum erro no console.
- validarBanco sem avisos novos.
- Jogo funcionando exatamente como antes (rodadas, erros, blur, dicas, pontuação, sons).
- Rodapé de crédito da Wikipédia mantido.