<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Portfólio de Luiz Nascimento, Desenvolvedor Fullstack. Transformando ideias em soluções digitais inovadoras."
    />
    <meta
      name="keywords"
      content="Luiz Nascimento, Desenvolvedor Fullstack, HTML, CSS, JavaScript, React, Node.js, Projetos, Tecnologias"
    />
    <meta name="author" content="Luiz Nascimento" />
    <link rel="canonical" href="https://www.seusite.com/" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/portfolio/resources/assets/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/portfolio/resources/assets/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/portfolio/resources/assets/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/portfolio/resources/assets/favicon/site.webmanifest" />
    <link rel="stylesheet" href="/portfolio/resources/css/style.css" />
    <meta
      property="og:title"
      content="Luiz Nascimento - Desenvolvedor Fullstack"
    />
    <meta
      property="og:description"
      content="Transformando ideias em soluções digitais inovadoras."
    />
    <meta
      property="og:image"
      content="https://www.seusite.com/assets/avatar-img.jpg"
    />
    <meta property="og:url" content="https://www.seusite.com/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Luiz Nascimento - Desenvolvedor Fullstack"
    />
    <meta
      name="twitter:description"
      content="Transformando ideias em soluções digitais inovadoras."
    />
    <meta
      name="twitter:image"
      content="https://www.seusite.com/assets/avatar-img.jpg"
    />
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <title>Luiz Nascimento - Desenvolvedor Fullstack</title>
  </head>
  <body>
    @yield('content')
    <header>
      <nav class="navbar">
        <div class="logo">
          <img
            src="/portfolio/resources/assets/favicon/favicon-32x32.png"
            alt="Logo Luiz Nascimento"
          />
          <span>Olá! Seja Bem Vindo (a)</span>
        </div>
        <div class="hamburger-menu" id="mobile-menu-toggle">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul class="nav-links" id="nav-links">
          <li><a href="javascript:void(0)" data-target="#inicio">Início</a></li>
          <li><a href="javascript:void(0)" data-target="#projetos">Projetos</a></li>
          <li><a href="javascript:void(0)" data-target="#tecnologias">Tecnologias</a></li>
          <li><a href="javascript:void(0)" data-target="#sobre">Minha História</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="inicio">
        <img
          src="/portfolio/resources/assets/avatar-img.jpg"
          id="avatarimg"
          alt="Imagem Avatar de Luiz Nascimento"
        />
        <div id="conteudo-inicio">
          <h1>Luiz Nascimento Desenvolvedor Fullstack</h1>
          <p>Transformando ideias em soluções digitais inovadoras.</p>
          <button id="linkedin-profile">LinkedIn</button>
          <button id="go-to-projects">Github</button>
          <button id="download-cv">Download CV</button>
        </div>
      </section>
      <h2>Projetos</h2>
      <section id="projetos" class="bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-8">
       <!-- Background effects -->
        <div class="fixed inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        <div class="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gray-400/20 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gray-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <!-- Main container -->
        <div class="w-full max-w-6xl mx-auto">
        <!-- Carousel container -->
        <div class="carousel-container relative">
        <!-- Progress bar -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
            <div class="progress-bar absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        </div>

        <!-- Navigation buttons -->
        <button class="nav-button absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white touch-manipulation" onclick="prevSlide()" title="Previous slide">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
        
        <button class="nav-button absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white touch-manipulation" onclick="nextSlide()" title="Next slide">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>

        <!-- Carousel track -->
        <div class="carousel-track relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
            <!-- Carousel items -->
            <div class="carousel-item active absolute top-0 left-0 w-full h-full">
            <div class="w-full h-full p-4 sm:p-8">
            <div class="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80" alt="Geometric art installation" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 mix-blend-overlay"></div>
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Digital Prism</h3>
                <p class="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">Where geometry meets art in a stunning display of light and form.</p>
                </div>
            </div>
            </div>
            </div>

            <div class="carousel-item next absolute top-0 left-0 w-full h-full">
            <div class="w-full h-full p-4 sm:p-8">
            <div class="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" alt="Futuristic tech setup" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-teal-500/40 mix-blend-overlay"></div>
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Tech Haven</h3>
                <p class="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">Immerse yourself in the cutting edge of technology and innovation.</p>
                </div>
            </div>
            </div>
            </div>

            <div class="carousel-item hidden absolute top-0 left-0 w-full h-full">
            <div class="w-full h-full p-4 sm:p-8">
            <div class="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80" alt="Abstract digital art" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-br from-teal-500/40 to-green-500/40 mix-blend-overlay"></div>
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Neural Dreams</h3>
                <p class="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">AI-generated masterpieces that blur the line between human and machine creativity.</p>
                </div>
            </div>
            </div>
            </div>
        </div>

        <!-- Indicators -->
        <div class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
            <button class="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full bg-blue-500/40 hover:bg-blue-500/60 transition-colors" title="Go to slide 1"></button>
            <button class="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full bg-cyan-500/40 hover:bg-cyan-500/60 transition-colors" title="Go to slide 2"></button>
            <button class="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full bg-teal-500/40 hover:bg-teal-500/60 transition-colors" title="Go to slide 3"></button>
        </div>
        </div>
        </div>
      </section>
       <h2>LINGUAGENS E TECNOLOGIAS</h2>
      <section id="tecnologias" class="espaço">
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/html.png" alt="HTML" />
          <p>HTML</p>
          <p>
            Estrutura o conteúdo das páginas web. Usei para criar a base de
            sites e aplicações web.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/css.png" alt="CSS" />
          <p>CSS</p>
          <p>
            Estiliza e define o layout das páginas. Criei designs responsivos e
            atraentes.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/javascript.png" alt="JavaScript" />
          <p>JavaScript</p>
          <p>
            Adiciona interatividade às páginas. Desenvolvi funcionalidades
            dinâmicas.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/csharp.png" alt="C#" />
          <p>C#</p>
          <p>
            Desenvolve aplicações desktop e web. Aprendendo como matéria de
            faculdade.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/java.png" alt="Java" />
          <p>Java</p>
          <p>
            Desenvolve aplicações Android. Aprendendo como matéria de faculdade.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/mysql.png" alt="MySQL" />
          <p>MySQL</p>
          <p>
            Gerencia bancos de dados relacionais. Aprendendo como matéria de
            faculdade.
          </p>
        </div>
        <div class="tecnologia">
          <img src="/portfolio/resources/assets/tecnologias/php.png" alt="PHP" />
          <p>PHP</p>
          <p>
            Desenvolve aplicações web dinâmicas. Aprendendo como matéria de
            faculdade.
          </p>
        </div>
      </section>
      <h2>Minha História</h2>
      <section id="sobre" class="espaço">
        <p>
          Nasci em São Paulo em <strong>26 de abril de 1997</strong>, e desde
          pequeno, a tecnologia sempre foi minha grande paixão. Em
          <strong>2015</strong>, dei meus primeiros passos no mundo da
          programação, e desde então, minha jornada tem sido uma constante busca
          por <em>aprimoramento</em> e <em>inovação</em>. Atualmente, estou
          cursando <strong>Análise e Desenvolvimento de Sistemas</strong> na
          <strong>Universidade Positivo</strong> e me especializando em
          <strong>Desenvolvimento Fullstack</strong> através do curso da
          <strong>DevClub</strong>.
        </p>
        <p>
          Minha trajetória começou com a criação de sites simples em
          <strong>WordPress</strong>, otimizados para <strong>SEO</strong>,
          atendendo clientes do setor de construção civil. Em um determinado
          momento, decidi explorar novos horizontes e assumi o desafio de
          trabalhar como <strong>gerente comercial</strong> em um projeto da
          <strong>ASUS</strong>, focado na venda de celulares e notebooks no
          Brasil. Essa experiência me proporcionou uma visão ampla do mercado e
          fortaleceu minhas habilidades de <em>gestão</em> e
          <em>comunicação</em>.
        </p>
        <p>
          Agora, estou de volta ao meu verdadeiro chamado: a tecnologia. Estou
          determinado a me estabelecer como
          <strong>desenvolvedor fullstack</strong>, transformando ideias em
          soluções digitais inovadoras. Se você se identificou com minha
          história e acredita que podemos criar algo incrível juntos, não hesite
          em entrar em contato comigo. Vamos transformar suas ideias em
          realidade!
        </p>
      </section>
    </main>
    <a
      href="https://wa.me/+5541984821206?text=Olá! Gostaria de mais informações."
      class="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
        alt="WhatsApp"
        class="whatsapp-icon"
      />
    </a>
    <div class="scroll-to-top" id="scrollToTop">
      ↑
      <!-- Você pode substituir isso por um ícone -->
    </div>
    <script src="/portfolio/resources/js/script.js"></script>
    <script src="/portfolio/resources/js/app.js"></script>
  </body>
</html>