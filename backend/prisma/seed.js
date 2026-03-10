import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const initialQuestions = [
  // LEVEL 1: INICIANTE (1-15)
  {
    level: 1,
    category: "HTML",
    question: "O que significa HTML?",
    options: JSON.stringify(["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Links", "Home Tool Markup Language"]),
    answer: 0,
    explanation: "HTML é a linguagem de marcação padrão para criar páginas web."
  },
  {
    level: 1,
    category: "HTML",
    question: "Qual tag é usada para o título principal da página?",
    options: JSON.stringify(["<head>", "<h6>", "<h1>", "<title>"]),
    answer: 2,
    explanation: "A tag <h1> define o título mais importante do documento."
  },
  {
    level: 1,
    category: "HTML",
    question: "Como criamos um link em HTML?",
    options: JSON.stringify(["<link>", "<a>", "<href>", "<url>"]),
    answer: 1,
    explanation: "A tag <a> (anchor) é usada junto com o atributo 'href' para criar links."
  },
  {
    level: 1,
    category: "CSS",
    question: "Qual propriedade muda a cor do texto?",
    options: JSON.stringify(["background-color", "text-style", "font-color", "color"]),
    answer: 3,
    explanation: "A propriedade 'color' define a cor do conteúdo de texto de um elemento."
  },
  {
    level: 1,
    category: "CSS",
    question: "Como centralizamos um texto em CSS?",
    options: JSON.stringify(["align: center", "text-align: center", "margin: center", "content-align: center"]),
    answer: 1,
    explanation: "'text-align: center' é usado para alinhar o conteúdo de texto horizontalmente."
  },
  {
    level: 1,
    category: "JavaScript",
    question: "Como declaramos uma variável que pode ser alterada?",
    options: JSON.stringify(["const", "var", "let", "As opções B e C estão corretas"]),
    answer: 3,
    explanation: "Tanto 'var' (forma antiga) quanto 'let' (moderna) permitem reatribuição de valores."
  },
  {
    level: 1,
    category: "JavaScript",
    question: "Qual o resultado de 2 + '2' em JavaScript?",
    options: JSON.stringify(["4", "22", "undefined", "NaN"]),
    answer: 1,
    explanation: "O JavaScript converte o número em string e realiza uma concatenação."
  },
  {
    level: 1,
    category: "HTML",
    question: "Qual tag é usada para inserir uma imagem?",
    options: JSON.stringify(["<image>", "<img>", "<picture>", "<src>"]),
    answer: 1,
    explanation: "A tag <img> é autossuficiente e requer o atributo 'src' para o caminho da imagem."
  },
  {
    level: 1,
    category: "CSS",
    question: "Qual unidade de medida é relativa ao tamanho da fonte do elemento pai?",
    options: JSON.stringify(["px", "cm", "em", "vh"]),
    answer: 2,
    explanation: "A unidade 'em' é relativa ao font-size do elemento pai ou do próprio elemento."
  },
  {
    level: 1,
    category: "JavaScript",
    question: "Como se escreve um comentário de uma linha em JS?",
    options: JSON.stringify(["//", "/*", "<!--", "#"]),
    answer: 0,
    explanation: "// é usado para comentários de linha única, enquanto /* */ é para múltiplas linhas."
  },
  {
    level: 1,
    category: "HTML",
    question: "Qual tag cria uma lista numerada?",
    options: JSON.stringify(["<ul>", "<li>", "<list>", "<ol>"]),
    answer: 3,
    explanation: "<ol> significa 'Ordered List' e cria listas com números ou letras sequenciais."
  },
  {
    level: 1,
    category: "CSS",
    question: "Qual propriedade CSS controla o espaço interno de um elemento?",
    options: JSON.stringify(["margin", "padding", "border", "spacing"]),
    answer: 1,
    explanation: "O 'padding' cria espaço entre o conteúdo e a borda do elemento."
  },
  {
    level: 1,
    category: "JavaScript",
    question: "Qual função exibe uma mensagem de alerta para o usuário?",
    options: JSON.stringify(["console.log()", "print()", "alert()", "msg()"]),
    answer: 2,
    explanation: "A função alert() abre uma pequena janela de diálogo no navegador."
  },
  {
    level: 1,
    category: "HTML",
    question: "Qual atributo HTML define o texto alternativo para uma imagem?",
    options: JSON.stringify(["title", "alt", "desc", "caption"]),
    answer: 1,
    explanation: "O atributo 'alt' é essencial para acessibilidade e SEO, descrevendo a imagem."
  },
  {
    level: 1,
    category: "CSS",
    question: "Qual valor de display esconde um elemento mas mantém seu espaço?",
    options: JSON.stringify(["display: none", "visibility: hidden", "opacity: 0", "As opções B e C estão corretas"]),
    answer: 3,
    explanation: "Tanto visibility:hidden quanto opacity:0 escondem o elemento sem removê-lo do fluxo do layout."
  },

  // LEVEL 2: INTERMEDIÁRIO (16-30)
  {
    level: 2,
    category: "JavaScript",
    question: "O que o método .map() faz em um array?",
    options: JSON.stringify(["Filtra os elementos", "Altera o array original", "Cria um novo array com os resultados", "Remove o último elemento"]),
    answer: 2,
    explanation: ".map() percorre o array e retorna um NOVO array com os valores transformados."
  },
  {
    level: 2,
    category: "CSS",
    question: "Qual a diferença entre Flexbox e Grid?",
    options: JSON.stringify(["Flexbox é 2D, Grid é 1D", "Flexbox é 1D, Grid é 2D", "Não há diferença", "Grid só funciona no Firefox"]),
    answer: 1,
    explanation: "Flexbox foca em uma dimensão (linha ou coluna), enquanto Grid trabalha com ambas simultaneamente."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "O que é uma 'Arrow Function'?",
    options: JSON.stringify(["Uma função que aponta para um erro", "Uma sintaxe curta para funções que não tem seu próprio 'this'", "Uma função que só funciona em loops", "Um método de animação"]),
    answer: 1,
    explanation: "Arrow functions () => {} oferecem uma sintaxe concisa e herdam o 'this' do escopo pai."
  },
  {
    level: 2,
    category: "React",
    question: "Para que serve o hook useState?",
    options: JSON.stringify(["Para fazer requisições HTTP", "Para gerenciar o estado em componentes funcionais", "Para navegar entre páginas", "Para manipular o DOM diretamente"]),
    answer: 1,
    explanation: "useState permite adicionar e atualizar o estado interno de um componente funcional."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "Qual o objetivo de uma Promise em JS?",
    options: JSON.stringify(["Garantir que o código nunca falhe", "Lidar com operações assíncronas", "Criar variáveis globais", "Otimizar o carregamento de imagens"]),
    answer: 1,
    explanation: "Promises representam um valor que pode estar disponível agora, no futuro ou nunca (assincronismo)."
  },
  {
    level: 2,
    category: "CSS",
    question: "O que faz a propriedade 'z-index'?",
    options: JSON.stringify(["Muda a transparência", "Define a ordem de empilhamento vertical", "Aumenta o zoom da página", "Define o espaçamento entre letras"]),
    answer: 1,
    explanation: "z-index define qual elemento fica 'na frente' de outro no eixo Z."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "Como verificamos se um objeto tem uma propriedade específica?",
    options: JSON.stringify(["obj.has()", "obj.includes()", "obj.hasOwnProperty()", "obj.contains()"]),
    answer: 2,
    explanation: "hasOwnProperty() retorna um booleano indicando se o objeto possui aquela propriedade definida nele mesmo."
  },
  {
    level: 2,
    category: "React",
    question: "O que é o Virtual DOM?",
    options: JSON.stringify(["Uma cópia do DOM real usada para otimização", "Um navegador virtual", "Um plugin do VS Code", "O DOM que o usuário vê na tela"]),
    answer: 0,
    explanation: "O React usa o Virtual DOM para calcular as mudanças mínimas necessárias antes de atualizar o DOM real."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "O que faz o operador de espalhamento (spread operator) '...'?",
    options: JSON.stringify(["Esconde o código", "Expande elementos de um array ou objeto", "Cria um loop infinito", "Divide um número por três"]),
    answer: 1,
    explanation: "O spread operator permite copiar rapidamente partes de arrays ou objetos para outros."
  },
  {
    level: 2,
    category: "CSS",
    question: "Para que servem as Media Queries?",
    options: JSON.stringify(["Para tocar música no site", "Para aplicar estilos baseados no tamanho da tela", "Para baixar vídeos", "Para traduzir o site automaticamente"]),
    answer: 1,
    explanation: "Media Queries são fundamentais para o Design Responsivo, adaptando o layout para celulares, tablets e PCs."
  },
  {
    level: 2,
    category: "React",
    question: "Qual a função do hook useEffect?",
    options: JSON.stringify(["Criar formulários", "Lidar com efeitos colaterais (chamadas de API, timers)", "Estilizar componentes", "Somar dois números"]),
    answer: 1,
    explanation: "useEffect executa código em resposta a mudanças no ciclo de vida do componente ou dependências."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "Qual a diferença entre '==' e '==='?",
    options: JSON.stringify(["Nenhuma", "'===' compara valor e tipo, '==' apenas valor", "'==' é mais rápido", "'===' é usado apenas para strings"]),
    answer: 1,
    explanation: "O operador '===' (estrito) não realiza coerção de tipos, sendo mais seguro."
  },
  {
    level: 2,
    category: "HTML",
    question: "O que é um elemento semântico?",
    options: JSON.stringify(["Um elemento que não tem estilo", "Um elemento que descreve seu significado (ex: <article>, <nav>)", "Um elemento que só funciona com JS", "Um tipo de vírus de computador"]),
    answer: 1,
    explanation: "Tags semânticas ajudam navegadores e leitores de tela a entender a estrutura do conteúdo."
  },
  {
    level: 2,
    category: "JavaScript",
    question: "O que é 'Hoisting'?",
    options: JSON.stringify(["Um erro de compilação", "O comportamento de mover declarações para o topo do escopo", "Uma técnica de animação", "Um método de compressão de dados"]),
    answer: 1,
    explanation: "Em JS, declarações de funções e variáveis (var) são 'elevadas' ao topo de seu contexto antes da execução."
  },
  {
    level: 2,
    category: "React",
    question: "Como passamos dados de um componente pai para um filho?",
    options: JSON.stringify(["Usando State", "Usando Props", "Usando ID", "Usando Cookies"]),
    answer: 1,
    explanation: "Props (propriedades) são a forma padrão de enviar dados para componentes filhos no React."
  },

  // LEVEL 3: AVANÇADO (31-45)
  {
    level: 3,
    category: "JavaScript",
    question: "O que é um 'Closure'?",
    options: JSON.stringify(["Um erro que fecha o navegador", "Uma função que lembra do seu escopo léxico mesmo quando executada fora dele", "Um comando para deletar variáveis", "Uma forma de proteger o código com senha"]),
    answer: 1,
    explanation: "Closures permitem que funções internas acessem variáveis de funções externas mesmo após estas terem terminado."
  },
  {
    level: 3,
    category: "React",
    question: "Qual o benefício de usar useMemo?",
    options: JSON.stringify(["Salva dados no banco de dados", "Memoriza valores calculados para evitar re-renderizações desnecessárias", "Aumenta o tamanho do app", "Cria um histórico de navegação"]),
    answer: 1,
    explanation: "useMemo otimiza a performance evitando que cálculos pesados sejam refeitos a cada render se as entradas não mudarem."
  },
  {
    level: 3,
    category: "Arquitetura",
    question: "O que significa o princípio S.O.L.I.D.?",
    options: JSON.stringify(["Um framework JS", "Cinco princípios de design de software orientado a objetos", "Uma biblioteca de CSS-in-JS", "Um banco de dados NoSQL"]),
    answer: 1,
    explanation: "SOLID ajuda a criar software mais compreensível, flexível e fácil de manter."
  },
  {
    level: 3,
    category: "JavaScript",
    question: "Qual a diferença entre microtasks e macrotasks no Event Loop?",
    options: JSON.stringify(["Não há diferença", "Microtasks (Promises) têm prioridade sobre Macrotasks (setTimeout)", "Macrotasks são executadas primeiro", "Microtasks só funcionam em Node.js"]),
    answer: 1,
    explanation: "No Event Loop, a fila de microtasks é processada inteira logo após cada macrotask e antes da próxima renderização."
  },
  {
    level: 3,
    category: "TypeScript",
    question: "O que são Generics em TypeScript?",
    options: JSON.stringify(["Tipos que só funcionam com números", "Componentes que permitem criar estruturas que funcionam com vários tipos", "Uma marca de remédio", "Erros genéricos do compilador"]),
    answer: 1,
    explanation: "Generics permitem criar código reutilizável que trabalha com diversos tipos mantendo a segurança de tipos."
  },
  {
    level: 3,
    category: "React",
    question: "Para que serve o hook useCallback?",
    options: JSON.stringify(["Para fazer chamadas de volta (callback) para o servidor", "Para memorizar uma definição de função entre renderizações", "Para atualizar o banco de dados", "Para mudar a rota da página"]),
    answer: 1,
    explanation: "useCallback evita que funções sejam recriadas a cada render, o que é útil ao passá-las para componentes otimizados com React.memo."
  },
  {
    level: 3,
    category: "JavaScript",
    question: "O que faz o método Object.freeze()?",
    options: JSON.stringify(["Deleta o objeto", "Impede qualquer modificação nas propriedades existentes e a adição de novas", "Criptografa o objeto", "Salva o objeto em cache"]),
    answer: 1,
    explanation: "Um objeto 'congelado' torna-se imutável: não se pode adicionar, remover ou alterar propriedades."
  },
  {
    level: 3,
    category: "Web Performance",
    question: "O que é 'Tree Shaking'?",
    options: JSON.stringify(["Um efeito de animação de árvore", "Remoção de código morto (não utilizado) durante o processo de build", "Uma técnica de SEO", "Uma forma de organizar pastas"]),
    answer: 1,
    explanation: "Ferramentas como Webpack e Vite usam Tree Shaking para reduzir o tamanho final do pacote (bundle)."
  },
  {
    level: 3,
    category: "React",
    question: "O que são 'Higher-Order Components' (HOC)?",
    options: JSON.stringify(["Componentes que ficam no topo da página", "Funções que recebem um componente e retornam um novo componente", "Componentes que usam muitos hooks", "Componentes que não renderizam nada"]),
    answer: 1,
    explanation: "HOCs são um padrão avançado para reutilizar lógica de componentes."
  },
  {
    level: 3,
    category: "JavaScript",
    question: "O que é o 'currying' em programação funcional?",
    options: JSON.stringify(["Uma técnica de temperar código", "Transformar uma função que recebe múltiplos argumentos em uma série de funções que recebem um único argumento", "Um erro de recursão", "Um método de busca em arrays"]),
    answer: 1,
    explanation: "Currying ajuda na composição de funções e na criação de funções especializadas a partir de genéricas."
  },
  {
    level: 3,
    category: "Segurança",
    question: "O que é Cross-Site Scripting (XSS)?",
    options: JSON.stringify(["Um estilo de CSS", "Uma vulnerabilidade onde scripts maliciosos são injetados em sites confiáveis", "Um novo protocolo de internet", "Uma forma de acelerar o site"]),
    answer: 1,
    explanation: "XSS permite que atacantes executem scripts no navegador de outros usuários para roubar dados."
  },
  {
    level: 3,
    category: "React",
    question: "Para que serve o hook useReducer?",
    options: JSON.stringify(["Para diminuir o tamanho do componente", "Para gerenciar estados complexos com lógica de transição (estilo Redux)", "Para fazer cálculos matemáticos", "Para reduzir o tempo de carregamento"]),
    answer: 1,
    explanation: "useReducer é preferível ao useState quando se tem uma lógica de estado complexa que envolve múltiplos sub-valores."
  },
  {
    level: 3,
    category: "JavaScript",
    question: "Como funciona a 'Prototypal Inheritance' (Herança de Protótipo)?",
    options: JSON.stringify(["Objetos herdam propriedades de outros objetos através de uma cadeia de protótipos", "Através de classes como no Java", "Copiando o código fonte", "Não existe herança em JS"]),
    answer: 0,
    explanation: "Em JS, quase todos os objetos têm um protótipo, do qual herdam métodos e propriedades."
  },
  {
    level: 3,
    category: "Web API",
    question: "O que é o Service Worker?",
    options: JSON.stringify(["Um funcionário que limpa o servidor", "Um script que o navegador executa em segundo plano para offline, push e cache", "Uma ferramenta de debug", "O servidor onde o site está hospedado"]),
    answer: 1,
    explanation: "Service Workers são a base das Progressive Web Apps (PWAs), permitindo experiências offline."
  },
  {
    level: 3,
    category: "React",
    question: "O que faz o React.memo()?",
    options: JSON.stringify(["Salva o componente no banco", "Evita a re-renderização de um componente se suas props não mudarem", "Cria um post-it virtual", "Muda o tema do app"]),
    answer: 1,
    explanation: "React.memo é um componente de alta ordem para otimização de performance via memoização."
  },
];

async function main() {
  console.log('🌱 Começando o seed das perguntas (45 no total)...');
  
  // Limpa perguntas existentes antes de inserir
  await prisma.question.deleteMany();

  for (const q of initialQuestions) {
    await prisma.question.create({
      data: q
    });
  }

  console.log('✅ 45 Perguntas inseridas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
