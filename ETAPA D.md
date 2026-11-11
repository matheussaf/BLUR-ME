# ETAPA D — Correções (anti-trapaça na foto e diversidade no sorteio)

No arquivo index.html atual (jogo "BLUR ME"), aplique SOMENTE as alterações descritas neste arquivo, como edições pontuais. NÃO reescreva o arquivo inteiro. NÃO remova nem altere regras existentes (5 rodadas, 3 erros, blur 20→12→5→0, dicas, pontuação, áudio Web Audio API, anti-vazamento do nome no DOM, validarBanco) e NÃO apague nenhum artista de ARTISTAS. Preserve também o que já foi implementado nas etapas anteriores (tema escuro, colagens laterais, rastro e glow do mouse, validação com tolerância, pipeline de fotos e modo diagnóstico `?debug=1`). Mantenha o arquivo único, sem bibliotecas externas. Se não conseguir aplicar direto no arquivo, mostre cada mudança como trecho, indicando a seção/função afetada.

Não implemente nada além do que está descrito abaixo.

## 6) ANTI-TRAPAÇA NA FOTO

Problema: segurando o clique na foto borrada e arrastando, o navegador mostra a imagem ORIGINAL sem blur (o filtro CSS não vale para a imagem do arrasto). O mesmo vale para clique direito → abrir/salvar imagem e para selecionar/copiar. Corrigir assim:

**a) Blur aplicado nos PIXELS, dentro de um `<canvas>` (e não via CSS filter numa `<img>`):**

- Carregar a foto com `new Image()` fora do DOM. Nunca inserir no DOM uma `<img>` com a foto enquanto a rodada estiver em andamento. Reaproveitar o mesmo objeto Image que já carregou na pipeline de fotos (sem baixar duas vezes). O placeholder SVG também é desenhado no canvas.
- Desenhar no canvas com recorte central equivalente a `object-fit: cover` (proporção do contêiner), usando `ctx.filter = 'blur(Npx) contrast(120%)'`, com N = BLUR_PX[erros].
- Fallback quando `'filter' in ctx` for falso (ex.: Safari): desenhar a imagem num canvas pequeno (lado ≈ tamanho do canvas ÷ (N × 0.8), mínimo 8px) e ampliar com `imageSmoothingEnabled = true`, o que dá um efeito borrado/pixelado equivalente.
- A cada erro, redesenhar com o novo N, animando a transição em ~400ms com requestAnimationFrame (substitui o antigo `transition: filter`).
- Na revelação (acerto ou derrota), redesenhar nítido (N = 0, sem filtro).
- Manter o contêiner com overflow:hidden e a borda atual. O canvas ocupa 100% do contêiner (width/height reais ajustados ao devicePixelRatio, no máximo 2).

**b) Proteções extras no contêiner da foto (suficientes para bloquear truques casuais):**

- `user-select:none`, `-webkit-user-select:none`, `-webkit-touch-callout:none`, `draggable="false"`.
- `dragstart` e `contextmenu` com preventDefault apenas nesse contêiner (o resto da página mantém o menu normal).

**c) Antes da revelação,** nenhum atributo do DOM (src, alt, title, data-*, aria-label) pode conter a URL da foto ou o nome/alias do artista. Não tente bloquear o DevTools: é um jogo casual.

## 7) SORTEIO COM DIVERSIDADE

Problema: os mesmos artistas se repetem entre partidas.

- O sorteio deve considerar TODOS os 50 artistas, inclusive os sem foto (que usam o placeholder). Não filtrar o banco por disponibilidade de foto.
- Usar sistema de "baralho": embaralhar os 50 com Fisher-Yates (NÃO usar `sort(() => Math.random() - 0.5)`, que é enviesado) e tirar 5 do topo por partida. Artistas já jogados só voltam quando o baralho acabar (50 artistas = 10 partidas sem repetir). Se sobrarem menos de 5, completar a partida com um novo baralho embaralhado, SEM repetir artistas já presentes na partida atual.
- Preferir variedade de gêneros: no máximo 2 artistas do mesmo `genero` por partida. Tentar até 20 vezes; se não for possível, aceitar o sorteio sem essa restrição (nunca entrar em loop infinito).
- Persistir o baralho (artistas restantes) em localStorage, chave "blurme_baralho", dentro de try/catch. Se indisponível, manter só em memória.
- "JOGAR NOVAMENTE" usa o baralho. Nenhum artista aparece duas vezes na mesma partida.
- No modo `?debug=1`, mostrar no painel quantos artistas restam no baralho e um botão "REINICIAR BARALHO".

## CHECKLIST FINAL (silencioso, não imprimir)

- Durante a rodada, arrastar a foto, clicar com o botão direito e selecionar NÃO revelam a imagem nítida.
- Blur 20→12→5→0 continua igual visualmente, agora feito no canvas.
- Três partidas seguidas não repetem nenhum artista.
- Nenhum erro no console; validarBanco sem avisos novos.
- Jogo funcionando como antes, com tudo das etapas A e B intacto.
- Rodapé de crédito da Wikipédia mantido.