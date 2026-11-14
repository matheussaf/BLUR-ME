# ⚡ BLUR ME // Adivinhe o Artista BR

<p align="center">
  <img src="https://img.shields.io/badge/Vibe-Y2K%20%2F%20Brutalist-ff2e93?style=for-the-badge&logo=css3&logoColor=white" alt="Y2K Style" />
  <img src="https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-ffe600?style=for-the-badge&logo=javascript&logoColor=black" alt="Stack" />
  <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-00e5ff?style=for-the-badge&logo=github&logoColor=black" alt="Deploy" />
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-39ff14?style=for-the-badge" alt="Web Audio API" />
</p>

<p align="center">
  <b>Um jogo web retrô de adivinhação musical inspirado na estética dos anos 2000, fã-clubes antigos e zines urbanos.</b><br>
  <i>Teste seus conhecimentos sobre os 50 maiores artistas brasileiros da atualidade!</i>
</p>

<p align="center">
  <a href="https://matheussaf.github.io/BLUR-ME/">
    <img src="https://img.shields.io/badge/🕹️_JOGAR_AGORA-39ff14?style=for-the-badge" alt="Jogar Agora" />
  </a>
</p>

---

## Sobre o Jogo

O **BLUR ME** é um jogo interativo de adivinhação (Single Page Application) onde o objetivo é descobrir qual artista brasileiro está escondido por trás da foto desfocada. 

A cada tentativa errada, o filtro de `blur` diminui progressivamente e novas dicas inspiradas em recortes de jornal são liberadas. Mas cuidado: você tem apenas **3 vidas por rodada** e a partida dura **5 rodadas**!

---

## ✨ Destaques & Funcionalidades

- **Estética Y2K / Brutalismo Web:** Design inspirado na cultura pop dos anos 2000, com referências visuais a zines, colagens, sombras secas estilo sticker, fontes monospaced e modo escuro customizável.
- **Banco com 50 Artistas Brasileiros:** Cobrindo os gêneros mais ouvidos da atualidade (Sertanejo, Funk, Trap/Rap, MPB, Pop, Pagode, Piseiro, Rock e Indie).
- **Validação Inteligente (Fuzzy Matching):** Tolerância a pequenos erros de digitação (acentuação, letras dobradas ou pequenos deslizes, ex: aceita *"pablo vitar"* para *"Pabllo Vittar"*).
- **Pipeline de Imagens Dinâmico:** Integração com a API REST da Wikipédia + Wikimedia Commons e fallback automático via SVG caso a imagem falhe.
- **Efeitos Sonoros Retrô (Web Audio API):** Sons sintetizados diretamente por código via navegador (graves 808 para erros e arpejos 8-bit para acertos), dispensando arquivos de áudio externos.
- **Mural de Recados:** Campo de comentários integrado utilizando `localStorage` para visitantes deixarem seus palpites e feedbacks.
- **100% Responsivo:** Adaptado para rodar perfeitamente em dispositivos móveis e desktops.

---

## 📸 Demonstração Visual

<p align="center">
  <b>Tela Inicial</b><br><br>
  <img src="https://github.com/user-attachments/assets/5781afd4-32c0-4fca-adb1-2db330b4dbe4" width="750" alt="Tela Inicial do Jogo Blur Me" />
</p>

<br>

<p align="center">
  <b>Gameplay em Ação</b><br><br>
  <img src="COLE_AQUI_O_LINK_DA_SEGUNDA_IMAGEM" width="750" alt="Gameplay do Jogo Blur Me" />
</p>
