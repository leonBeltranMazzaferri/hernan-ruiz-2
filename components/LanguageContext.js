
import React, { createContext, useContext, useState } from "react";

// Traducciones en español, inglés y portugués
const translations = {
  es: {
    login: "Ingresar",
    register: "Registrarse",
    email: "Correo electrónico",
    password: "Contraseña",
    nombre: "Nombre",
    apellido: "Apellido",
    telefono: "Teléfono",
    success_register: "Usuario registrado correctamente",
    error_register: "No se pudo registrar",
    complete_fields: "Completa todos los campos",
    no_account: "¿No tienes cuenta? Regístrate",
    login_error: "Email o contraseña incorrectos",

    app_name: "avellanedaUnida",
    app_subtitle: "Explora y descubre tu entorno",
    map: "Mapa",
    map_description: "Encuentra ubicaciones y puntos de interés.",
    history: "Historia",
    history_description: "Aprende sobre los lugares que visitas.",
    recommendations: "Te puede interesar",
    recommendations_description: "Artículos y recomendaciones personalizadas.",
    complaint_box: "Buzón de quejas",

    history_title: "Historia del Municipio de Avellaneda",
    history_subtitle:
      "Avellaneda, ubicada en la provincia de Buenos Aires, es una de las ciudades más importantes del conurbano bonaerense. Su origen se remonta al siglo XIX, cuando la región formaba parte de extensas estancias dedicadas a la agricultura y la ganadería. La zona comenzó a poblarse de manera significativa con la llegada de inmigrantes europeos, principalmente italianos y españoles, quienes contribuyeron al desarrollo industrial y comercial de la región.La ciudad se formó oficialmente como partido en 1852 bajo el nombre de “Barracas al Sud”. En 1904, en honor al presidente argentino Nicolás Avellaneda, se cambió su denominación a Avellaneda. Durante finales del siglo XIX y principios del XX, Avellaneda se consolidó como un importante centro industrial, con fábricas textiles, metalúrgicas y talleres ferroviarios. La presencia del puerto y su cercanía con la ciudad de Buenos Aires favorecieron su crecimiento económico y poblacional.Avellaneda también es conocida por su tradición deportiva. Es la cuna de clubes de fútbol emblemáticos como Independiente y Racing Club, que han dejado una huella profunda en la historia del deporte argentino. Además, la ciudad cuenta con una rica vida cultural, con teatros, centros culturales y espacios dedicados a la preservación de su patrimonio histórico.Hoy en día, Avellaneda combina su pasado industrial con un desarrollo urbano moderno. Sus barrios reflejan la diversidad de sus habitantes y su historia, mientras que su economía sigue vinculada tanto a la industria como al comercio y los servicios. La ciudad es un ejemplo de cómo el crecimiento migratorio, la industria y la cultura se entrelazan para formar la identidad de un lugar.",

    cilindro_title: "Construcción del Estadio Presidente Perón (El Cilindro)",
    cilindro_text:
      "Obras (1948–1950) e inauguración el 3 de septiembre de 1950: el Cilindro cambió la fisonomía urbana de Avellaneda y se transformó en emblema cultural y deportivo para generaciones de hinchas de Racing.",
    cilindro_detail:
      "La estructura, de diseño cilíndrico que le dio su apodo, fue construida sobre el terreno del antiguo estadio. Desde su inauguración fue escenario de títulos, recitales y grandes reuniones sociales que marcaron la identidad del barrio.",

    independiente_title:
      "Construcción del Estadio Libertadores de América - Ricardo Enrique Bochini",
    independiente_text:
      "El Estadio Libertadores de América, ubicado en Avellaneda, Buenos Aires, es el hogar del Club Atlético Independiente. Originalmente inaugurado en 1928 como “La Doble Visera”, fue el primer estadio de cemento del país y uno de los primeros en el mundo exclusivamente dedicado al fútbol.",
    independiente_detail:
      "Uno de los aspectos más emblemáticos del estadio es la tribuna principal diseñada por Federico Garófalo, que en su época fue pionera: tenía 157 metros de largo, 31 escalones y un techo en voladizo sin columnas, lo que permitía que todos los espectadores tuvieran visión completa del campo. Este diseño innovador marcó un hito en la arquitectura deportiva argentina y mundial.",

    dario_maxi_title: "La estación y el recuerdo de Darío y Maxi",
    dario_maxi_text:
      "La Estación Darío y Maxi, en Avellaneda, es un importante punto del Ferrocarril Roca que combina transporte con memoria histórica, recordando a los jóvenes militantes Darío Santillán y Maximiliano Kosteki.",
    dario_maxi_detail:
      "La estación Darío y Maxi fue renombrada en homenaje a Darío Santillán y Maximiliano Kosteki, dos jóvenes militantes asesinados por fuerzas de seguridad el 26 de junio de 2002 durante una protesta social en ese lugar. El cambio de nombre simboliza memoria, justicia y lucha social, y cada año se realizan actos y murales en su recuerdo.",

    avellaneda_conecta_title: "Avellaneda Conecta",
    avellaneda_conecta_text:
      "Avellaneda Conectada es un programa municipal que busca promover la inclusión digital y tecnológica en estudiantes de escuelas públicas y subvencionadas de Avellaneda. A través de la entrega de computadoras personales y la organización de actividades educativas y de salud, el programa integra tecnología, educación y bienestar social para acompañar de manera integral a la comunidad educativa.",
    avellaneda_conecta_detail:
      "En una jornada de cada año en el Parque La Estación, más de 3.700 estudiantes de sexto año de secundaria y séptimo de técnica recibieron sus netbooks personales, mientras también pudieron acceder a controles físicos y psicológicos, mostrando cómo el programa combina educación tecnológica y cuidado integral de los jóvenes.",

    elefante_blanco_title: "El Elefante Blanco",
    elefante_blanco_text:
      "El Elefante Blanco de Avellaneda es un complejo habitacional inconcluso ubicado en avenida Hipólito Yrigoyen, compuesto por cuatro torres que originalmente estaban destinadas a 900 departamentos con cocheras y espacios comunes como gimnasio, pileta y jardín de infantes. Comenzó a construirse en 2010, pero la obra se paralizó años después, dejando el edificio abandonado. Con el tiempo se convirtió en un ícono urbano de proyectos inconclusos y problemas de planificación en la ciudad.",
    elefante_blanco_detail:
      "Lo más significativo es que el proyecto, pensado como un desarrollo de lujo, terminó afectando a muchas familias que habían aportado dinero al fideicomiso, sin recibir sus departamentos. La paralización transformó el edificio en un símbolo de estafa inmobiliaria y de los desafíos de la urbanización, impactando también en la seguridad y estética de la zona",

    teatro_roma_title: "Teatro Roma",
    teatro_roma_text:
      "El Teatro Roma, ubicado en Sarmiento 109, Avellaneda, es uno de los principales espacios culturales e históricos de la ciudad. Inaugurado en 1904 bajo el nombre de “Teatro del Sur”, su arquitectura refleja la influencia de los grandes coliseos europeos, con una sala en herradura y ornamentación italiana. A lo largo de más de un siglo, el teatro ha sido escenario de ópera, teatro, conciertos y espectáculos comunitarios, consolidándose como un punto de referencia cultural para Avellaneda y la región.",
    teatro_roma_detail:
      "Uno de sus elementos más distintivos es la cúpula con frescos del artista Antonio Epifani, que aporta un valor artístico único al edificio. En años recientes, el teatro fue restaurado con una inversión significativa, incluyendo la fachada, el Salón Dorado y los camarines, reforzando su función como patrimonio histórico y cultural de la ciudad y asegurando su preservación para futuras generaciones.",

    infierno_title: "El Ex infierno de Avellaneda",
    infierno_text:
      "El Ex Infierno fue un centro clandestino de detención, tortura y exterminio que funcionó entre 1976 y 1978 en Avellaneda, durante la última dictadura militar argentina. Estaba destinado a secuestrar y someter a personas consideradas “subversivas” por el régimen. Hoy, el lugar se transformó en el Espacio Municipal de Memoria El Infierno, dedicado a preservar la memoria de las víctimas, promover la educación sobre los delitos de lesa humanidad y generar conciencia sobre la importancia de los derechos humanos.",
    infierno_detail:
      "El edificio recibió el nombre de “El Infierno” debido al horror que se vivía en su interior: detenciones ilegales, torturas y desapariciones forzadas. Actualmente, el espacio cuenta con placas conmemorativas, murales y recorridos educativos, que permiten a la comunidad reflexionar sobre los crímenes cometidos y mantener viva la memoria histórica para las nuevas generaciones.",

    read_more: "Leer más",
    read_less: "Leer menos",
  },

  en: {
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    nombre: "First Name",
    apellido: "Last Name",
    telefono: "Phone",
    success_register: "User registered successfully",
    error_register: "Could not register",
    complete_fields: "Please complete all fields",
    no_account: "Don't have an account? Register",
    login_error: "Email or password incorrect",

    app_name: "avellanedaUnida",
    app_subtitle: "Explore and discover your surroundings",
    map: "Map",
    map_description: "Find locations and points of interest.",
    history: "History",
    history_description: "Learn about the places you visit.",
    recommendations: "You may be interested",
    recommendations_description: "Personalized articles and recommendations.",
    complaint_box: "Complaint Box",

    history_title: "History of Avellaneda Municipality",
    history_subtitle:
      "Avellaneda, located in Buenos Aires province, is one of the most important cities in the Greater Buenos Aires area. Its origin dates back to the 19th century when the region was part of large farms dedicated to agriculture and livestock. The area began to be significantly populated with the arrival of European immigrants, mainly Italians and Spaniards, who contributed to the industrial and commercial development of the region. The city was officially formed as a district in 1852 under the name 'Barracas al Sud'. In 1904, in honor of Argentine President Nicolás Avellaneda, its name was changed to Avellaneda. By the late 19th and early 20th century, Avellaneda had become an important industrial center, with textile factories, metallurgical workshops, and railway workshops. The presence of the port and its proximity to Buenos Aires favored its economic and population growth. Avellaneda is also known for its sporting tradition. It is home to emblematic football clubs like Independiente and Racing Club, which have left a deep mark on Argentine sports history. The city also has a rich cultural life, with theaters, cultural centers, and spaces dedicated to preserving its historical heritage. Today, Avellaneda combines its industrial past with modern urban development. Its neighborhoods reflect the diversity of its inhabitants and history, while its economy remains linked to industry, commerce, and services. The city exemplifies how migration, industry, and culture intertwine to form the identity of a place.",

    cilindro_title: "Construction of the Presidente Perón Stadium (El Cilindro)",
    cilindro_text:
      "Works (1948–1950) and inauguration on September 3, 1950: the Cilindro changed Avellaneda's urban landscape and became a cultural and sports emblem for generations of Racing fans.",
    cilindro_detail:
      "The cylindrical structure that gave it its nickname was built on the site of the old stadium. Since its inauguration, it has hosted championships, concerts, and major social events that shaped the neighborhood's identity.",

    independiente_title:
      "Construction of Libertadores de América Stadium - Ricardo Enrique Bochini",
    independiente_text:
      "The Libertadores de América Stadium, located in Avellaneda, Buenos Aires, is the home of Club Atlético Independiente. Originally inaugurated in 1928 as 'La Doble Visera', it was the first concrete stadium in the country and one of the first in the world exclusively dedicated to football.",
    independiente_detail:
      "One of the most emblematic aspects of the stadium is the main stand designed by Federico Garófalo, which was pioneering at the time: it was 157 meters long, had 31 steps, and a cantilever roof without columns, allowing all spectators a full view of the field. This innovative design marked a milestone in Argentine and world sports architecture.",

    dario_maxi_title: "Darío and Maxi Station",
    dario_maxi_text:
      "Darío and Maxi Station in Avellaneda is an important point of the Roca Railway that combines transport with historical memory, commemorating the young activists Darío Santillán and Maximiliano Kosteki.",
    dario_maxi_detail:
      "The station was renamed in honor of Darío Santillán and Maximiliano Kosteki, two young activists killed by security forces on June 26, 2002 during a social protest. The name change symbolizes memory, justice, and social struggle, and each year ceremonies and murals are held in their memory.",

    avellaneda_conecta_title: "Avellaneda Conecta",
    avellaneda_conecta_text:
      "Avellaneda Conectada is a municipal program aimed at promoting digital and technological inclusion in students of public and subsidized schools in Avellaneda. Through the delivery of personal computers and organization of educational and health activities, the program integrates technology, education, and social welfare.",
    avellaneda_conecta_detail:
      "Each year at Parque La Estación, over 3,700 students receive personal netbooks, while also gaining access to physical and psychological check-ups, showing how the program combines technological education and holistic youth care.",
  },
  pt: {
    login: "Entrar",
    register: "Registrar-se",
    email: "E-mail",
    password: "Senha",
    nombre: "Nome",
    apellido: "Sobrenome",
    telefono: "Telefone",
    success_register: "Usuário registrado com sucesso",
    error_register: "Não foi possível registrar",
    complete_fields: "Preencha todos os campos",
    no_account: "Não tem conta? Cadastre-se",
    login_error: "E-mail ou senha incorretos",

    app_name: "avellanedaUnida",
    app_subtitle: "Explore e descubra seu entorno",
    map: "Mapa",
    map_description: "Encontre locais e pontos de interesse.",
    history: "História",
    history_description: "Aprenda sobre os lugares que você visita.",
    recommendations: "Pode te interessar",
    recommendations_description: "Artigos e recomendações personalizadas.",
    complaint_box: "Caixa de reclamações",

    history_title: "História do Município de Avellaneda",
    history_subtitle:
      "Avellaneda, localizada na província de Buenos Aires, é uma das cidades mais importantes do Grande Buenos Aires. Sua origem remonta ao século XIX, quando a região fazia parte de grandes estâncias dedicadas à agricultura e pecuária. A área começou a ser significativamente povoada com a chegada de imigrantes europeus, principalmente italianos e espanhóis, que contribuíram para o desenvolvimento industrial e comercial da região. A cidade foi oficialmente formada como partido em 1852 sob o nome 'Barracas al Sud'. Em 1904, em homenagem ao presidente argentino Nicolás Avellaneda, seu nome foi alterado para Avellaneda. No final do século XIX e início do XX, Avellaneda se consolidou como um importante centro industrial, com fábricas têxteis, oficinas metalúrgicas e ferroviárias. A presença do porto e sua proximidade com Buenos Aires favoreceram seu crescimento econômico e populacional. Avellaneda também é conhecida por sua tradição esportiva, sendo berço de clubes de futebol emblemáticos como Independiente e Racing Club, que deixaram uma marca profunda na história esportiva argentina. A cidade também possui rica vida cultural, com teatros, centros culturais e espaços dedicados à preservação de seu patrimônio histórico. Hoje, Avellaneda combina seu passado industrial com desenvolvimento urbano moderno. Seus bairros refletem a diversidade de seus habitantes e história, enquanto sua economia continua ligada à indústria, comércio e serviços. A cidade é um exemplo de como migração, indústria e cultura se entrelaçam para formar a identidade de um lugar.",

    cilindro_title: "Construção do Estádio Presidente Perón (El Cilindro)",
    cilindro_text:
      "Obras (1948–1950) e inauguração em 3 de setembro de 1950: o Cilindro mudou a paisagem urbana de Avellaneda e se tornou um emblema cultural e esportivo para gerações de torcedores do Racing.",
    cilindro_detail:
      "A estrutura cilíndrica que deu o apelido foi construída no terreno do antigo estádio. Desde sua inauguração, sediou títulos, shows e grandes eventos sociais que marcaram a identidade do bairro.",

    independiente_title:
      "Construção do Estádio Libertadores de América - Ricardo Enrique Bochini",
    independiente_text:
      "O Estádio Libertadores de América, localizado em Avellaneda, Buenos Aires, é a casa do Club Atlético Independiente. Inaugurado originalmente em 1928 como 'La Doble Visera', foi o primeiro estádio de concreto do país e um dos primeiros no mundo dedicado exclusivamente ao futebol.",
    independiente_detail:
      "Um dos aspectos mais emblemáticos do estádio é a arquibancada principal projetada por Federico Garófalo, que na época foi pioneira: tinha 157 metros de comprimento, 31 degraus e um telhado em balanço sem colunas, permitindo que todos os espectadores tivessem visão completa do campo. Este projeto inovador marcou um marco na arquitetura esportiva argentina e mundial.",

    dario_maxi_title: "Estação Darío e Maxi",
    dario_maxi_text:
      "A Estação Darío e Maxi, em Avellaneda, é um ponto importante da Ferrovia Roca que combina transporte com memória histórica, lembrando os jovens militantes Darío Santillán e Maximiliano Kosteki.",
    dario_maxi_detail:
      "A estação foi renomeada em homenagem a Darío Santillán e Maximiliano Kosteki, dois jovens militantes mortos por forças de segurança em 26 de junho de 2002 durante um protesto social. A mudança de nome simboliza memória, justiça e luta social, e todos os anos são realizados atos e murais em sua homenagem.",

    avellaneda_conecta_title: "Avellaneda Conecta",
    avellaneda_conecta_text:
      "Avellaneda Conectada é um programa municipal que busca promover inclusão digital e tecnológica em estudantes de escolas públicas e subsidiadas de Avellaneda. Por meio da entrega de computadores pessoais e da organização de atividades educacionais e de saúde, o programa integra tecnologia, educação e bem-estar social.",
    avellaneda_conecta_detail:
      "Em um evento anual no Parque La Estación, mais de 3.700 estudantes recebem seus netbooks pessoais, enquanto também têm acesso a exames físicos e psicológicos, mostrando como o programa combina educação tecnológica e cuidado integral com os jovens.",

    elefante_blanco_title: "O Elefante Branco",
    elefante_blanco_text:
      "O Elefante Branco de Avellaneda é um complexo habitacional inacabado localizado na avenida Hipólito Yrigoyen, composto por quatro torres originalmente destinadas a 900 apartamentos com garagens e espaços comuns como academia, piscina e jardim de infância. A construção começou em 2010, mas a obra foi paralisada anos depois, deixando o prédio abandonado. Com o tempo, tornou-se um ícone urbano de projetos inacabados e problemas de planejamento na cidade.",
    elefante_blanco_detail:
      "O mais significativo é que o projeto, pensado como um empreendimento de luxo, acabou afetando muitas famílias que haviam investido no fideicomisso sem receber seus apartamentos. A paralisação transformou o edifício em símbolo de fraude imobiliária e dos desafios da urbanização, impactando também a segurança e a estética da região.",

    teatro_roma_title: "Teatro Roma",
    teatro_roma_text:
      "O Teatro Roma, localizado na Sarmiento 109, Avellaneda, é um dos principais espaços culturais e históricos da cidade. Inaugurado em 1904 sob o nome 'Teatro del Sur', sua arquitetura reflete a influência dos grandes coliseus europeus, com sala em ferradura e ornamentação italiana. Ao longo de mais de um século, o teatro foi palco de óperas, peças, concertos e eventos comunitários, consolidando-se como referência cultural em Avellaneda e região.",
    teatro_roma_detail:
      "Um dos elementos mais distintivos é a cúpula com afrescos do artista Antonio Epifani, que aporta valor artístico único ao edifício. Recentemente, o teatro foi restaurado com investimentos significativos, incluindo fachada, Salão Dourado e camarins, reforçando sua função como patrimônio histórico e cultural e garantindo sua preservação para futuras gerações.",

    infierno_title: "O Ex Inferno de Avellaneda",
    infierno_text:
      "O Ex Inferno foi um centro clandestino de detenção, tortura e extermínio que funcionou entre 1976 e 1978 em Avellaneda, durante a última ditadura militar argentina. Destinado a sequestrar e submeter pessoas consideradas 'subversivas' pelo regime, o local hoje é o Espaço Municipal de Memória El Infierno, dedicado a preservar a memória das vítimas, promover educação sobre crimes de lesa-humanidade e conscientizar sobre direitos humanos.",
    infierno_detail:
      "O edifício recebeu o nome 'El Infierno' devido ao horror vivido em seu interior: detenções ilegais, tortura e desaparecimentos forçados. Atualmente, o espaço conta com placas comemorativas, murais e visitas educativas que permitem à comunidade refletir sobre os crimes cometidos e manter viva a memória histórica para as novas gerações.",

    read_more: "Leia mais",
    read_less: "Leia menos",
  },

};

// Creamos el contexto
const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar fácilmente el contexto
export const useLanguage = () => useContext(LanguageContext);
