 'use strict';

    // CONFIG
    const RODADAS = 5;
    const MAX_ERROS = 3;
    const BLUR_PX = [20, 12, 5, 0];
    const DELAY_ACERTO_MS = 2000;
    const DELAY_DERROTA_MS = 3000;
    const API_WIKI = 'https://pt.wikipedia.org/api/rest_v1/page/summary/';
    const API_WIKI_SEARCH_PT = 'https://pt.wikipedia.org/w/api.php';
    const API_WIKI_SEARCH_EN = 'https://en.wikipedia.org/w/api.php';
    const FOTO_TIMEOUT_MS = 6000;

    // ARTISTAS
    const ARTISTAS = [
      { nome: 'Henrique & Juliano', genero: 'Sertanejo', alias: ['henrique e juliano', 'henrique juliano', 'henriqueejuliano'], wiki: 'Henrique & Juliano', foto: '', bio: 'A dupla goiana ganhou espaço nacional com canções românticas e shows de grande público.', dicas: ['A dupla se formou no interior de Tocantins.', 'O repertório mistura sertanejo universitário e baladas românticas.', '“Liberdade Provisória” virou um de seus grandes sucessos.'] },
      { nome: 'Ana Castela', genero: 'Sertanejo', alias: ['ana castela', 'anacastela', 'boiadeira'], wiki: 'Ana Castela', foto: '', bio: 'Cantora do Mato Grosso do Sul, tornou-se um dos nomes centrais da nova geração sertaneja.', dicas: ['Sua trajetória começou ligada à música de sua região.', 'A sonoridade aproxima sertanejo, pop e agronejo.', '“Pipoco” ajudou a popularizar sua voz pelo país.'] },
      { nome: 'Gustavo Mioto', genero: 'Sertanejo', alias: ['gustavo mioto', 'gustavomioto', 'mioto'], wiki: 'Gustavo Mioto', foto: '', bio: 'Cantor e compositor paulista conhecido por unir baladas românticas e sertanejo contemporâneo.', dicas: ['Começou a compor ainda jovem no interior paulista.', 'Seu repertório transita entre o sertanejo e o pop romântico.', '“Impressionando os Anjos” é uma de suas canções conhecidas.'] },
      { nome: 'Simone Mendes', genero: 'Sertanejo', alias: ['simone mendes', 'simonemendes'], wiki: 'Simone Mendes', foto: '', bio: 'Cantora baiana que construiu carreira no sertanejo e seguiu em trajetória solo.', dicas: ['Antes da carreira solo, cantou por anos em uma dupla familiar.', 'Sua fase solo combina sertanejo romântico e sofrência.', '“Erro Gostoso” marcou seu repertório solo.'] },
      { nome: 'Zé Neto & Cristiano', genero: 'Sertanejo', alias: ['ze neto e cristiano', 'ze neto cristiano', 'zenetoecristiano', 'zenetocristiano'], wiki: 'Zé Neto & Cristiano', foto: '', bio: 'Dupla sertaneja do interior paulista que ganhou destaque com canções de romance e sofrência.', dicas: ['Os dois cantores são do interior do estado de São Paulo.', 'A dupla é conhecida pelo sertanejo romântico de refrões marcantes.', '“Largado às Traças” é um de seus maiores hits.'] },
      { nome: 'Jorge & Mateus', genero: 'Sertanejo', alias: ['jorge e mateus', 'jorge mateus', 'jorgemateus', 'jorgeemateus'], wiki: 'Jorge & Mateus', foto: '', bio: 'Dupla goiana que ajudou a popularizar o sertanejo universitário em todo o Brasil.', dicas: ['Os cantores se conheceram em festas universitárias em Goiás.', 'A dupla mistura sertanejo romântico com influências pop.', '“Amo Noite e Dia” está entre seus sucessos mais conhecidos.'] },
      { nome: 'Léo Foguete', genero: 'Piseiro', alias: ['leo foguete', 'leofoguete', 'foguete'], wiki: 'Léo Foguete', foto: '', bio: 'Cantor pernambucano associado à nova onda do piseiro e do forró popular.', dicas: ['Sua música vem da nova cena de forró do Nordeste.', 'O piseiro e os ritmos dançantes aparecem em seu repertório.', '“Última Noite” levou sua voz a um público amplo.'] },
      { nome: 'João Gomes', genero: 'Piseiro', alias: ['joao gomes', 'joaogomes'], wiki: 'João Gomes (cantor)', foto: '', bio: 'Cantor pernambucano que levou o piseiro e o chamado forró de vaquejada às paradas nacionais.', dicas: ['Começou a divulgar suas canções nas redes sociais.', 'Sua voz grave se destaca no piseiro e no forró romântico.', '“Meu Pedaço de Pecado” tornou-se um sucesso nacional.'] },
      { nome: 'Zé Vaqueiro', genero: 'Piseiro', alias: ['ze vaqueiro', 'zevaqueiro'], wiki: 'Zé Vaqueiro', foto: '', bio: 'Cantor cearense ligado ao piseiro, ao forró eletrônico e às canções românticas.', dicas: ['Sua carreira se desenvolveu na cena musical do Ceará.', 'Seu estilo aproxima piseiro, forró e letras românticas.', '“Letícia” está entre os hits que o projetaram.'] },
      { nome: 'Murilo Huff', genero: 'Sertanejo', alias: ['murilo huff', 'murilohuff', 'huff'], wiki: 'Murilo Huff', foto: '', bio: 'Cantor e compositor goiano, também conhecido por compor para artistas do sertanejo.', dicas: ['A composição faz parte importante de sua trajetória musical.', 'Seu repertório segue uma linha de sertanejo romântico.', '“Uma Ex” está entre as canções conhecidas de sua carreira.'] },
      { nome: 'Gusttavo Lima', genero: 'Sertanejo', alias: ['gusttavo lima', 'gusttavolima', 'embaixador'], wiki: 'Gusttavo Lima', foto: '', bio: 'Cantor mineiro que se tornou um dos artistas mais populares do sertanejo brasileiro.', dicas: ['Sua carreira começou no interior de Minas Gerais.', 'Seu som combina sertanejo, arrocha e influências pop.', '“Balada” foi um dos hits que ampliaram seu público.'] },
      { nome: 'Matuê', genero: 'Trap/Rap', alias: ['matue', 'matue030'], wiki: 'Matuê', foto: '', bio: 'Rapper e produtor cearense associado à expansão do trap brasileiro.', dicas: ['O artista nasceu e começou a carreira musical em Fortaleza.', 'Seu trabalho explora o trap com produção e estética próprias.', '“Kenny G” é um de seus sucessos mais conhecidos.'] },
      { nome: 'Teto', genero: 'Trap/Rap', alias: ['teto', 'teto30'], wiki: 'Teto (rapper)', foto: '', bio: 'Rapper baiano que ganhou projeção nacional na nova cena do trap.', dicas: ['O artista é natural da Bahia e surgiu na cena independente.', 'Seus lançamentos combinam trap melódico e refrões marcantes.', '“M4” ajudou a apresentar seu trabalho ao grande público.'] },
      { nome: 'Veigh', genero: 'Trap/Rap', alias: ['veigh', 'veigh777'], wiki: 'Veigh', foto: '', bio: 'Rapper paulista que ganhou destaque com melodias e produção ligadas ao trap.', dicas: ['O artista surgiu na cena da Grande São Paulo.', 'Seu som combina trap, melodias e referências de R&B.', '“Novo Balanço” se tornou um sucesso nas plataformas.'] },
      { nome: 'MC Ryan SP', genero: 'Funk', alias: ['mc ryan sp', 'mcryansp', 'ryan sp'], wiki: 'MC Ryan SP', foto: '', bio: 'Cantor paulista de funk conhecido por faixas dançantes e presença na cena do funk nacional.', dicas: ['O artista começou sua trajetória musical na zona leste paulistana.', 'Seu repertório passa pelo funk paulista e pelo ritmo de pista.', '“Tubarão Te Amo” ficou conhecido em todo o país.'] },
      { nome: 'MC IG', genero: 'Funk', alias: ['mc ig', 'mcig'], wiki: 'MC IG', foto: '', bio: 'Cantor de funk de São Paulo, ligado à cena de baile e às produções paulistanas.', dicas: ['Sua carreira está ligada à cena da cidade de São Paulo.', 'O funk de baile e os lançamentos colaborativos marcam seu som.', '“Faz Completo, Faz a Boa” é uma de suas faixas populares.'] },
      { nome: 'Oruam', genero: 'Trap/Rap', alias: ['oruam'], wiki: 'Oruam', foto: '', bio: 'Rapper carioca que se destacou na nova geração do trap e do rap brasileiro.', dicas: ['O artista é do Rio de Janeiro e começou a lançar músicas na internet.', 'Seu repertório aproxima trap, rap e melodias urbanas.', '“Diz Aí Qual é o Plano?” ajudou a ampliar seu alcance.'] },
      { nome: 'Filipe Ret', genero: 'Trap/Rap', alias: ['filipe ret', 'filiperet'], wiki: 'Filipe Ret', foto: '', bio: 'Rapper carioca com trajetória longa no rap nacional e presença na cena do trap.', dicas: ['Sua carreira começou nos circuitos de rap do Rio de Janeiro.', 'As letras reflexivas se unem a beats de rap e trap.', '“Good Vibe” é um dos sucessos de seu repertório.'] },
      { nome: 'Ludmilla', genero: 'Pop', alias: ['ludmilla', 'lud'], wiki: 'Ludmilla', foto: '', bio: 'Cantora e compositora fluminense que transita entre pop, funk, pagode e R&B.', dicas: ['A cantora iniciou a carreira publicando vídeos de música na internet.', 'Seu repertório atravessa funk, pop e o projeto de pagode Numanice.', '“Cheguei” é um de seus hits pop mais conhecidos.'] },
      { nome: 'L7NNON', genero: 'Trap/Rap', alias: ['l7nnon'], wiki: 'L7nnon', foto: '', bio: 'Rapper carioca que mistura rap e trap e alcançou grande público com faixas melódicas.', dicas: ['Antes da música, o artista também se dedicou ao skate.', 'Seu som passeia pelo rap, pelo trap e por melodias pop.', '“Freio da Blazer” virou um dos seus hits.'] },
      { nome: 'Djonga', genero: 'Trap/Rap', alias: ['djonga', 'djonga gomes'], wiki: 'Djonga', foto: '', bio: 'Rapper mineiro conhecido por letras contundentes e pela força de sua presença no rap.', dicas: ['O artista é de Belo Horizonte e tem raízes na cena local.', 'Seu rap aborda experiências sociais com escrita direta.', '“Leal” está entre as faixas marcantes de sua discografia.'] },
      { nome: 'Cabelinho', genero: 'Trap/Rap', alias: ['cabelinho', 'mc cabelinho', 'mccabelinho'], wiki: 'MC Cabelinho', foto: '', bio: 'Rapper e cantor carioca que cruza trap, funk e melodias de forte apelo popular.', dicas: ['O artista cresceu na zona sul do Rio de Janeiro.', 'Seu repertório aproxima o trap do funk e do rap melódico.', '“X1” é uma das faixas que o projetaram nacionalmente.'] },
      { nome: 'MC Tuto', genero: 'Funk', alias: ['mc tuto', 'mctuto'], wiki: 'MC Tuto', foto: '', bio: 'Cantor de funk paulista associado à nova geração de artistas da música de baile.', dicas: ['O artista faz parte da nova cena de funk de São Paulo.', 'Seu repertório é voltado ao funk de pista e aos ritmos dançantes.', '“Barbie” está entre suas canções populares.'] },
      { nome: 'MC PH', genero: 'Funk', alias: ['mc ph', 'mcph'], wiki: 'MC PH', foto: '', bio: 'Cantor paulista ligado ao funk de baile e às produções da cena urbana.', dicas: ['Sua música está conectada à cena dos bailes paulistanos.', 'O funk de pista e as batidas aceleradas marcam seu repertório.', '“Os Bico Tão Se Perguntando” é uma de suas faixas conhecidas.'] },
      { nome: 'Kyan', genero: 'Trap/Rap', alias: ['kyan', 'kyan mc'], wiki:'', foto: '', bio: 'Rapper de São Paulo que combina trap, grime e referências da cultura urbana.', dicas: ['O artista cresceu em Praia Grande, no litoral paulista.', 'Seu som mistura trap e grime com referências brasileiras.', '“Tropa da Inglaterra” é um dos seus sucessos.'] },
      { nome: 'Vulgo FK', genero: 'Trap/Rap', alias: ['vulgo fk', 'vulgofk'], wiki: '', foto: '', bio: 'Rapper paulista que ganhou projeção com o trap e as colaborações da cena urbana.', dicas: ['O artista é ligado à cena musical da zona sul de São Paulo.', 'Seu repertório combina trap melódico e referências de rua.', '“Ballena” ampliou seu alcance nas plataformas.'] },
      { nome: 'Emicida', genero: 'Trap/Rap', alias: ['emicida'], wiki: 'Emicida', foto: '', bio: 'Rapper e compositor paulistano, reconhecido pela escrita e por projetos que cruzam música e cultura.', dicas: ['Construiu sua trajetória nas batalhas de improviso de São Paulo.', 'Seu trabalho une rap, samba e outras referências da música brasileira.', '“AmarElo” dá nome a um de seus projetos mais conhecidos.'] },
      { nome: 'Jão', genero: 'Pop', alias: ['jao', 'jao cantor'], wiki: 'Jão (cantor)', foto: '', bio: 'Cantor e compositor paulista de pop, conhecido por álbuns conceituais e letras confessionais.', dicas: ['O cantor começou a compartilhar composições na internet.', 'Seus álbuns exploram narrativas e diferentes fases do pop.', '“Idiota” é um de seus grandes sucessos.'] },
      { nome: 'Luísa Sonza', genero: 'Pop', alias: ['luisa sonza', 'luisasonza', 'sonza'], wiki: 'Luísa Sonza', foto: '', bio: 'Cantora e compositora gaúcha que transita pelo pop, funk e música eletrônica.', dicas: ['A artista nasceu no interior do Rio Grande do Sul.', 'Seus projetos exploram pop, funk e sonoridades eletrônicas.', '“Anaconda” é um de seus hits de grande alcance.'] },
      { nome: 'Gloria Groove', genero: 'Pop', alias: ['gloria groove', 'gloriagroove', 'danyel'], wiki: 'Gloria Groove', foto: '', bio: 'Cantora, rapper e drag queen paulistana que cruza pop, rap, funk e R&B.', dicas: ['A artista também trabalhou como dubladora e cantora desde jovem.', 'Seu repertório mistura pop, rap e R&B com performances marcantes.', '“A Queda” virou um grande sucesso de sua carreira.'] },
      { nome: 'Liniker', genero: 'MPB', alias: ['liniker', 'liniker barros'], wiki: 'Liniker', foto: '', bio: 'Cantora e compositora paulista cuja música cruza MPB, soul e R&B.', dicas: ['A artista nasceu em Araraquara, no interior de São Paulo.', 'Sua sonoridade reúne MPB, soul e referências de música negra.', '“Zero” foi uma das primeiras canções a apresentar sua voz.'] },
      { nome: 'Marina Sena', genero: 'Pop', alias: ['marina sena', 'marinasena'], wiki: 'Marina Sena', foto: '', bio: 'Cantora mineira que combina pop brasileiro, ritmos dançantes e uma voz característica.', dicas: ['A artista é natural de Taiobeiras, no norte de Minas Gerais.', 'Seu pop mistura referências brasileiras e grooves dançantes.', '“Por Supuesto” se tornou seu primeiro grande hit solo.'] },
      { nome: 'Ivete Sangalo', genero: 'Pop', alias: ['ivete sangalo', 'ivetesangalo', 'ivete'], wiki: 'Ivete Sangalo', foto: '', bio: 'Cantora baiana de grande alcance popular, com carreira ligada ao axé e à música pop.', dicas: ['A cantora nasceu em Juazeiro, no interior da Bahia.', 'O axé e os shows de energia festiva marcam sua trajetória.', '“Sorte Grande” é um de seus hits mais cantados.'] },
      { nome: 'Pabllo Vittar', genero: 'Pop', alias: ['pabllo vittar', 'pabllovittar', 'pabllo'], wiki: 'Pabllo Vittar', foto: '', bio: 'Cantora e drag queen maranhense que alcançou projeção internacional com seu pop dançante.', dicas: ['A artista nasceu no Maranhão e iniciou a carreira em festas e vídeos.', 'Seu pop incorpora eletrônico, forró e ritmos brasileiros.', '“K.O.” foi um grande sucesso de sua carreira.'] },
      { nome: 'Jota Quest', genero: 'Rock', alias: ['jota quest', 'jotaquest'], wiki: 'Jota Quest', foto: '', bio: 'Banda mineira que mistura pop rock, funk e soul em canções de apelo radiofônico.', dicas: ['O grupo surgiu em Belo Horizonte na década de 1990.', 'Seu pop rock incorpora grooves de funk e referências de soul.', '“Dias Melhores” é um dos clássicos de seu repertório.'] },
      { nome: 'Planet Hemp', genero: 'Rock', alias: ['planet hemp', 'planethemp'], wiki: 'Planet Hemp', foto: '', bio: 'Banda carioca que combina rock, rap e reggae em uma sonoridade urbana e intensa.', dicas: ['O grupo nasceu no Rio de Janeiro e surgiu nos anos 1990.', 'A mistura de rock, rap e reggae define boa parte de seu som.', '“Mantenha o Respeito” está entre suas canções conhecidas.'] },
      { nome: 'Fresno', genero: 'Rock', alias: ['fresno', 'fresno banda'], wiki: 'Fresno (banda)', foto: '', bio: 'Banda gaúcha de rock que atravessou diferentes fases do emo ao pop alternativo.', dicas: ['O grupo começou sua trajetória em Porto Alegre.', 'Sua sonoridade evoluiu do emo para o rock alternativo e o pop.', '“Desde Quando Você Se Foi” é um de seus hits marcantes.'] },
      { nome: 'Lagum', genero: 'Indie', alias: ['lagum', 'lagum banda'], wiki: 'Lagum', foto: '', bio: 'Banda mineira que mistura pop rock, reggae e indie em canções leves e dançantes.', dicas: ['O grupo foi formado em Belo Horizonte.', 'Seu som combina pop rock com reggae e referências indie.', '“Deixa” é um dos sucessos mais conhecidos da banda.'] },
      { nome: 'Terno Rei', genero: 'Indie', alias: ['terno rei', 'ternorei'], wiki: 'Terno Rei', foto: '', bio: 'Banda paulistana de indie rock conhecida por guitarras atmosféricas e clima contemplativo.', dicas: ['O grupo se formou na cidade de São Paulo.', 'Seu indie rock explora guitarras atmosféricas e letras introspectivas.', '“Yoko” é uma das faixas mais conhecidas do grupo.'] },
      { nome: 'Grupo Menos É Mais', genero: 'Pagode', alias: ['grupo menos e mais', 'menos e mais', 'grupomenosemais', 'menosemais'], wiki: 'Menos é Mais', foto: '', bio: 'Grupo de pagode de Brasília que conquistou público com rodas de samba e regravações.', dicas: ['O grupo foi formado em Brasília.', 'As rodas de pagode e versões acústicas fazem parte de sua identidade.', '“Lapada Dela” está entre os seus sucessos.'] },
      { nome: 'Dilsinho', genero: 'Pagode', alias: ['dilsinho', 'dilson silva'], wiki: 'Dilsinho', foto: '', bio: 'Cantor e compositor fluminense de pagode romântico, com repertório de melodias marcantes.', dicas: ['O artista é de Ilha do Governador, no Rio de Janeiro.', 'Seu pagode combina romantismo e refrões pop.', '“Refém” é um dos grandes sucessos de sua carreira.'] },
      { nome: 'Sorriso Maroto', genero: 'Pagode', alias: ['sorriso maroto', 'sorrisomaroto'], wiki: 'Sorriso Maroto', foto: '', bio: 'Grupo carioca de pagode romântico com uma trajetória extensa na música popular brasileira.', dicas: ['A banda surgiu no bairro do Grajaú, no Rio de Janeiro.', 'O pagode romântico e os refrões de coro marcam sua identidade.', '“Assim Você Mata o Papai” é um de seus hits.'] },
      { nome: 'Péricles', genero: 'Pagode', alias: ['pericles', 'pericles cantor'], wiki: 'Péricles (cantor)', foto: '', bio: 'Cantor paulista de samba e pagode, conhecido pela voz potente e pelo repertório romântico.', dicas: ['O cantor nasceu em Santo André, na região do ABC paulista.', 'Sua trajetória reúne samba, pagode e canções românticas.', '“Até Que Durou” é um dos sucessos de sua fase solo.'] },
      { nome: 'Seu Jorge', genero: 'MPB', alias: ['seu jorge', 'seujorge'], wiki: 'Seu Jorge', foto: '', bio: 'Cantor, compositor e ator carioca que transita entre samba, MPB, soul e funk.', dicas: ['O artista é carioca e também construiu carreira como ator.', 'Seu som incorpora samba, MPB, soul e influências de funk.', '“Burguesinha” é uma de suas canções mais populares.'] },
      { nome: 'Vanessa da Mata', genero: 'MPB', alias: ['vanessa da mata', 'vanessadamata'], wiki: 'Vanessa da Mata', foto: '', bio: 'Cantora e compositora mato-grossense de MPB, conhecida por letras poéticas e melodias marcantes.', dicas: ['A artista nasceu em Alto Garças, no Mato Grosso.', 'Sua música passeia pela MPB, pelo pop e por ritmos brasileiros.', '“Boa Sorte / Good Luck” está entre seus maiores sucessos.'] },
      { nome: 'Luedji Luna', genero: 'MPB', alias: ['luedji luna', 'luedjiluna'], wiki: 'Luedji Luna', foto: '', bio: 'Cantora e compositora baiana que une MPB, jazz e referências da música afro-brasileira.', dicas: ['A artista nasceu em Salvador e tem formação musical ligada à cidade.', 'Seu trabalho cruza MPB, jazz e sonoridades afro-brasileiras.', '“Banho de Folhas” é uma de suas canções mais conhecidas.'] },
      { nome: 'Rachel Reis', genero: 'MPB', alias: ['rachel reis', 'rachelreis'], wiki: 'Rachel Reis', foto: '', bio: 'Cantora e compositora baiana que combina pop contemporâneo e ritmos da música brasileira.', dicas: ['A artista é de Feira de Santana, no interior da Bahia.', 'Seu som aproxima pop, MPB e ritmos ligados à sua origem.', '“Maresia” ajudou a apresentar sua música ao país.'] },
      { nome: 'Anitta', genero: 'Pop', alias: ['anitta'], wiki: 'Anitta', foto: '', bio: 'Cantora e compositora carioca que transita entre pop, funk e música latina.', dicas: ['A artista nasceu e começou a carreira no Rio de Janeiro.', 'Seu repertório atravessa funk, pop e ritmos latinos.', '“Envolver” alcançou grande destaque internacional.'] },
      { nome: 'Thiaguinho', genero: 'Pagode', alias: ['thiaguinho', 'thiago andre'], wiki: 'Thiaguinho', foto: '', bio: 'Cantor e compositor paulista de pagode, com carreira solo marcada por energia e romantismo.', dicas: ['O cantor nasceu em Presidente Prudente, no interior paulista.', 'Seu pagode combina balanço, romantismo e performance de palco.', '“Ousadia & Alegria” é uma de suas músicas conhecidas.'] },
      { nome: 'Pitty', genero: 'Rock', alias: ['pitty', 'pitty rock'], wiki: 'Pitty', foto: '', bio: 'Cantora e compositora baiana que se tornou uma das principais vozes do rock brasileiro.', dicas: ['A artista nasceu em Salvador e começou a tocar em bandas locais.', 'Seu rock alternativo combina guitarras marcantes e letras diretas.', '“Admirável Chip Novo” é um dos seus grandes sucessos.'] }
    ];

    // ÁUDIO
    let audioContext = null;
    let masterGain = null;
    let somAtivo = true;

    function iniciarAudio() {
      try {
        if (!audioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          audioContext = new AudioContextClass();
          masterGain = audioContext.createGain();
          masterGain.gain.value = 0.25;
          masterGain.connect(audioContext.destination);
        }
        if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      } catch (_) {
        audioContext = null;
        masterGain = null;
      }
    }

    function tocarNota(frequencia, duracao, tipo = 'square', inicio = 0, queda = false) {
      try {
        if (!somAtivo || !audioContext || !masterGain) return;
        const agora = audioContext.currentTime + inicio;
        const osc = audioContext.createOscillator();
        const ganho = audioContext.createGain();
        osc.type = tipo;
        osc.frequency.setValueAtTime(frequencia, agora);
        if (queda) osc.frequency.exponentialRampToValueAtTime(40, agora + 0.45);
        ganho.gain.setValueAtTime(0.0001, agora);
        ganho.gain.exponentialRampToValueAtTime(0.65, agora + 0.012);
        ganho.gain.exponentialRampToValueAtTime(0.0001, agora + duracao);
        osc.connect(ganho);
        ganho.connect(masterGain);
        osc.start(agora);
        osc.stop(agora + duracao + 0.02);
        osc.onended = () => { osc.disconnect(); ganho.disconnect(); };
      } catch (_) {}
    }

    function tocarClique() { tocarNota(880, 0.05); }
    function tocarErro() { tocarNota(150, 0.6, 'sine', 0, true); }
    function tocarAcerto() {
      [523, 659, 784, 1047].forEach((nota, i) => tocarNota(nota, 0.08, 'square', i * 0.085));
    }
    function tocarFim() {
      [523, 659, 784, 1047, 784, 1047].forEach((nota, i) => tocarNota(nota, 0.16, 'square', i * 0.13));
    }

    // UTILITÁRIOS
    function normalizar(s) {
      return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/&/g, ' e ').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    }

    function paginaWikipediaCorrespondeAoArtista(titulo, artista) {
      const tituloNormalizado = normalizar(titulo);
      const nomeNormalizado = normalizar(artista?.nome || '');
      if (!tituloNormalizado || !nomeNormalizado) return false;
      return tituloNormalizado.includes(nomeNormalizado) || nomeNormalizado.includes(tituloNormalizado);
    }

    function colapsarLetrasRepetidas(texto) {
      return texto.replace(/([a-z])\1+/g, '$1');
    }

    function distanciaLevenshtein(a, b) {
      let anterior = Array.from({ length: b.length + 1 }, (_, indice) => indice);
      for (let i = 1; i <= a.length; i++) {
        const atual = [i];
        for (let j = 1; j <= b.length; j++) {
          atual[j] = Math.min(
            atual[j - 1] + 1,
            anterior[j] + 1,
            anterior[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
          );
        }
        anterior = atual;
      }
      return anterior[b.length];
    }

    function limiteEdicao(candidato) {
      if (candidato.length <= 4) return 0;
      if (candidato.length <= 7) return 1;
      return 2;
    }

    function candidatosArtista(artista) {
      return [...new Set([artista.nome, ...artista.alias]
        .map(valor => colapsarLetrasRepetidas(normalizar(valor))))];
    }

    function palpiteAcertaArtista(palpite, artistaAtual) {
      const entrada = colapsarLetrasRepetidas(normalizar(palpite));
      const candidatosAtuais = candidatosArtista(artistaAtual);
      if (candidatosAtuais.includes(entrada)) return true;

      const outrosArtistas = ARTISTAS.filter(artista => artista !== artistaAtual);
      const candidatosOutros = outrosArtistas.flatMap(artista =>
        candidatosArtista(artista).map(candidato => ({ artista, candidato }))
      );
      if (candidatosOutros.some(({ candidato }) => candidato === entrada)) return false;

      const atualDentroDaTolerancia = candidatosAtuais.some(candidato =>
        distanciaLevenshtein(entrada, candidato) <= limiteEdicao(candidato)
      );
      if (!atualDentroDaTolerancia) return false;

      const outroDentroDaTolerancia = candidatosOutros.some(({ candidato }) =>
        distanciaLevenshtein(entrada, candidato) <= limiteEdicao(candidato)
      );
      return !outroDentroDaTolerancia;
    }

    function escaparHTML(texto) {
      return String(texto).replace(/[&<>"']/g, caractere => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[caractere]);
    }

    const cacheFotos = new Map();
    const statusFotos = new Map();
    const detalhesFotos = new Map();
    const filaFotos = [];
    let fotosEmAndamento = 0;
    const MAX_FOTOS_SIMULTANEAS = 5;

    function executarComLimiteFoto(tarefa) {
      return new Promise((resolve, reject) => {
        const executar = () => {
          fotosEmAndamento++;
          Promise.resolve()
            .then(tarefa)
            .then(resolve, reject)
            .finally(() => {
              fotosEmAndamento--;
              const proxima = filaFotos.shift();
              if (proxima) proxima();
            });
        };
        if (fotosEmAndamento < MAX_FOTOS_SIMULTANEAS) executar();
        else filaFotos.push(executar);
      });
    }

    function carregarImagem(url, signal) {
      return new Promise((resolve, reject) => {
        const imagem = new Image();
        let concluido = false;
        const finalizar = (fn, valor) => {
          if (concluido) return;
          concluido = true;
          clearTimeout(timer);
          if (signal) signal.removeEventListener('abort', abortar);
          fn(valor);
        };
        const abortar = () => {
          imagem.src = '';
          finalizar(reject, new Error('Tempo limite ao carregar imagem'));
        };
        const timer = setTimeout(abortar, FOTO_TIMEOUT_MS);
        if (signal) {
          if (signal.aborted) return abortar();
          signal.addEventListener('abort', abortar, { once: true });
        }
        imagem.onload = () => finalizar(resolve, url);
        imagem.onerror = () => finalizar(reject, new Error('Imagem indisponível'));
        imagem.referrerPolicy = 'no-referrer';
        imagem.src = url;
      });
    }

    async function buscarFotoWikipedia(artista, urlApi, etapa) {
      const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: `${artista.nome} cantor`,
        gsrlimit: '1',
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: '600',
        format: 'json',
        origin: '*'
      });
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FOTO_TIMEOUT_MS);
      try {
        const resposta = await fetch(`${urlApi}?${params.toString()}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });
        if (!resposta.ok) return { motivo: 'sem resultado', etapa, titulo: '' };
        const dados = await resposta.json();
        const paginas = Object.values(dados?.query?.pages || {});
        const pagina = paginas[0];
        if (!pagina) return { motivo: 'sem resultado', etapa, titulo: '' };
        const titulo = pagina.title || '';
        const thumbnail = pagina.thumbnail && pagina.thumbnail.source ? pagina.thumbnail.source : '';
        if (!thumbnail) return { motivo: 'sem foto no artigo', etapa, titulo };
        if (!paginaWikipediaCorrespondeAoArtista(titulo, artista)) {
          return { motivo: 'sem resultado', etapa, titulo };
        }
        return { url: thumbnail, titulo, etapa };
      } catch (_) {
        return { motivo: 'sem resultado', etapa, titulo: '' };
      } finally {
        clearTimeout(timeout);
      }
    }

    function gerarPlaceholder(marca = '?') {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><rect width="480" height="480" fill="#7B2CFF"/><path d="M0 0h240v240H0zM240 240h240v240H240z" fill="#00E5FF"/><circle cx="240" cy="170" r="72" fill="#FFE600" stroke="#000" stroke-width="12"/><path d="M92 440c12-108 70-160 148-160s136 52 148 160" fill="#FF2E93" stroke="#000" stroke-width="12"/><text x="240" y="215" text-anchor="middle" font-family="monospace" font-size="${marca.length > 1 ? 76 : 110}" font-weight="bold" fill="#000">${marca}</text></svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    const FOTO_PLACEHOLDER = gerarPlaceholder();
    const BARALHO_STORAGE_KEY = 'blurme_baralho';
    const cacheImagensCanvas = new Map();

    function obterImagemCanvas(url) {
      const destino = url || FOTO_PLACEHOLDER;
      let imagem = cacheImagensCanvas.get(destino);
      if (!imagem) {
        imagem = new Image();
        imagem.decoding = 'async';
        imagem.referrerPolicy = 'no-referrer';
        imagem.src = destino;
        cacheImagensCanvas.set(destino, imagem);
      }
      return imagem;
    }

    function prepararCanvasFoto() {
      const canvas = el.artistCanvas;
      if (!canvas) return;
      const retangulo = el.photoFrame.getBoundingClientRect();
      const escala = Math.min(window.devicePixelRatio || 1, 2);
      const largura = Math.max(1, Math.round(retangulo.width * escala));
      const altura = Math.max(1, Math.round(retangulo.height * escala));
      if (canvas.width !== largura || canvas.height !== altura) {
        canvas.width = largura;
        canvas.height = altura;
      }
      canvas.style.width = `${retangulo.width}px`;
      canvas.style.height = `${retangulo.height}px`;
    }

    function desenharFotoCanvas(url, blurPx = 0, instantaneo = false) {
      const canvas = el.artistCanvas;
      const contexto = canvas && canvas.getContext('2d');
      if (!canvas || !contexto) return;
      prepararCanvasFoto();
      const imagem = obterImagemCanvas(url || FOTO_PLACEHOLDER);
      const pintar = () => {
        const largura = canvas.width;
        const altura = canvas.height;
        contexto.clearRect(0, 0, largura, altura);
        contexto.imageSmoothingEnabled = true;
        if (!imagem || (!imagem.complete && !imagem.naturalWidth)) return;
        const escala = Math.max(largura / imagem.naturalWidth, altura / imagem.naturalHeight);
        const drawWidth = imagem.naturalWidth * escala;
        const drawHeight = imagem.naturalHeight * escala;
        const x = (largura - drawWidth) / 2;
        const y = (altura - drawHeight) / 2;
        if ('filter' in contexto && !instantaneo) {
          contexto.filter = `blur(${blurPx}px) contrast(120%)`;
          contexto.drawImage(imagem, x, y, drawWidth, drawHeight);
          contexto.filter = 'none';
          return;
        }
        const mini = document.createElement('canvas');
        const miniLadoX = Math.max(8, Math.round(largura / Math.max(blurPx * 0.8, 1))); 
        const miniLadoY = Math.max(8, Math.round(altura / Math.max(blurPx * 0.8, 1))); 
        mini.width = miniLadoX;
        mini.height = miniLadoY;
        const miniCtx = mini.getContext('2d');
        if (!miniCtx) return;
        miniCtx.clearRect(0, 0, mini.width, mini.height);
        miniCtx.imageSmoothingEnabled = true;
        miniCtx.drawImage(imagem, 0, 0, mini.width, mini.height);
        contexto.clearRect(0, 0, largura, altura);
        contexto.drawImage(mini, 0, 0, largura, altura);
      };
      if (imagem.complete) pintar();
      else imagem.addEventListener('load', pintar, { once: true });
    }

    function lerBaralhoSalvo() {
      try {
        const salvo = localStorage.getItem(BARALHO_STORAGE_KEY);
        if (!salvo) return [];
        const nomes = JSON.parse(salvo);
        if (!Array.isArray(nomes)) return [];
        const porNome = new Map(ARTISTAS.map(artista => [artista.nome, artista]));
        return nomes.map(nome => porNome.get(nome)).filter(Boolean);
      } catch (_) {
        return [];
      }
    }

    function salvarBaralho() {
      try {
        const nomes = estado.baralho.map(artista => artista.nome);
        localStorage.setItem(BARALHO_STORAGE_KEY, JSON.stringify(nomes));
      } catch (_) {}
      try {
        window.dispatchEvent(new CustomEvent('blurme:baralho', { detail: estado.baralho.length }));
      } catch (_) {}
    }

    function sortearArtistasPartida() {
      let baralho = estado.baralho.length ? estado.baralho.slice() : embaralhar(ARTISTAS.slice());
      const partida = [];
      while (partida.length < RODADAS && baralho.length) {
        partida.push(baralho.shift());
      }
      if (partida.length < RODADAS) {
        const extras = embaralhar(ARTISTAS.filter(artista => !partida.includes(artista) && !baralho.includes(artista)));
        for (const artista of extras) {
          if (partida.length >= RODADAS) break;
          partida.push(artista);
        }
      }
      if (partida.length < RODADAS) {
        const suplentes = embaralhar(ARTISTAS.filter(artista => !partida.includes(artista)));
        for (const artista of suplentes) {
          if (partida.length >= RODADAS) break;
          partida.push(artista);
        }
      }

      let partidaFinal = partida.slice();
      let tentativas = 0;
      while (tentativas < 20 && partidaFinal.length === RODADAS) {
        const contagens = new Map();
        let valido = true;
        for (const artista of partidaFinal) {
          contagens.set(artista.genero, (contagens.get(artista.genero) || 0) + 1);
          if ((contagens.get(artista.genero) || 0) > 2) {
            valido = false;
            break;
          }
        }
        if (valido) break;
        partidaFinal = embaralhar(partida.slice());
        tentativas++;
      }

      const restante = baralho.filter(artista => !partidaFinal.includes(artista));
      estado.baralho = restante.length ? embaralhar(restante) : embaralhar(ARTISTAS.slice());
      salvarBaralho();
      return partidaFinal.slice(0, RODADAS);
    }

    async function resolverFoto(artista) {
      if (cacheFotos.has(artista)) return cacheFotos.get(artista);
      const promessa = executarComLimiteFoto(async () => {
        const registrarDetalhe = (status, titulo = '', thumbnail = '') => {
          statusFotos.set(artista, status);
          detalhesFotos.set(artista, { status, titulo, thumbnail });
        };

        if (artista.foto) {
          try {
            const url = await carregarImagem(artista.foto);
            registrarDetalhe('FOTO', artista.nome, url);
            return url;
          } catch (_) {}
        }

        let ultimoMotivo = artista.wiki ? '404' : 'wiki vazio';
        if (artista.wiki) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), FOTO_TIMEOUT_MS);
          try {
            const resposta = await fetch(API_WIKI + encodeURIComponent(artista.wiki), {
              signal: controller.signal,
              headers: { Accept: 'application/json' }
            });
            if (resposta.ok) {
              const dados = await resposta.json();
              const url = dados.type === 'standard' && dados.thumbnail && dados.thumbnail.source
                ? dados.thumbnail.source : '';
              const titulo = dados.title || artista.nome;
              if (url) {
                try {
                  const imagemCarregada = await carregarImagem(url);
                  registrarDetalhe('WIKI', titulo, url);
                  return imagemCarregada;
                } catch (_) {
                  ultimoMotivo = 'sem foto no artigo';
                }
              } else {
                ultimoMotivo = 'sem foto no artigo';
              }
            } else {
              ultimoMotivo = '404';
            }
          } catch (_) {
            ultimoMotivo = '404';
          } finally {
            clearTimeout(timeout);
          }
        }

        const buscas = [
          { url: API_WIKI_SEARCH_PT, etapa: 'BUSCA PT' },
          { url: API_WIKI_SEARCH_EN, etapa: 'BUSCA EN' }
        ];

        for (const busca of buscas) {
          const resultado = await buscarFotoWikipedia(artista, busca.url, busca.etapa);
          if (resultado && resultado.url) {
            try {
              const imagemCarregada = await carregarImagem(resultado.url);
              registrarDetalhe(busca.etapa, resultado.titulo, resultado.url);
              return imagemCarregada;
            } catch (_) {
              ultimoMotivo = 'sem foto no artigo';
            }
          }
          if (resultado && resultado.motivo) {
            ultimoMotivo = resultado.motivo;
          }
        }

        registrarDetalhe(ultimoMotivo || 'sem resultado', '', '');
        return FOTO_PLACEHOLDER;
      });
      cacheFotos.set(artista, promessa);
      return promessa;
    }

    function obterIniciais(nome) {
      return nome.split(/\s+/).filter(Boolean).slice(0, 2)
        .map(parte => Array.from(parte)[0]).join('').toUpperCase();
    }

    function embaralhar(lista) {
      const copia = lista.slice();
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
      return copia;
    }

    function contemAlias(texto, alias) {
      const normalTexto = normalizar(texto);
      const normalAlias = normalizar(alias);
      if (!normalAlias) return false;
      return (` ${normalTexto} `).includes(` ${normalAlias} `);
    }

    // ESTADO
    const estado = {
      tela: 'INICIO',
      artistasPartida: [],
      indice: 0,
      erros: 0,
      tentativas: new Set(),
      pontos: 0,
      resultados: [],
      timer: null,
      fotoToken: 0,
      fotoUrl: FOTO_PLACEHOLDER,
      baralho: (() => {
        const salvo = lerBaralhoSalvo();
        return salvo.length ? salvo : embaralhar(ARTISTAS.slice());
      })(),
      blurAtual: 0,
      blurAlvo: 0,
      rafBlur: null
    };

    // RENDER
    const el = {
      startScreen: document.getElementById('startScreen'),
      gameScreen: document.getElementById('gameScreen'),
      finalScreen: document.getElementById('finalScreen'),
      roundBadge: document.getElementById('roundBadge'),
      artistCanvas: document.getElementById('artistCanvas'),
      photoFrame: document.getElementById('photoFrame'),
      artistBio: document.getElementById('artistBio'),
      clueOne: document.getElementById('clueOne'),
      clueTwoSlot: document.getElementById('clueTwoSlot'),
      clueThreeSlot: document.getElementById('clueThreeSlot'),
      guessForm: document.getElementById('guessForm'),
      guessInput: document.getElementById('guessInput'),
      guessButton: document.getElementById('guessButton'),
      feedback: document.getElementById('feedback'),
      livesDisplay: document.getElementById('livesDisplay'),
      scoreDisplay: document.getElementById('scoreDisplay'),
      roundResult: document.getElementById('roundResult'),
      resultsBody: document.getElementById('resultsBody'),
      finalScore: document.getElementById('finalScore'),
      finalMessage: document.getElementById('finalMessage'),
      muteButton: document.getElementById('muteButton')
    };

    function definirTela(tela) {
      estado.tela = tela;
      el.startScreen.hidden = tela !== 'INICIO';
      el.gameScreen.hidden = tela !== 'JOGANDO' && tela !== 'TRANSICAO';
      el.finalScreen.hidden = tela !== 'FINAL';
    }

    function atualizarStatus() {
      el.livesDisplay.textContent = 'VIDAS: ' + Array.from({ length: MAX_ERROS }, (_, i) => i < MAX_ERROS - estado.erros ? '♥' : '♡').join(' ');
      el.scoreDisplay.textContent = 'PLACAR: ' + estado.pontos;
      el.roundBadge.textContent = `RODADA ${estado.indice + 1}/${RODADAS}`;
    }

    function liberarDica(slot, texto, titulo) {
      slot.classList.remove('locked');
      slot.innerHTML = `<h3>${titulo}</h3><p>${escaparHTML(texto)}</p>`;
    }

    function definirBlur(valor, instantaneo = false) {
      const alvo = Number.isFinite(valor) ? valor : 0;
      estado.blurAlvo = alvo;
      if (estado.rafBlur !== null) cancelAnimationFrame(estado.rafBlur);
      if (instantaneo) {
        estado.blurAtual = alvo;
        estado.rafBlur = null;
        desenharFotoCanvas(estado.fotoUrl || FOTO_PLACEHOLDER, alvo, true);
        return;
      }
      const inicio = performance.now();
      const origem = Number.isFinite(estado.blurAtual) ? estado.blurAtual : alvo;
      const duracao = 400;
      const animar = tempo => {
        const progresso = Math.min((tempo - inicio) / duracao, 1);
        estado.blurAtual = origem + (alvo - origem) * progresso;
        desenharFotoCanvas(estado.fotoUrl || FOTO_PLACEHOLDER, estado.blurAtual, false);
        if (progresso < 1) {
          estado.rafBlur = requestAnimationFrame(animar);
        } else {
          estado.rafBlur = null;
        }
      };
      estado.rafBlur = requestAnimationFrame(animar);
    }

    function atualizarFoto(artista) {
      const token = ++estado.fotoToken;
      estado.fotoUrl = FOTO_PLACEHOLDER;
      estado.blurAtual = BLUR_PX[estado.erros];
      estado.blurAlvo = estado.blurAtual;
      desenharFotoCanvas(estado.fotoUrl, estado.blurAtual, true);
      resolverFoto(artista).then(url => {
        if (token === estado.fotoToken && (estado.tela === 'JOGANDO' || estado.tela === 'TRANSICAO')) {
          estado.fotoUrl = url || FOTO_PLACEHOLDER;
          desenharFotoCanvas(estado.fotoUrl, estado.blurAtual, true);
        }
      });
      const proxima = estado.artistasPartida[estado.indice + 1];
      if (proxima) resolverFoto(proxima);
    }

    function renderizarRodada() {
      const artista = estado.artistasPartida[estado.indice];
      estado.erros = 0;
      estado.tentativas = new Set();
      definirTela('JOGANDO');
      el.artistBio.textContent = artista.bio;
      el.clueOne.textContent = artista.dicas[0];
      el.clueTwoSlot.className = 'paper locked';
      el.clueTwoSlot.textContent = '▒▒▒ DICA 2 BLOQUEADA ▒▒▒';
      el.clueThreeSlot.className = 'paper locked';
      el.clueThreeSlot.textContent = '▒▒▒ DICA 3 BLOQUEADA ▒▒▒';
      el.feedback.textContent = '';
      el.roundResult.hidden = true;
      el.roundResult.className = 'result-banner';
      el.guessInput.disabled = false;
      el.guessButton.disabled = false;
      el.guessInput.value = '';
      atualizarStatus();
      atualizarFoto(artista);
      el.guessInput.focus({ preventScroll: true });
    }

    function mostrarFinal() {
      definirTela('FINAL');
      el.resultsBody.innerHTML = estado.resultados.map((resultado, i) =>
        `<tr><td>${i + 1}</td><td>${escaparHTML(resultado.nome)}</td><td>${resultado.acertou ? '✔' : '✘'}</td><td>${resultado.pontos}</td></tr>`
      ).join('');
      el.finalScore.textContent = `TOTAL: ${estado.pontos}/15`;
      const total = estado.pontos;
      el.finalMessage.textContent = total <= 4
        ? '★ BOM COMEÇO! MAIS UMA PARTIDA E VOCÊ VAI RECONHECER TODO MUNDO.'
        : total <= 9
          ? '✦ VOCÊ ESTÁ PEGANDO O JEITO. A PRÓXIMA RODADA PROMETE!'
          : total <= 13
            ? '☺ MANDOU BEM! SEU RADAR MUSICAL ESTÁ AFIADO.'
            : '★ QUASE PERFEITO! VOCÊ É UMA ENCICLOPÉDIA DA MÚSICA BRASILEIRA!';
      tocarFim();
    }

    // LÓGICA
    function iniciarPartida() {
      if (estado.timer !== null) clearTimeout(estado.timer);
      estado.timer = null;
      estado.fotoToken++;
      if (!estado.baralho.length) estado.baralho = embaralhar(ARTISTAS.slice());
      estado.artistasPartida = sortearArtistasPartida();
      estado.indice = 0;
      estado.erros = 0;
      estado.tentativas = new Set();
      estado.pontos = 0;
      estado.resultados = [];
      renderizarRodada();
    }

    function revelar(artista, acertou, pontos, mensagem) {
      estado.tela = 'TRANSICAO';
      el.guessInput.disabled = true;
      el.guessButton.disabled = true;
      if (estado.fotoUrl === FOTO_PLACEHOLDER) {
        estado.fotoUrl = gerarPlaceholder(obterIniciais(artista.nome));
      }
      desenharFotoCanvas(estado.fotoUrl, 0, true);
      definirBlur(0, true);
      el.roundResult.hidden = false;
      el.roundResult.className = `result-banner ${acertou ? 'win' : 'loss'}`;
      el.roundResult.innerHTML = `<p>${escaparHTML(mensagem)}</p><p>${escaparHTML(artista.nome)} — ${escaparHTML(artista.genero)}</p><p>+${pontos} PONTOS</p>`;
      estado.resultados.push({ nome: artista.nome, acertou, pontos });
      atualizarStatus();
      estado.timer = setTimeout(() => {
        estado.timer = null;
        estado.indice++;
        if (estado.indice >= RODADAS) mostrarFinal();
        else renderizarRodada();
      }, acertou ? DELAY_ACERTO_MS : DELAY_DERROTA_MS);
    }

    function enviarPalpite() {
      if (estado.tela !== 'JOGANDO') return;
      const palpite = normalizar(el.guessInput.value);
      el.feedback.textContent = '';
      if (!palpite) {
        el.feedback.textContent = 'DIGITE UM PALPITE PRIMEIRO!';
        el.guessInput.classList.remove('shake-lite');
        void el.guessInput.offsetWidth;
        el.guessInput.classList.add('shake-lite');
        el.guessInput.focus();
        return;
      }
      if (estado.tentativas.has(palpite)) {
        el.feedback.textContent = 'JÁ TENTOU ISSO!';
        el.guessInput.classList.remove('shake-lite');
        void el.guessInput.offsetWidth;
        el.guessInput.classList.add('shake-lite');
        el.guessInput.value = '';
        el.guessInput.focus();
        return;
      }

      estado.tentativas.add(palpite);
      const artista = estado.artistasPartida[estado.indice];
      const acertou = palpiteAcertaArtista(palpite, artista);
      tocarClique();
      if (acertou) {
        const pontos = Math.max(1, MAX_ERROS - estado.erros);
        estado.pontos += pontos;
        tocarAcerto();
        revelar(artista, true, pontos, 'ACERTOU!');
        return;
      }

      estado.erros++;
      tocarErro();
      definirBlur(BLUR_PX[estado.erros]);
      el.photoFrame.classList.remove('shake');
      void el.photoFrame.offsetWidth;
      el.photoFrame.classList.add('shake');
      if (estado.erros === 1) liberarDica(el.clueTwoSlot, artista.dicas[1], 'DICA 2');
      if (estado.erros === 2) liberarDica(el.clueThreeSlot, artista.dicas[2], 'DICA 3');
      el.guessInput.value = '';
      atualizarStatus();
      if (estado.erros >= MAX_ERROS) {
        revelar(artista, false, 0, 'FIM DAS TENTATIVAS!');
        return;
      }
      el.feedback.textContent = 'NÃO FOI DESSA VEZ — TENTE DE NOVO!';
      el.guessInput.focus();
    }

    function validarBanco() {
      const avisar = mensagem => console.warn('[BLUR ME] ' + mensagem);
      if (ARTISTAS.length !== 50) avisar(`Total de artistas diferente de 50: ${ARTISTAS.length}.`);
      const vistos = new Set();
      ARTISTAS.forEach((artista, indice) => {
        if (!Array.isArray(artista.dicas) || artista.dicas.length !== 3) {
          avisar(`Artista ${indice + 1}: dicas devem conter exatamente 3 itens.`);
        }
        for (const alias of artista.alias) {
          const chave = normalizar(alias);
          if (vistos.has(chave)) avisar(`Alias duplicado: "${alias}".`);
          vistos.add(chave);
        }
        const textos = [artista.bio, ...(artista.dicas || [])];
        const identificadores = [artista.nome, ...artista.alias];
        for (const texto of textos) {
          for (const identificador of identificadores) {
            if (contemAlias(texto, identificador)) {
              avisar(`Possível vazamento em "${artista.nome}": "${identificador}".`);
              break;
            }
          }
        }
      });
    }

    // INIT
    document.getElementById('startButton').addEventListener('click', () => {
      iniciarAudio();
      tocarClique();
      iniciarPartida();
    });

    el.guessForm.addEventListener('submit', evento => {
      evento.preventDefault();
      enviarPalpite();
    });

    el.photoFrame.addEventListener('contextmenu', evento => evento.preventDefault());
    el.photoFrame.addEventListener('dragstart', evento => evento.preventDefault());

    document.getElementById('againButton').addEventListener('click', () => {
      iniciarAudio();
      tocarClique();
      iniciarPartida();
    });

    el.muteButton.addEventListener('click', () => {
      iniciarAudio();
      somAtivo = !somAtivo;
      el.muteButton.textContent = somAtivo ? '🔊' : '🔇';
      el.muteButton.setAttribute('aria-label', somAtivo ? 'Desativar som' : 'Ativar som');
      el.muteButton.setAttribute('aria-pressed', String(!somAtivo));
      if (somAtivo) tocarClique();
    });

    function iniciarDiagnosticoFotos() {
      if (new URLSearchParams(window.location.search).get('debug') !== '1') return;

      const painel = document.createElement('section');
      painel.className = 'photo-diagnostics';
      painel.setAttribute('aria-labelledby', 'photoDiagnosticsTitle');
      const titulo = document.createElement('h2');
      titulo.id = 'photoDiagnosticsTitle';
      titulo.textContent = 'DIAGNÓSTICO DE FOTOS';
      const descricao = document.createElement('p');
      descricao.textContent = 'TESTE DE ATÉ 5 ARTISTAS POR VEZ.';
      const lista = document.createElement('ul');
      const linhas = new Map();

      ARTISTAS.forEach(artista => {
        const linha = document.createElement('li');
        const nome = document.createElement('span');
        nome.textContent = artista.nome;

        const meta = document.createElement('div');
        meta.className = 'photo-diagnostics-meta';

        const status = document.createElement('span');
        status.textContent = 'AGUARDANDO';
        status.setAttribute('aria-label', 'Status da foto');

        const miniatura = document.createElement('img');
        miniatura.alt = `Miniatura de ${artista.nome}`;
        miniatura.width = 40;
        miniatura.height = 40;
        miniatura.style.display = 'none';

        const tituloPagina = document.createElement('small');
        tituloPagina.className = 'photo-diagnostics-title';
        tituloPagina.textContent = '';

        linha.append(nome, meta);
        meta.append(status, miniatura, tituloPagina);
        lista.append(linha);
        linhas.set(artista, { linha, status, miniatura, tituloPagina });
      });

      const infoBaralho = document.createElement('div');
      infoBaralho.className = 'photo-diagnostics-baralho';
      const contadorBaralho = document.createElement('strong');
      contadorBaralho.textContent = `ARTISTAS RESTANTES NO BARALHO: ${estado.baralho.length}`;
      const botaoReset = document.createElement('button');
      botaoReset.type = 'button';
      botaoReset.className = 'action-button';
      botaoReset.textContent = 'REINICIAR BARALHO';
      botaoReset.addEventListener('click', () => {
        estado.baralho = embaralhar(ARTISTAS.slice());
        salvarBaralho();
        contadorBaralho.textContent = `ARTISTAS RESTANTES NO BARALHO: ${estado.baralho.length}`;
      });
      infoBaralho.append(contadorBaralho, botaoReset);
      painel.append(titulo, descricao, lista, infoBaralho);
      document.querySelector('.app').insertAdjacentElement('afterend', painel);

      const atualizarContadorBaralho = () => {
        contadorBaralho.textContent = `ARTISTAS RESTANTES NO BARALHO: ${estado.baralho.length}`;
      };
      window.addEventListener('blurme:baralho', atualizarContadorBaralho);

      const atualizarLinhaDiagnostico = artista => {
        const linha = linhas.get(artista);
        if (!linha) return;
        const detalhe = detalhesFotos.get(artista) || { status: statusFotos.get(artista) || 'AGUARDANDO', titulo: '', thumbnail: '' };
        linha.status.textContent = detalhe.status || 'AGUARDANDO';
        linha.tituloPagina.textContent = detalhe.titulo || '';
        if (detalhe.thumbnail) {
          linha.miniatura.src = detalhe.thumbnail;
          linha.miniatura.style.display = 'block';
        } else {
          linha.miniatura.removeAttribute('src');
          linha.miniatura.style.display = 'none';
        }
        linha.linha.dataset.status = detalhe.status || 'AGUARDANDO';
      };

      let proxima = 0;
      const trabalhadores = Array.from(
        { length: Math.min(MAX_FOTOS_SIMULTANEAS, ARTISTAS.length) },
        async () => {
          while (proxima < ARTISTAS.length) {
            const artista = ARTISTAS[proxima++];
            const linha = linhas.get(artista);
            if (linha) {
              linha.status.textContent = 'TESTANDO...';
              linha.tituloPagina.textContent = '';
              linha.miniatura.removeAttribute('src');
              linha.miniatura.style.display = 'none';
            }
            await resolverFoto(artista);
            atualizarLinhaDiagnostico(artista);
          }
        }
      );
      Promise.all(trabalhadores).catch(erro => {
        console.error('[BLUR ME] Falha no diagnóstico de fotos.', erro);
      });
    }

    function iniciarRastroMouse() {
      const canvas = document.getElementById('mouseTrail');
      const contexto = canvas.getContext('2d');
      const suportePonteiro = window.matchMedia('(hover: hover) and (pointer: fine)');
      const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
      const particulas = [];
      const cores = ['#FF2E93', '#00E5FF', '#FFE600'];
      let quadro = null;
      let inicioPausa = null;
      let escala = 1;

      if (!contexto || !suportePonteiro.matches || movimentoReduzido.matches) return;

      function redimensionarCanvas() {
        escala = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * escala);
        canvas.height = Math.round(window.innerHeight * escala);
        contexto.setTransform(escala, 0, 0, escala, 0, 0);
      }

      function desenhar(agora) {
        quadro = null;
        if (document.hidden) return;
        contexto.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = particulas.length - 1; i >= 0; i--) {
          const particula = particulas[i];
          const progresso = (agora - particula.criadaEm) / 400;
          if (progresso >= 1) {
            particulas.splice(i, 1);
            continue;
          }
          contexto.globalAlpha = 1 - progresso;
          contexto.fillStyle = particula.cor;
          contexto.fillRect(particula.x - 3, particula.y - 3, 6, 6);
        }
        contexto.globalAlpha = 1;
        if (particulas.length) quadro = requestAnimationFrame(desenhar);
      }

      function agendarDesenho() {
        if (quadro === null && !document.hidden) quadro = requestAnimationFrame(desenhar);
      }

      function moverPonteiro(evento) {
        particulas.push({
          x: evento.clientX,
          y: evento.clientY,
          criadaEm: performance.now(),
          cor: cores[Math.floor(Math.random() * cores.length)]
        });
        if (particulas.length > 40) particulas.splice(0, particulas.length - 40);
        agendarDesenho();
      }

      function mudarVisibilidade() {
        if (document.hidden) {
          inicioPausa = performance.now();
          if (quadro !== null) cancelAnimationFrame(quadro);
          quadro = null;
          return;
        }
        if (inicioPausa !== null) {
          const pausa = performance.now() - inicioPausa;
          particulas.forEach(particula => { particula.criadaEm += pausa; });
          inicioPausa = null;
        }
        agendarDesenho();
      }

      function desativarRastro() {
        window.removeEventListener('pointermove', moverPonteiro);
        window.removeEventListener('resize', redimensionarCanvas);
        document.removeEventListener('visibilitychange', mudarVisibilidade);
        if (quadro !== null) cancelAnimationFrame(quadro);
        quadro = null;
        particulas.length = 0;
        contexto.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }

      redimensionarCanvas();
      window.addEventListener('pointermove', moverPonteiro, { passive: true });
      window.addEventListener('resize', redimensionarCanvas, { passive: true });
      document.addEventListener('visibilitychange', mudarVisibilidade);
      suportePonteiro.addEventListener('change', evento => {
        if (!evento.matches) desativarRastro();
      });
      movimentoReduzido.addEventListener('change', evento => {
        if (evento.matches) desativarRastro();
      });
    }

    iniciarRastroMouse();
    iniciarDiagnosticoFotos();
    validarBanco();