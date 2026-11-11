# ETAPA C — Mural de recados (item 5)

No arquivo index.html atual (jogo "BLUR ME"), aplique SOMENTE as alterações descritas neste arquivo, como edições pontuais. NÃO reescreva o arquivo inteiro. NÃO remova nem altere regras existentes (5 rodadas, 3 erros, blur 20→12→5→0, dicas, pontuação, áudio Web Audio API, anti-vazamento do nome no DOM, validarBanco) e NÃO apague nenhum artista de ARTISTAS. Preserve também o que já foi implementado nas etapas anteriores (tema escuro, colagens laterais, rastro e glow do mouse, validação com tolerância, modo diagnóstico `?debug=1`). Mantenha o arquivo único, sem bibliotecas externas. Se não conseguir aplicar direto no arquivo, mostre cada mudança como trecho, indicando a seção/função afetada.

Não implemente nada além do que está descrito abaixo.

## 5) MURAL DE RECADOS (local)

- Seção "MURAL DE RECADOS" abaixo do card principal, sempre visível, no estilo mural/Orkut antigo (cartões de recado levemente tortos com nome, data/hora e texto).
- Formulário: nome (máx. 20), recado (máx. 140), contadores de caracteres, botão "DEIXAR RECADO".
- Persistência em localStorage (chave "blurme_recados") dentro de try/catch; mostrar os 30 mais recentes.
- Segurança: renderizar SEMPRE com textContent (nunca innerHTML); trim; remover caracteres de controle; bloquear envio vazio; cooldown de 15s entre envios.
- Aviso visível: "OS RECADOS FICAM SALVOS NESTE NAVEGADOR". Botão "LIMPAR MEU MURAL" com confirmação.
- Labels acessíveis; Enter nos campos do mural NUNCA envia palpite do jogo nem rouba o foco dele.

## CHECKLIST FINAL (silencioso, não imprimir)

- Nenhum erro no console.
- validarBanco sem avisos novos.
- Jogo funcionando como antes (rodadas, erros, blur, dicas, pontuação, sons), com tudo das etapas A e B intacto.
- Rodapé de crédito da Wikipédia mantido.