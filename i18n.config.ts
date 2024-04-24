export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: {
        introduction: 'Introduction',
        experiments: 'Experiments',
        tutorial: 'Tutorial',
        prerequisities: 'Prerequisities',
        projectStructure: 'Project Structure',
        environment: 'Environment',
        training: 'Training',
        main: 'Main',
        furtherReading: 'Further Reading',
      },
      introduction: {
        intro: `QUACK is not just any educational tool; it aims at making complex reinforcement learning concepts approachable and
        fun. Inspired by the practice of 'rubber duck debugging' where programmers interrogate their rubber duck with
        questions, QUACK brings you a unique learning experience with hide-and-seek games featuring programmers and ducks.`,
        diveInto: `So dive into the world of Multi-Agent Reinforcement Learning (MARL), explore various algorithms, and watch as our agents learn and evolve through game
        strategies. Whether you are a seasoned programmer or new to the world of artificial intelligence, QUACK is the
        perfect place to witness multi-agent reinforcement learning in action.`,
        contents: 'Contents',
        thisPartIsInteractive: 'This part is interactive!',
      },
      tutorial: {
        intro: `Welcome to the exciting journey of mastering Multi-Agent Reinforcement Learning (MARL) through a fun and interactive hide-and-seek game! This tutorial is designed to guide you through the fundamentals of MARL using the PettingZoo library, combined with other powerful tools like AgileRL and PyTorch. Whether you're a seasoned machine learning practitioner or just starting out, this chapter will set the groundwork for a thrilling adventure in the world of reinforcement learning (RL).`,
        prerequisities: {
          intro: `Before we dive into the core concepts and hands-on coding, it's crucial to ensure that your environment is properly set up. This tutorial requires specific versions of libraries. Here's how to get started:`,
          venv: 'Virtual Environment (recommended)',
          python: `If you don't have Python installed, you can download it from the official`,
          pythonWebsite: 'Python website',
          newProject: `To start a new Python project, first, create a directory for your project and navigate into it.`,
          venvText: `Once inside your project directory, set up a virtual environment to manage your project's dependencies separately from your global Python environment. This ensures that your project is using the right versions of the libraries it needs without interfering with any other Python projects you might have.`,
          pip: 'Required Libraries',
          pettingZoo: `PettingZoo: Is to MARL what Gym is to traditional single-agent RL. It provides a simple, consistent API for interacting with a wide variety of multi-agent environments. Our hide-and-seek game is built on top of PettingZoo, taking advantage of its intuitive environment management and simulation capabilities.`,
          agileRL: `AgileRL: A tool to streamline the development of RL agents, focusing on agility and experimentation.`,
          pytorch: `PyTorch: The backbone of our model development.`,
          pythonDotenv: `python-dotenv: Manages environment variables, which we will use to store our configurations.`,
        },
        projectStructure: {
          intro: `To keep your project organized and maintainable, it's essential to structure it properly. Here's a recommended project structure:`,
        },
        environment: {
          models: 'Models',
          modelsText: `First, let's create models.`,
          hidenseek: 'Hide-and-Seek environment',
          hidenseekText: `Create a new file called hidenseek.py in the models directory. This file will contain the code for the hide-and-seek game environment.`,
        },
      },
    },
    sk: {
      nav: {
        introduction: 'Úvod',
        experiments: 'Experimenty',
        tutorial: 'Návod',
        prerequisities: 'Požiadavky',
        projectStructure: 'Štruktúra projektu',
        environment: 'Prostredie',
        training: 'Trénovanie',
        main: 'Spustenie',
        furtherReading: 'Ďalšie čítanie',
      },
      introduction: {
        intro: `QUACK nie je len obyčajný vzdelávací nástroj; jeho cieľom je sprístupniť a zábavným spôsobom priblížiť zložité koncepty posilňovacieho učenia. Je inšpirovaný takzvanou "rubber duck debugging" metódou, v ktorej programátori vysvetľujú problémy svojej gumenej kačičke, ktorá si ich vypočuje a tým pomôže nájsť odpovede. QUACK prináša jedinečný vzdelávací zážitok s hrami na schovávačku, v ktorých sa programátori snažia nájsť gumené kačičky a spýtať sa ich na otázky, ktoré nevedia vyriešiť.`,
        diveInto:
          'Ponorte sa do sveta multiagentového posilňovacieho učenia (MARL), skúmajte rôzne algoritmy a sledujte, ako sa naši agenti učia a vyvíjajú prostredníctvom rôznych stratégií. Či už ste skúsený programátor alebo ste nováčikom vo svete umelej inteligencie, QUACK je ideálnym miestom na pozorovanie multiagentového posilňovaného učenia v akcii.',
        contents: 'Obsah',
        thisPartIsInteractive: 'Táto časť je interaktívna!',
      },
      tutorial: {
        intro: `Vitajte na vzrušujúcej ceste, na ktorej sa prostredníctvom zábavnej a interaktívnej hry na schovávačku naučíte ovládať techniky multiagentového posilňovacieho učenia (MARL)! Tento návod je navrhnutý tak, aby vás sprevádzal základmi MARL pomocou knižnice PettingZoo, v kombinácii s ďalšími silnými nástrojmi ako AgileRL a PyTorch. Či už ste skúsený odborník na strojové učenie alebo v tejto oblasti len začínate, táto kapitola položí základy pre vzrušujúcu cestu svetom posilňovacieho učenia (RL).`,
        prerequisities: {
          intro: `Predtým, než sa pustíte do programovania, je dôležité zabezpečiť, aby vaše prostredie bolo správne nastavené. Tento návod vyžaduje špecifické verzie knižníc: `,
          python: `Ak nemáte nainštalovaný Python, môžete si ho stiahnuť z oficiálnej`,
          pythonWebsite: 'Python stránky',
          newProject: `Pre vytvorenie nového Python projektu najprv vytvorte adresár pre váš projekt a prejdite doň.`,
          venv: 'Virtuálne prostredie (odporúčané)',
          venvText: `Po vytvorení adresára vytvorte virtuálne prostredie, ktoré bude spravovať závislosti vášho projektu oddelene od globálneho Python prostredia. Týmto sa zabezpečí, že váš projekt bude používať správne verzie knižníc, bez toho, aby sa miešal s inými Python projektmi, ktoré už možno máte vytvorené.`,
          pip: 'Požadované knižnice',
          pettingZoo: `PettingZoo: PettingZoo je pre MARL tým, čím je Gym pre tradičné RL s jedným agentom. Poskytuje jednoduché a konzistentné API pre interakciu s rôznymi multiagentovými prostrediami. Naša hra na skrývačku je postavená na základe PettingZoo, využívajúc jeho intuitívne spravovanie prostredia a simulačné schopnosti.`,
          agileRL: `AgileRL: Nástroj na zefektívnenie vývoja RL agentov, zameraný na agilitu a experimentovanie.`,
          pytorch: `PyTorch: Základ vývoja našich modelov.`,
          pythonDotenv: `python-dotenv: Spravuje premenné, ktoré použijeme na konfiguráciu prostredia.`,
        },
        projectStructure: {
          intro: `Aby bol váš projekt logicky zorganizovaný, je dôležité ho správne štruktúrovať. Tu je odporúčaná štruktúra projektu:`,
        },
        environment: {
          models: 'Models',
          modelsText: `First, let's create models.`,
          hidenseek: 'Hide-and-Seek environment',
          hidenseekText: `Create a new file called hidenseek.py in the models directory. This file will contain the code for the hide-and-seek game environment.`,
        },
      },
    },
  },
}));
