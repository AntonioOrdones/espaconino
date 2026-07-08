/* ═══════════════════════════════════════════════════════════════════════════
   ESPAÇO NIÑO · Comportamentos da página
   Vanilla JS (ES6+), sem dependências externas.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const WHATSAPP = '5561991557014';
  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1 · Cabeçalho: sombra ao rolar ──────────────────────────────────────── */
  const header = $('.site-header');
  const aoRolar = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ── 2 · Menu do celular ─────────────────────────────────────────────────── */
  const toggle = $('.nav-toggle');
  const menu   = $('#menu-mobile');

  const fecharMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    menu.hidden = true;
  };

  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') === 'true';
    if (aberto) { fecharMenu(); return; }
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    menu.hidden = false;
  });

  // Fecha ao escolher um destino, ao apertar Esc ou ao clicar fora
  $$('a', menu).forEach(a => a.addEventListener('click', fecharMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { fecharMenu(); toggle.focus(); }
  });
  document.addEventListener('click', e => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) fecharMenu();
  });

  /* ── 3 · Animações de entrada (respeitando movimento reduzido) ───────────── */
  const reveals = $$('.reveal');
  if (reduzirMovimento || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-in');
          io.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ── 4 · Busca de convênios ──────────────────────────────────────────────── */
  const busca    = $('#busca-convenio');
  const lista    = $('#lista-convenios');
  const contador = $('#contador-convenios');
  const vazio    = $('#convenio-vazio');

  if (busca && lista) {
    const itens = $$('li', lista).map(li => ({
      el: li,
      original: li.textContent,
      plano: normalizar(li.textContent)
    }));

    const rotulo = n => n === 1 ? '1 convênio encontrado' : `${n} convênios ${n === itens.length ? 'na lista' : 'encontrados'}`;

    busca.addEventListener('input', () => {
      const termo = normalizar(busca.value.trim());
      let visiveis = 0;

      itens.forEach(({ el, original, plano }) => {
        const posicao = termo ? plano.indexOf(termo) : 0;
        const mostrar = posicao !== -1;
        el.classList.toggle('is-hidden', !mostrar);

        if (mostrar && termo) {
          // Realça o trecho encontrado, preservando o texto original
          el.innerHTML = original.slice(0, posicao)
            + '<mark>' + original.slice(posicao, posicao + termo.length) + '</mark>'
            + original.slice(posicao + termo.length);
        } else {
          el.textContent = original;
        }
        if (mostrar) visiveis++;
      });

      contador.textContent = rotulo(visiveis);
      vazio.hidden = visiveis !== 0;
    });
  }

  function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* ── 5 · Dúvidas frequentes: mantém apenas uma aberta ────────────────────── */
  const faqs = $$('.faq-item');
  faqs.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) faqs.forEach(outro => { if (outro !== item) outro.open = false; });
    });
  });

  /* ── 6 · Formulário → mensagem pronta no WhatsApp ────────────────────────── */
  const form = $('#form-contato');
  if (form) {
    const erro = $('#form-erro');

    form.addEventListener('submit', e => {
      e.preventDefault();

      const nome     = $('#f-nome').value.trim();
      const idade    = $('#f-idade').value;
      const convenio = $('#f-convenio').value.trim();
      const msg      = $('#f-msg').value.trim();

      if (!nome || !msg) {
        erro.hidden = false;
        (!nome ? $('#f-nome') : $('#f-msg')).focus();
        return;
      }
      erro.hidden = true;

      let texto = `Olá! Meu nome é ${nome}.`;
      if (idade)    texto += `\nBusco atendimento para: ${idade}.`;
      if (convenio) texto += `\nConvênio: ${convenio}.`;
      texto += `\n\n${msg}`;

      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  }

  /* ── 7 · Mapa do Google sob demanda (privacidade + desempenho) ───────────── */
  const btnMapa = $('#btn-carregar-mapa');
  if (btnMapa) {
    btnMapa.addEventListener('click', () => {
      const mapa = $('#mapa');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.3050065341463!2d-48.03214701813092!3d-15.840558845630344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a332be903d32f%3A0x32a08e5c0ed85e93!2sEspa%C3%A7o%20Ni%C3%B1o%20-%20Centro%20de%20Terapias%20Multiprofissionais!5e0!3m2!1spt-BR!2sus!4v1783368876858!5m2!1spt-BR!2sus';
      iframe.title = 'Mapa do Espaço Niño no Edifício Le Quartier, Águas Claras';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      mapa.replaceChildren(iframe);
    });
  }

  /* ── 8 · Ano do rodapé ───────────────────────────────────────────────────── */
  const ano = $('#ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ── 9 · Preferências locais (com fallback silencioso) ───────────────────── */
  const lerPref    = ch      => { try { return localStorage.getItem(ch); } catch { return null; } };
  const gravarPref = (ch, v) => { try { localStorage.setItem(ch, v); } catch { /* modo privado etc. */ } };

  /* ── 10 · Voltar ao topo ─────────────────────────────────────────────────── */
  const btnTopo = $('#btn-topo');
  if (btnTopo) {
    const alternar = () => {
      const visivel = window.scrollY > 600;
      btnTopo.hidden = !visivel;
      btnTopo.classList.toggle('is-visible', visivel);
    };
    window.addEventListener('scroll', alternar, { passive: true });
    alternar();
    btnTopo.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: reduzirMovimento ? 'auto' : 'smooth' })
    );
  }

  /* ── 11 · Acessibilidade: tamanho do texto e alto contraste ──────────────── */
  {
    const raiz = document.documentElement;
    const aplicarFs = n => { raiz.dataset.fs = String(n); gravarPref('nino-fs', String(n)); };
    let fs = parseInt(lerPref('nino-fs') || '0', 10);
    if (fs) raiz.dataset.fs = String(fs);

    $('#a11y-mais') ?.addEventListener('click', () => { fs = Math.min(2, fs + 1); aplicarFs(fs); });
    $('#a11y-menos')?.addEventListener('click', () => { fs = Math.max(0, fs - 1); aplicarFs(fs); });

    const btnHc = $('#a11y-contraste');
    const aplicarHc = ligado => {
      raiz.classList.toggle('hc', ligado);
      btnHc?.setAttribute('aria-pressed', String(ligado));
      gravarPref('nino-hc', ligado ? '1' : '0');
    };
    if (lerPref('nino-hc') === '1') aplicarHc(true);
    btnHc?.addEventListener('click', () => aplicarHc(!raiz.classList.contains('hc')));
  }

  /* ── 12 · Consentimento (LGPD) + conteúdo de terceiros ───────────────────── */
  let elfsightAtivo = false;
  const carregarWidgets = () => {
    if (elfsightAtivo) return;
    elfsightAtivo = true;
    const s = document.createElement('script');
    s.src = 'https://elfsightcdn.com/platform.js';
    s.async = true;
    document.body.appendChild(s);
  };

  {
    const barra  = $('#cookiebar');
    const secoes = ['#depoimentos', '#instagram'].map(sel => $(sel)).filter(Boolean);

    const aplicar = escolha => {
      const rejeitou = escolha === 'essential';
      secoes.forEach(sec => sec.toggleAttribute('hidden', rejeitou));
      if (!rejeitou) carregarWidgets();
    };

    const decidir = escolha => {
      gravarPref('nino-consent', escolha);
      barra?.setAttribute('hidden', '');
      aplicar(escolha);
    };

    // Os widgets são exibidos por padrão; quem rejeitar navega sem terceiros.
    const salvo = lerPref('nino-consent');
    aplicar(salvo || 'all');
    if (!salvo) barra?.removeAttribute('hidden');

    $('#ck-todos')     ?.addEventListener('click', () => decidir('all'));
    $('#ck-essenciais')?.addEventListener('click', () => decidir('essential'));

    // Revogação sempre disponível: “Cookies”, no rodapé, reabre o aviso
    $$('[data-cookie-prefs]').forEach(b =>
      b.addEventListener('click', () => barra?.removeAttribute('hidden'))
    );
  }

  /* ── 13 · Galeria: lightbox ──────────────────────────────────────────────── */
  const lightbox = $('#lightbox');
  if (lightbox && 'showModal' in lightbox) {
    const area = $('#lightbox-media');
    const cap  = $('#lightbox-cap');

    $$('.gallery__btn').forEach(btn => btn.addEventListener('click', () => {
      const { media, src, cap: legenda = '' } = btn.dataset;
      let el;
      if (media === 'video') {
        el = document.createElement('video');
        el.src = src; el.controls = true; el.playsInline = true;
        el.autoplay = !reduzirMovimento;
      } else {
        el = document.createElement('img');
        el.src = src; el.alt = legenda;
      }
      area.replaceChildren(el);
      cap.textContent = legenda;
      lightbox.showModal();
    }));

    lightbox.addEventListener('close', () => area.replaceChildren());
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
    $$('[data-close]', lightbox).forEach(b => b.addEventListener('click', () => lightbox.close()));
  }

  /* ── 14 · Feedback → WhatsApp ────────────────────────────────────────────── */
  const dlgFeedback = $('#dlg-feedback');
  if (dlgFeedback && 'showModal' in dlgFeedback) {
    $$('[data-feedback]').forEach(b => b.addEventListener('click', () => dlgFeedback.showModal()));
    $$('[data-close]', dlgFeedback).forEach(b => b.addEventListener('click', () => dlgFeedback.close()));
    dlgFeedback.addEventListener('click', e => { if (e.target === dlgFeedback) dlgFeedback.close(); });

    $('#form-feedback')?.addEventListener('submit', e => {
      e.preventDefault();
      const msg = $('#fb-msg').value.trim();
      if (!msg) { $('#fb-msg').focus(); return; }
      const texto = `Feedback sobre o site (${$('#fb-tipo').value}): ${msg}`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
      e.target.reset();
      dlgFeedback.close();
    });
  }

  /* ── 15 · Boletim informativo ────────────────────────────────────────────── */
  const formBoletim = $('#form-boletim');
  if (formBoletim) {
    const campo = $('#boletim-email');
    const aviso = $('#boletim-hint');

    formBoletim.addEventListener('submit', async e => {
      e.preventDefault();
      const email = campo.value.trim();
      if (!email || !campo.checkValidity()) {
        aviso.textContent = 'Digite um e‑mail válido para assinar.';
        campo.focus();
        return;
      }

      const endpoint = formBoletim.dataset.endpoint;
      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          aviso.textContent = 'Pronto! Confira sua caixa de entrada para confirmar. ✓';
          formBoletim.reset();
        } catch {
          aviso.textContent = 'Não foi possível assinar agora — tente pelo WhatsApp.';
        }
      } else {
        // Sem serviço de e‑mail configurado: o pedido chega pelo WhatsApp da clínica.
        const texto = `Olá! Quero assinar o boletim do Espaço Niño. Meu e‑mail: ${email}`;
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
        aviso.textContent = 'Pedido enviado pelo WhatsApp — em breve você recebe a confirmação. ✓';
        formBoletim.reset();
      }
    });
  }

  /* ── 16 · Nino, o assistente virtual ─────────────────────────────────────── */
  const nino = {
    fab:   $('#nino-fab'),
    panel: $('#nino-chat'),
    log:   $('#nino-log'),
    chips: $('#nino-chips'),
    form:  $('#nino-form'),
    input: $('#nino-input'),
  };

  if (nino.fab && nino.panel) {
    const CONVENIOS = $$('#lista-convenios li').map(li => li.textContent.trim());
    const MAPS = 'https://maps.app.goo.gl/S23awZM4eRqJVQJq6';
    let saudou = false;
    let fluxo  = null; // agendamento em etapas: {etapa, nome}

    const esc = t => t.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    const linkWa = (texto, rotulo) =>
      `<a href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">${rotulo}</a>`;

    const falar = (html, quem = 'nino') => {
      const b = document.createElement('div');
      b.className = `msg msg--${quem}`;
      if (quem === 'user') b.textContent = html; else b.innerHTML = html;
      nino.log.appendChild(b);
      nino.log.scrollTop = nino.log.scrollHeight;
    };

    const opcoes = lista => {
      nino.chips.replaceChildren(...lista.map(({ t, a }) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = t;
        b.addEventListener('click', () => a(t));
        return b;
      }));
    };

    const MENU = () => opcoes([
      { t: 'Especialidades',    a: () => responder('especialidades') },
      { t: 'Meu convênio',      a: () => responder('convenio') },
      { t: 'Agendar avaliação', a: () => iniciarAgendamento() },
      { t: 'Onde fica',         a: () => responder('endereco') },
      { t: 'Horários',          a: () => responder('horario') },
      { t: 'Falar no WhatsApp', a: () => responder('humano') },
    ]);

    const saudar = () => {
      falar('Oi! Eu sou o <strong>Nino</strong> 👋 Posso te ajudar a encontrar informações do site ou a agendar uma conversa com a equipe. Por onde começamos?');
      MENU();
    };

    /* Fluxo de agendamento em duas perguntas → WhatsApp */
    const iniciarAgendamento = () => {
      fluxo = { etapa: 'nome' };
      falar('Vou te ajudar a agendar 😊 Qual é o <strong>primeiro nome</strong> da criança ou do adolescente?');
      opcoes([{ t: 'Prefiro ir direto ao WhatsApp', a: () => { fluxo = null; responder('humano'); } }]);
      nino.input.focus();
    };

    const etapaIdade = () => {
      fluxo.etapa = 'idade';
      falar(`Legal! E qual é a faixa de idade de <strong>${esc(fluxo.nome)}</strong>?`);
      opcoes(['0–2 anos', '3–5 anos', '6–9 anos', '10–12 anos', '13–17 anos'].map(f => ({
        t: f,
        a: () => concluirAgendamento(f),
      })));
    };

    const concluirAgendamento = faixa => {
      const texto = `Olá! Quero agendar uma avaliação no Espaço Niño. Nome: ${fluxo.nome} · Idade: ${faixa}.`;
      falar(faixa, 'user');
      falar(`Perfeito! Já deixei a mensagem pronta — é só tocar para abrir a conversa: ${linkWa(texto, 'abrir o WhatsApp da clínica')}. A equipe responde de segunda a sexta, das 8h às 18h.`);
      fluxo = null;
      MENU();
    };

    /* Busca de convênio dentro do chat, reaproveitando a lista da página */
    const buscarConvenio = t => {
      const achados = CONVENIOS.filter(c => {
        const n = normalizar(c);
        return n.includes(t) || t.includes(n) ||
               t.split(/\s+/).some(w => w.length >= 4 && n.includes(w));
      });
      if (achados.length) {
        const lista = achados.slice(0, 4).map(c => `<strong>${esc(c)}</strong>`).join(', ');
        falar(`Boa notícia: atendemos ${lista} ✓ Você confere a lista completa em <a href="#convenios">Convênios</a>. Quer já ${linkWa(`Olá! Tenho o convênio ${achados[0]} e gostaria de agendar uma avaliação.`, 'agendar pelo WhatsApp')}?`);
      } else {
        falar(`Não encontrei esse nome na lista — mas ela muda com frequência. Vale conferir em <a href="#convenios">Convênios</a> ou ${linkWa('Olá! Meu convênio não está na lista do site. Vocês atendem ' , 'confirmar direto no WhatsApp')}. Também atendemos particular, com recibo para reembolso.`);
      }
      MENU();
    };

    /* Intenções por palavra‑chave (texto normalizado, sem acentos) */
    const responder = bruto => {
      const t = normalizar(bruto.trim());
      if (!t) return;

      if (fluxo?.etapa === 'nome') {
        fluxo.nome = bruto.trim().split(/\s+/).slice(0, 3).join(' ');
        etapaIdade();
        return;
      }
      if (fluxo?.etapa === 'convenio') { fluxo = null; buscarConvenio(t); return; }

      if (/\b(oi|ola|bom dia|boa tarde|boa noite|hey|eai)\b/.test(t)) { saudar(); return; }

      if (/(agendar|agendamento|marcar|consulta|avaliacao|vaga)/.test(t)) { iniciarAgendamento(); return; }

      if (/(especialidade|terapia|fono|psicolog|ocupacional|psicoped|psicomotr|fisioter|denver|aba\b|tea\b|autis|tdah)/.test(t)) {
        falar('Trabalhamos com <strong>7 especialidades integradas</strong>: Psicologia (Denver e ABA), Fonoaudiologia, Terapia Ocupacional, Psicopedagogia, Psicomotricidade e Fisioterapia — sempre com plano individual e reavaliações. Veja os detalhes em <a href="#especialidades">Especialidades</a> e o passo a passo em <a href="#jornada">Como funciona</a>.');
        MENU(); return;
      }

      if (/(convenio|plano de saude|plano\b|cobertura|reembolso)/.test(t) && t.split(' ').length <= 3) {
        fluxo = { etapa: 'convenio' };
        falar('Atendemos <strong>51 convênios</strong> + particular. Me diga o nome do seu plano que eu confiro aqui na lista 😉');
        opcoes([{ t: 'Ver a lista completa', a: () => { fluxo = null; falar('Aqui: <a href="#convenios">lista de convênios</a> — dá para buscar pelo nome.'); MENU(); } }]);
        return;
      }
      if (/(unimed|amil|bradesco|sulamerica|cassi|geap|ipe|saude caixa|petrobras|postal|serpro|fusex|gdf|brb|conab|embrapa|codevasf|allianz|omint|notredame|intermedica|care plus|capesesp|bacen|fascal|fapes|proasa|pmdf|planassiste|evida|e-vida|inas|trt|tre|tst|stf|stm|mpu|senado|camara|tjdft|trf|afeb|affego|asete|caeme|caesan|cbhpm|ceam|cnti|gama saude|gravia|life|luminar|real grandeza|samp|sis\b|unafisco|sindifisco|vtrp)/.test(t)) {
        buscarConvenio(t); return;
      }

      if (/(endereco|onde|local|chegar|fica|mapa|estacionamento|aguas claras)/.test(t)) {
        falar(`Estamos na <strong>Av. Pau Brasil, 10 · Sala 1101</strong>, Edifício Le Quartier, Águas Claras — Brasília/DF. <a href="${MAPS}" target="_blank" rel="noopener">Abrir no Google Maps</a>. O prédio tem estacionamento e acesso acessível.`);
        MENU(); return;
      }

      if (/(horario|funciona|abre|fecha|atendem|que horas)/.test(t)) {
        falar('Atendemos de <strong>segunda a sexta, das 8h às 18h</strong>. O primeiro contato pode ser a qualquer hora pelo WhatsApp — a equipe responde no horário comercial.');
        MENU(); return;
      }

      if (/(preco|valor|custa|quanto|particular|sessao)/.test(t)) {
        falar(`Os valores variam conforme a especialidade e o plano terapêutico — por isso a equipe faz um orçamento personalizado, sem compromisso. ${linkWa('Olá! Gostaria de saber os valores das terapias no Espaço Niño.', 'Pedir valores no WhatsApp')}. Atendemos convênios e particular com recibo.`);
        MENU(); return;
      }

      if (/(idade|anos|bebe|adolescente|crianca)/.test(t)) {
        falar('Atendemos do <strong>bebê ao adolescente (0 a 17 anos)</strong>, com salas e abordagens específicas por fase. Veja em <a href="#especialidades">Especialidades</a>.');
        MENU(); return;
      }

      if (/(feedback|sugestao|reclama|elogio|erro)/.test(t)) {
        falar('Sua opinião ajuda muito! Vou abrir o formulário de feedback para você 💙');
        dlgFeedback?.showModal();
        MENU(); return;
      }

      if (/(blog|artigo|conteudo|texto)/.test(t)) {
        falar('Nossos conteúdos ficam no <a href="https://espaconinoterapias.blogspot.com" target="_blank" rel="noopener">blog do Espaço Niño</a> — dicas, rotinas e novidades da equipe.');
        MENU(); return;
      }

      if (/(humano|atendente|pessoa|whatsapp|zap|falar|contato|telefone)/.test(t)) {
        falar(`Claro! ${linkWa('Olá! Vim pelo site do Espaço Niño e gostaria de falar com a equipe.', 'Tocar aqui para abrir o WhatsApp')} — ou ligue para <strong>(61) 99155‑7014</strong>.`);
        MENU(); return;
      }

      falar('Hmm, essa eu ainda não sei responder 😅 Mas posso te mostrar o caminho: escolha uma opção abaixo ou pergunte de outro jeito — ou fale direto com a equipe no WhatsApp.');
      MENU();
    };

    /* Abrir e fechar o painel */
    const abrir = () => {
      nino.panel.hidden = false;
      nino.fab.setAttribute('aria-expanded', 'true');
      if (!saudou) { saudar(); saudou = true; }
      nino.input.focus();
    };
    const fechar = () => {
      nino.panel.hidden = true;
      nino.fab.setAttribute('aria-expanded', 'false');
      nino.fab.focus();
    };

    nino.fab.addEventListener('click', () => (nino.panel.hidden ? abrir() : fechar()));
    $('#nino-close')?.addEventListener('click', fechar);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !nino.panel.hidden) fechar();
    });

    // Links internos do chat: fecha o painel e deixa a âncora rolar a página
    nino.log.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (a) fechar();
    });

    nino.form.addEventListener('submit', e => {
      e.preventDefault();
      const texto = nino.input.value.trim();
      if (!texto) return;
      falar(texto, 'user');
      nino.input.value = '';
      window.setTimeout(() => responder(texto), reduzirMovimento ? 0 : 350);
    });
  }
})();
