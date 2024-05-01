export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      next: 'Next',
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
        welcomeToQuack: 'Welcome to QUACK!',
        intro: `QUACK is not just any educational tool; it aims at making complex reinforcement learning concepts approachable and
        fun. Inspired by the practice of 'rubber duck debugging' where programmers interrogate their rubber duck with
        questions, QUACK brings you a unique learning experience with hide-and-seek games featuring programmers and ducks.`,
        diveInto: `So dive into the world of Multi-Agent Reinforcement Learning (MARL), explore various algorithms, and watch as our agents learn and evolve through game
        strategies. Whether you are a seasoned programmer or new to the world of artificial intelligence, QUACK is the
        perfect place to witness multi-agent reinforcement learning in action.`,
        contents: 'Contents',
        thisPartIsInteractive: 'This part is interactive!',
      },
      experiments: {
        intro: `This interactive page allows you to delve deep into the background of the training. You are free to choose the training algorithm, the map and the configuration.`,
        hideNSeek: {
          part1: `To make things simple, we have prepared a `,
          part2: `'Hide and Seek'`,
          part3: `environment, where programmers (seekers) try to find ducks (hiders) in a maze. The ducks can hide behind walls, while the programmers can move around the map and try to find the ducks. The ducks win if at least one of them remains hidden, while the programmers win if they find all the ducks before the time runs out.`,
        },
        beforeDivingIn: `Before diving in, let's briefly introduce the concepts of Reinforcement Learning and Multi-Agent Reinforcement Learning. If you are already familiar with these concepts, feel free to skip ahead to the experiment.`,
        rl: {
          title: 'Reinforcement Learning',
          text: `Reinforcement Learning is a type of machine learning where an agent learns to make decisions by performing actions in an environment. Based on the actions it takes, the agent receives rewards or penalties. The goal of RL is for the agent to learn a strategy, or policy, that maximizes the rewards over time. This learning process mimics the way humans learn from their successes and failures.`,
        },
        marl: {
          title: 'Multi-Agent Reinforcement Learning',
          text: `MARL extends RL to scenarios where multiple agents interact within the same environment. These agents can be cooperative, competitive, or both. In MARL, each agent learns to optimize its own policy in response to not only the environment but also the strategies of other agents. This dynamic adds complexity because the optimal strategy for one agent may change as other agents adapt their strategies. MARL is particularly useful in complex systems where multiple entities must work together or compete effectively, such as in games, robotic coordination, and traffic management.`,
        },
        onlyDesktop: `The following part works only on desktop :(`,
        trainingAlgorithm: 'Training Algorithm',
        whatIsATrainigAlgorithm: `What is a Training Algorithm?`,
        whatIsATrainigAlgorithmText: `In machine learning, a training algorithm is a procedure that allows a model (in our case, an agent) to learn
        from data. The algorithm adjusts the model's parameters to minimize errors or maximize success in task
        performance. In reinforcement learning, training algorithms optimize the actions an agent takes to achieve the
        highest cumulative rewards. The algorithm guides how the agent should react in different situations,
        effectively teaching it through trial and error.`,
        choosingTheTrainingAlgorithm: `Choosing the Training Algorithm`,
        choosingTheTrainingAlgorithmText: `Select the algorithm that will be used to train the agents. The choice of algorithm can significantly affect
        the performance of the agents and the time it takes to train them.`,
        maddpg: 'MADDPG: Multi-Agent Deep Deterministic Policy Gradient',
        maddpgText: `is an adaptation of the DDPG algorithm tailored for scenarios involving multiple agents. This approach trains agents together using shared information while allowing them to operate independently during actual tasks. It's particularly useful in situations where the actions of one agent depend on the actions of others, making it ideal for environments that require both cooperation and competition among agents. MADDPG excels in complex scenarios with continuous, high-dimensional action spaces, where agents need to learn sophisticated strategies to interact effectively. For more details, you can refer to the full`,
        documentation: `documentation`,
        matd3: 'MATD3: Multi-Agent Twin Delayed Deep Deterministic Policy Gradient',
        matd3Text: ` builds on the TD3 algorithm to better suit environments with multiple agents. It reduces the common problem of overestimation bias by using two sets of critic networks and delaying updates to the policy networks. This method helps ensure that the agents' evaluations are more accurate and their learning is more stable. MATD3 is particularly effective in complex scenarios where multiple agents interact and influence each other’s decisions. For more information, please see the `,
        trainingMap: 'Training Map',
        selectMap: `Select the map on which the agents will be trained. The map can significantly affect the agents' strategies
        and the complexity of the environment. Each map has unique features that can be used to test different aspects
        of the agents' capabilities.`,
        ifMoreWalls: `If there are more walls, there are more places to hide, and it is harder to find the opponent. If there are
        more open spaces, it is harder to hide, but easier to find the opponent.`,
        balancedClassic: `Balanced Classic`,
        stealthAndPursuit: `Stealth And Pursuit`,
        enduranceHideout: `Endurance Hideout`,
        crossroad: `Crossroad`,
        boxedLabyrinth: `Boxed Labyrinth`,
        innerCircle: `Inner Circle`,
        patchwork: `Patchwork`,
        openField: `Open Field`,
        preMadeConfiguration: `Pre-made configuration`,
        preMadeConfigurationText: `Lastly, select one of the pre-made configurations. The first row specifies the number of hiders (ducks), the
        second row the hiding and seeking time and lastly, the third row the number of seekers (programmers) and their
        visibility radius.`,
        visualization: {
          intro: `Now that you have the algorithm, map, and configuration chosen, let's dive into the training process.`,
          episode: 'Episode',
          explanation: {
            part1: `One hide-n-seek game consists of two parts: hiding and seeking. During the hiding part, only the hiders can move.
            During the seeking time the hiders stay in place, and the seekers try to find them. Every agent can choose one of
            five`,
            part2: `actions`,
            part3: `move left, right, up, down or stay in place. As the environment is
            multi-agent, the group of hiders or seekers move simultaneously.`,
          },
          explanation2: {
            part1: `The game is over if the seekers find all the hiders or if the time runs out. This is called an`,
            part2: `episode`,
            part3: `Every (time)step of the episode is called a`,
            part4: `frame`,
            part5: `So if the game lasts for 40 seconds (or 40 steps), there are 40 frames in the episode. The agents receive`,
            part6: `rewards`,
            part7: `or`,
            part8: `penalties`,
            part9: `based on their actions, and the goal is to maximize the total reward over time. The training process is repeated multiple times to allow
            the agents to learn from their mistakes and improve their strategies. This environment was trained on 10,000
            episodes. We hand-picked some of the episodes to visualize the training process.`,
          },
          explanation3: `The training process can be visualized in the game below. You can play, pause, and restart the game to see how the
          agents perform in different episodes. If you want to learn more details about the training process, you can find
          more information below the visualization part. Enjoy!`,
          interactiveVisualization: `Interactive Visualization`,
          hyperparameters: {
            title: `Hyperparameters`,
            algorithm: `Algorithm`,
            map: `Map`,
            config: `Config`,
            episodeNumber: `Episode Number`,
            hidingSeekingTime: `Hiding/Seeking Time`,
            numberOfSeekers: `Number of Seekers`,
            numberOfHiders: `Number of Hiders`,
            seekersRadius: `Seekers' visibility Radius`,
          },
          gameState: {
            title: `Game State`,
            playerSpeed: `Player Speed:`,
            frame: `Frame:`,
            foundDucks: `Found Ducks:`,
            winnerTeam: `Winner Team:`,
            hidersRewards: `Hiders Rewards`,
            seekersRewards: `Seekers Rewards`,
            totals: `Totals`,
            totalReward: `Total Reward:`,
            totalPenalty: `Total Penalty:`,
            timeReward: `Time Reward:`,
            nextToWallReward: `Next to Wall Reward:`,
            hiddenReward: `Hidden Reward:`,
            discoveryPenalty: `Discovery Penalty:`,
            discoveryReward: `Discovery Reward:`,
          },
          detailedDescription: 'Detailed Description',
          whatHappensFirst: {
            title: 'What happens first?',
            text: {
              part1: `Initially, the main script loads configurations which may include hyperparameters, the number of episodes for
              training, and environment settings. An instance of the hide-and-seek environment is created with the specified
              settings, which includes grid size, number of`,
              part2: `agents`,
              part3: `visibility settings, and hiding/seeking time`,
            },
          },
          trainingProcess: {
            title: 'Training Process',
            text: `In the training process for the hide-and-seek game, a series of complex and interlinked steps are followed to teach
            agents (both hiders and seekers) how to optimize their strategies within the game environment.`,
          },
          episodesAndFrames: {
            title: 'Episodes and Frames',
            text: `Training is structured around episodes. Each episode consists of a sequence of timesteps or frames, during which all
            agents (hiders or seekers) simultaneously take steps based on their current policy. The number of frames in an
            episode corresponds to the total time allowed before the game resets.`,
          },
          agentActionDecision: {
            title: 'Agent Action Decision',
            text: {
              part1: `Each agent's decision-making process at each timestep during an episode is crucial for the overall strategy of the
              game. This process is driven by the chosen learning algorithm, either MADDPG or MATD3, which utilizes a neural
              network to predict the best possible action based on the current state of the environment. The`,
              part2: 'state dimensions',
              part3: `encapsulate all relevant information an agent perceives, including its own position, the positions of other agents within its
              visibility radius, and nearby obstacles.`,
              part4: `Actions are defined within a fixed set of possibilities, represented by the`,
              part5: 'action dimensions',
              part6: `which include movements in four directions and staying in place. The choice of action at each step is influenced
              by the`,
              part7: `epsilon-greedy strategy`,
              part8: `Initially, to encourage exploration of the environment, actions are more likely to be chosen at random. As
              training progresses, epsilon gradually decreases, thereby supporting the agents to act based on what they have
              learnt. In our example, the epsilon value is set to 1.0 at the beginning of training and decreases by 0.001 after
              each episode until it reaches 0.1.`,
              part9: `Once an action is chosen, it is executed in the environment, and the outcome is observed. This includes the new
              state and received rewards or penalties based on the action's effectiveness. The new state is then stored in a`,
              part10: `Multi-Agent Replay Buffer`,
              part11: `During training, the learning algorithm periodically samples batches of experiences from the buffer to update the
              policy model. This update adjusts the weights of the neural network to better predict actions that maximize rewards.`,
            },
          },
          agentsObservationSpace: {
            title: `Agent's observation space`,
            text: {
              part1: `Each agent perceives the environment through its unique observation space, which is a critical component of how it
              navigates and makes decisions during training. The observation space is represented as a`,
              part2: `linear vector`,
              part3: `of 51 numbers`,
              part4: `The first two entries in the vector are the agent's own coordinates (x, y) on the grid. The remaining elements of
              the vector represent a flattened view of the entire grid, encoded to show both static walls and dynamic elements.`,
              part5: `For hiders, the map is encoded with the following values: '0' for empty space, '1' for wall.`,
              part6: `For seekers, the observation space changes dynamically based on the`,
              part7: `visibility radius`,
              part8: `If a hider is within the seeker's visibility radius, the cell is
              marked as '2'. Otherwise, it is marked as '0'. For example, if the visibility radius is set to 3, the seeker can see
              up to 3 cells in each direction (north, south, east, west). He can not see through walls. You can imagine the
              visibility radius as a flashlight in the dark.`,
            },
          },
          rewardSystem: {
            title: `Reward System`,
            text: {
              part1: `The reward system takes into account both the actions of the agents during each step and the final result of an
              episode. For seekers, discovering a hider means getting an immediate reward, encouraging them to actively search the
              environment. On the contrary, hiders receive a penalty if discovered, which encourages strategic hiding.`,
              part2: `Additionally, both seekers and hiders are subject to a distance-based reward system that operates continuously
              throughout the game. For hiders, this means receiving rewards proportional to their distance from the seekers,
              encouraging them to maintain distance and stay hidden. Seekers, on the other hand, are rewarded for closing in on
              hiders, promoting an active search strategy.`,
              part3: `At the end of each episode, the final rewards are given to assess the overall performance of agents throughout the
              game. The method aggregates both individual rewards for each agent (hiders and seekers) and their total group
              rewards. A discovery bonus is granted to the seekers for each hider found, while penalties are applied to hiders
              that have been discovered. Time rewards are given based on how long the hiders remained 4 hidden or how quickly the
              seekers found them. Additional bonuses are granted for hiders that are close to walls, as this is a more strategic
              position in the game. The reward formulas are as follows`,
              part4: `For an individual hider`,
              part5: `For the total reward of all hiders`,
              part6: `For an individual seeker`,
              part7: `For the total reward of all seekers`,
              part8: `If you want to check or calculate the rewards for a specific episode, these are the constants used`,
              part9: `DISTANCE_COEFFICIENT`,
              part10: `TIME_REWARD`,
              part11: `SEEKER_DISCOVERY_REWARD`,
              part12: `SEEKER_DISCOVERY_BONUS`,
              part13: `SEEKER_DISCOVERY_PENALTY`,
              part14: `HIDER_HIDDEN_REWARD`,
              part15: `HIDER_HIDDEN_BONUS`,
              part16: `HIDER_DISCOVERY_PENALTY`,
              part17: `NEXT_TO_WALL_REWARD`,
            },
          },
          policyUpdate: {
            title: `Policy Update`,
            text: `After gathering rewards and storing interactions in the Multi-Agent Replay Buffer, the next crucial phase is the
            policy update. This step is where the learning algorithms refine the agents' decision-making models based on
            accumulated experiences, ensuring continuous improvement and adaptation to the environment.`,
          },
          loggingAndEvaluation: {
            title: `Logging and Evaluation`,
            text: {
              part1: `In MARL, traditional metrics such as loss or accuracy do not capture agent dynamics. To bridge this gap, we used`,
              part2: `W&B tool`,
              part3: `to track and log extensive episodes. This approach
              helped us with the refinement of hyperparameters and reward systems, and offered deeper insights into the neural
              networks driving our agents`,
              part4: `Below you can see the training report for the algorithm you have selected. The report includes all 15 options and shows the reward development during training.`,
            },
          },
        },
      },
      tutorial: {
        intro: `Welcome to the exciting journey of mastering Multi-Agent Reinforcement Learning (MARL) through a fun and interactive hide-and-seek game! This tutorial is designed to guide you through the fundamentals of MARL using the PettingZoo library, combined with other powerful tools like AgileRL and PyTorch. Whether you're a seasoned machine learning practitioner or just starting out, this chapter will set the groundwork for a thrilling adventure in the world of reinforcement learning (RL).`,
        wholeCode: 'Whole code can be found on',
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
          hidenseekText: `This file will contain the code for the hide-and-seek game environment. Detailed descriptions are in the code comments.`,
        },
        training: {
          trainpy: `This part is the core of our hide-and-seek game, where the magic of training happens. It handles everything from
          setting up the game environment, training the agents using advanced algorithms like MADDPG or MATD3, to saving the
          results for analysis. This script is key to improving the agents' strategies over time, ensuring they learn
          effectively from each game played.`,
          configpy: `The hyperparameters and configurations for training are stored in a separate file to make it easier to manage and
          experiment with different settings. This file contains the Configuration class, which is used to load the
          hyperparameters from the .env file. `,
          env: `The .env file is used to store environment variables that are used to configure the training process. This file is
          used to store hyperparameters and other configurations that can be easily modified without changing the code.`,
        },
        main: {
          mainpy: `The main script is the entry point for our game, where the user can choose what option he wants to train. After he
          chooses the option, the training will start.`,
          wallsConfigs: `The walls_configs.json file is used to store the configurations for the maps in the game. This file is used to
          define the position of the walls in the game environment, which can be easily modified without changing the code.
          The '1' specifies a wall, and the '0' specifies an empty space. All maps are 7x7.`,
        },
      },
      furtherReading: {
        introduction:
          'Below are some resources that you can use to learn more about the topics covered in this platform:',
        marlBook: 'MARL book',
        marlResourcesCollection: 'MARL resources collection',
        marlPapersWithCode: 'MARL papers with code',
      },
    },
    sk: {
      next: 'Ďalší krok',
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
        welcomeToQuack: 'Vitajte na QUACK!',
        intro: `QUACK nie je len obyčajný vzdelávací nástroj; jeho cieľom je sprístupniť a zábavným spôsobom priblížiť zložité koncepty posilňovacieho učenia. Je inšpirovaný takzvanou "rubber duck debugging" metódou, v ktorej programátori vysvetľujú problémy svojej gumenej kačičke, ktorá si ich vypočuje a tým pomôže nájsť odpovede. QUACK prináša jedinečný vzdelávací zážitok s hrami na schovávačku, v ktorých sa programátori snažia nájsť gumené kačičky a spýtať sa ich na otázky, ktoré nevedia vyriešiť.`,
        diveInto:
          'Ponorte sa do sveta multiagentového posilňovacieho učenia (MARL), skúmajte rôzne algoritmy a sledujte, ako sa naši agenti učia a vyvíjajú prostredníctvom rôznych stratégií. Či už ste skúsený programátor alebo ste nováčikom vo svete umelej inteligencie, QUACK je ideálnym miestom na pozorovanie multiagentového posilňovaného učenia v akcii.',
        contents: 'Obsah',
        thisPartIsInteractive: 'Táto časť je interaktívna!',
      },
      experiments: {
        intro: `Táto interaktívna časť umožňuje preniknúť hlboko do pozadia trénovania. Môžete si vybrať trénovací algoritmus, mapu a konfiguráciu.`,
        hideNSeek: {
          part1: `Pre zjednodušenie sme pripravili`,
          part2: `prostredie na schovávačku`,
          part3: `kde sa programátori (hľadači) snažia nájsť kačičky (skrývačov) v bludisku. Kačičky sa snažia skrývať za stenami, zatiaľ čo programátori sa snažia nájsť kačičky. Kačičky vyhrávajú, ak aspoň jedna z nich ostane skrytá, zatiaľ čo programátori vyhrávajú, ak nájdu všetky kačičky pred uplynutím času.`,
        },
        beforeDivingIn: `Predtým, než sa pustíme do zábavnej časti, ešte stručne predstavíme koncepty posilňovacieho učenia a multiagentového posilňovacieho učenia. Ak už tieto koncepty poznáte, môžete pokračovať do experimentu.`,
        rl: {
          title: 'Posilňovacie učenie',
          text: `Posilňovacie učenie je typ strojového učenia, v ktorom sa agent učí robiť rozhodnutia tým, že vykonáva akcie v prostredí. Na základe vykonaných akcií agent dostáva odmeny alebo tresty. Cieľom posilňovacieho učenia je, aby sa agent naučil stratégiu, ktorá maximalizuje odmeny. Tento proces napodobňuje spôsob, akým sa ľudia učia zo svojich úspechov a neúspechov.`,
        },
        marl: {
          title: 'Multiagentové posilňovacie učenie',
          text: `MARL rozširuje RL o scenáre, v ktorých viacerí agenti interagujú v rovnakom prostredí. Títo agenti môžu kooperovať, súťažiť, alebo oboje naraz. V MARL sa každý agent učí optimalizovať svoju vlastnú stratégiu v reakcii nielen na prostredie, ale aj na stratégie ostatných agentov. Táto dynamika však vytvára komplexnejší problém, pretože optimálna stratégia pre jedného agenta sa môže meniť, keď sa ostatní agenti prispôsobia svojim stratégiám. MARL je obzvlášť užitočné v komplexných systémoch, kde musí viacero entít efektívne spolupracovať alebo súťažiť, ako napríklad v hrách, koordináciach robotov, či riadení dopravy.`,
        },
        onlyDesktop: `Nasledujúca časť funguje iba na počítači :(`,
        trainingAlgorithm: 'Trénovací algoritmus',
        whatIsATrainigAlgorithm: `Čo je trénovací algoritmus?`,
        whatIsATrainigAlgorithmText: `V strojovom učení je trénovací algoritmus postup, ktorý umožňuje modelu (v našom prípade agentovi) učiť sa z dát. Algoritmus upravuje parametre modelu tak, aby minimalizoval chyby alebo maximalizoval úspech pri plnení úloh. V posilňovacom učení trénovacie algoritmy optimalizujú akcie, ktoré agent vykonáva, aby dosiahol najvyššie kumulatívne odmeny. Algoritmus určuje, ako by sa mal agent správať v rôznych situáciách, prostredníctvom pokusu a omylu.`,
        choosingTheTrainingAlgorithm: `Výber trénovacieho algoritmu`,
        choosingTheTrainingAlgorithmText: `Vyberte algoritmus, ktorý sa použije na trénovanie agentov. Voľba algoritmu môže významne ovplyvniť výkon agentov a čas, ktorý treba na ich trénovanie.`,
        maddpg: 'MADDPG: Multi-Agent Deep Deterministic Policy Gradient',
        maddpgText: ` je adaptáciou algoritmu DDPG určenou pre scenáre s viacerými agentmi. Tento prístup trénuje agentov spoločne s využitím zdieľaných informácií, zatiaľ čo im umožňuje nezávisle konanie. Je obzvlášť užitočný v situáciách, kde akcie jedného agenta závisia od akcií ostatných, čo ho robí ideálnym pre prostredia vyžadujúce kooperáciu aj súťaženie medzi agentmi. MADDPG vyniká v komplexných scenároch s nepretržitými, vysokorozmernými akčnými priestormi, kde sa agenti potrebujú naučiť sofistikované stratégie pre efektívnu interakciu. Pre viac detailov si môžete prečítať celú `,
        documentation: `dokumentáciu`,
        matd3: 'MATD3: Multi-Agent Twin Delayed Deep Deterministic Policy Gradient',
        matd3Text: `je rozšírením algoritmu TD3. Redukuje bežný problém nadhodnotenia použitím dvoch súprav kritických sietí. Táto metóda pomáha zabezpečiť, že hodnotenia agentov sú presnejšie a ich učenie je stabilnejšie. MATD3 je obzvlášť efektívny v komplexných scenároch, kde viacerí agenti interagujú a ovplyvňujú rozhodnutia ostatných. Pre viac informácií si prosím pozrite`,
        trainingMap: 'Trénovacia mapa',
        selectMap: `Vyberte mapu, na ktorej budú agenti trénovaní. Mapa môže významne ovplyvniť stratégie agentov a zložitosť prostredia. Každá mapa má jedinečné vlastnosti, ktoré možno použiť na testovanie rôznych aspektov schopností agentov.`,
        ifMoreWalls: `Ak je viac stien, je viac miest na skrývanie a je tak ťažšie nájsť protivníka. Ak je viac otvorených priestorov, je ťažšie sa skryť, ale ľahšie nájsť protivníka.`,
        balancedClassic: `Vyvážená klasika`,
        stealthAndPursuit: `Tiché prenasledovanie`,
        enduranceHideout: `Skúška vytrvalosti`,
        crossroad: `Križovatka`,
        boxedLabyrinth: `Bludisko`,
        innerCircle: `Vnútorný kruh`,
        patchwork: `Patchwork`,
        openField: `Otvorené pole`,
        preMadeConfiguration: `Predvytvorená konfigurácia`,
        preMadeConfigurationText: `Nakoniec si vyberte jednu z predvytvorených konfigurácií. Prvý riadok špecifikuje počet skrývačov (kačičiek), druhý riadok čas skrývania a hľadania a nakoniec tretí riadok počet hľadačov (programátorov) a ich viditelnosť.`,
        visualization: {
          intro: `Keď už máte vybraný algoritmus, mapu aj konfiguráciu, pustíme sa do trénovacieho procesu.`,
          episode: 'Epizóda',
          explanation: {
            part1: `Jedna hra na schovávačku sa skladá z dvoch častí: zo skrývania a hľadania. Počas skrývania sa môžu pohybovať iba kačičky. Počas hľadania sa kačičky už nehýbu, ale ostávajú na mieste a programátori sa ich snažia nájsť. Každý agent si môže vybrať jednu z piatich`,
            part2: `akcií`,
            part3: `pohnúť sa doľava, doprava, hore, dole alebo ostať na mieste. Nakoľko je prostredie multiagentové, skupina kačičiek alebo skupina programátorov sa pohybuje naraz.`,
          },
          explanation2: {
            part1: `Hra končí ak hľadači nájdu všetkých skrývačov, alebo ak vyprší čas. Toto sa nazýva`,
            part2: `epizóda`,
            part3: `Každý krok epizódy sa nazýva`,
            part4: `snímka`,
            part5: `Takže ak hra trvá 40 sekúnd (alebo 40 krokov), tak má epizóda 40 snímok. Agenti dostávajú`,
            part6: `odmeny`,
            part7: `alebo`,
            part8: `penalizácie`,
            part9: `podľa ich akcií. Cieľom je maximalizovať finálnu odmenu. Trénovací proces je opakovaný niekoľkokrát,
            aby sa agenti mohli učiť z ich chýb a vylepšiť tak ich stratégie. Toto prostredie bolo natrénované na 10 000 epizódach.
            Pre vizualizovanie trénovacieho procesu sme ručne vybrali niekoľko z nich.`,
          },
          explanation3: `Trénovací proces je vizualizovaný v hre nižšie. Hru môžete spustiť, pozastaviť alebo reštartovať. Môžete vidieť, ako sa agenti správajú v rôznych epizódach. Ak chcete získať viac informácií o trénovacom procese, nájdete ich pod vizualizačnou časťou. Užite si to!`,
          interactiveVisualization: `Interaktívna vizualizácia`,
          hyperparameters: {
            title: `Hyperparametre`,
            algorithm: `Algoritmus`,
            map: `Mapa`,
            config: `Konfigurácia`,
            episodeNumber: `Číslo epizódy`,
            hidingSeekingTime: `Čas skrývania/hľadania`,
            numberOfSeekers: `Počet hľadačov`,
            numberOfHiders: `Počet skrývačov`,
            seekersRadius: `Viditeľnosť hľadačov`,
          },
          gameState: {
            title: `Stav hry:`,
            playerSpeed: `Rýchlosť prehrávača:`,
            frame: `Snímka:`,
            foundDucks: `Nájdené kačičky:`,
            winnerTeam: `Víťazný tím:`,
            hidersRewards: `Odmeny skrývačov:`,
            seekersRewards: `Odmeny hľadačov:`,
            totals: `Celkové`,
            totalReward: `Celková odmena:`,
            totalPenalty: `Celková penalizácia:`,
            timeReward: `Odmena za čas:`,
            nextToWallReward: `Odmena za stenu:`,
            hiddenReward: `Odmena za skrytie:`,
            discoveryPenalty: `Penalizácia za objavenie:`,
            discoveryReward: `Odmena za objavenie:`,
          },
          detailedDescription: 'Podrobný popis',
          whatHappensFirst: {
            title: 'Čo sa deje ako prvé?',
            text: {
              part1: `Na začiatku hlavný skript načíta konfigurácie, ktoré obsahujú hyperparametre, počet epizód na trénovanie a nastavenia prostredia. 
              Následne sa vytvorí inštancia prostredia na schovávačku s určenými nastaveniami, ktoré zahŕňajú veľkosť mriežky, počet`,
              part2: `agentov`,
              part3: `nastavenia viditeľnosti, a čas na skrývanie/hľadanie`,
            },
          },
          trainingProcess: {
            title: 'Trénovací proces',
            text: `Trénovací proces pre schovávačku pozostáva zo série zložitých a prepojených krokov, ktoré majú za cieľ naučiť agentov (skrývačov aj hľadačov), ako optimalizovať svoje stratégie v hernom prostredí.`,
          },
          episodesAndFrames: {
            title: 'Epizódy a snímky',
            text: `Trénovanie je štruktúrované do epizód. Každá epizóda pozostáva z postupnosti časových krokov alebo snímok, počas ktorých všetci agenti (skrývači alebo hľadači) súčasne podnikajú kroky na základe svojej aktuálnej stratégie. 
            Počet snímok v epizóde zodpovedá celkovému času pred resetovaním hry.`,
          },
          agentActionDecision: {
            title: 'Rozhodovanie agenta o akcii',
            text: {
              part1: `Rozhodovací proces každého agenta v každom časovom kroku počas epizódy je kľúčový pre celkovú stratégiu hry. Tento proces je riadený zvoleným algoritmom, buď MADDPG alebo MATD3, 
              ktorý využíva neurónovú sieť na predpovedanie najlepšej možnej akcie na základe aktuálneho stavu prostredia.`,
              part2: 'Stavové dimenzie',
              part3: `zahŕňajú všetky relevantné informácie, ktoré agent vníma, vrátane jeho vlastnej pozície, pozícií ostatných agentov v jeho viditeľnom poli a blízkych prekážok.`,
              part4: `Akcie sú definované vo fixnou sadou možností, ktoré sú reprezentované`,
              part5: 'akčnými dimenziami',
              part6: `ktoré zahŕňajú pohyby v štyroch smeroch a zotrvanie na mieste. Voľba akcie v každom kroku je ovplyvnená`,
              part7: `epsilon-greedy stratégiou`,
              part8: `Na začiatku, aby sa podporilo preskúmanie prostredia, sú akcie dosť pravdepodobne vyberané náhodne. Počas trénovania sa epsilon postupne znižuje, čo podporuje agentov konať na základe toho, čo sa naučili. 
              V našom príklade je hodnota epsilon nastavená na 1.0 na začiatku trénovania a po každej epizóde sa znižuje o 0.001, kým nedosiahne hodnotu 0.1.`,
              part9: `Po vybratí akcie sa akcia vykoná v prostredí a pozoruje sa jej výsledok. Ten zahŕňa nový stav a prijaté odmeny alebo penalizácie na základe účinnosti akcie. Nový stav sa potom ukladá do`,
              part10: `Multi-Agent Replay Bufferu`,
              part11: `Počas trénovania algoritmus pravidelne vyberá vzorky skúseností z bufferu a aktualizuje model stratégie. Táto aktualizácia upravuje váhy neurónovej siete tak, aby lepšie predpovedala akcie, ktoré maximalizujú odmeny.`,
            },
          },
          agentsObservationSpace: {
            title: `Pozorovací priestor agenta`,
            text: {
              part1: `Každý agent vníma prostredie prostredníctvom svojho jedinečného pozorovacieho priestoru, ktorý je kľúčovým prvkom pri navigácii a rozhodovaní počas tréningu. Pozorovací priestor je reprezentovaný ako`,
              part2: `lineárny vektor`,
              part3: `pozostávajúci z 51 čísel`,
              part4: `Prvé dve čísla vo vektore reprezentujú súradnice agenta (x, y) na mriežke. Zvyšné prvky vektora predstavujú pohľad na celú mriežku, zakódovaný tak, aby zobrazoval statické steny aj dynamické prvky.`,
              part5: `Pre skrývačov je mapa zakódovaná nasledovne: '0' pre prázdne miesto, '1' pre stenu.`,
              part6: `Pre skrývačov sa priestor mení dynamicky na základe jeho`,
              part7: `viditeľnosti`,
              part8: `Ak sa skrývač nachádza v rámci viditeľnosti hľadača, bunka je označená ako '2'. Inak je označená ako '0'. Napríklad, ak je viditeľnosť nastavená na 3, hľadač môže vidieť až 3 bunky v každom smere (sever, juh, východ, západ). 
              Nemôže však vidieť cez steny. Viditeľnosť si môžete predstaviť ako baterku vo tme.`,
            },
          },
          rewardSystem: {
            title: `Systém odmien`,
            text: {
              part1: `Systém odmien zohľadňuje akcie agentov počas každého kroku a k tomu konečný výsledok epizódy. Pre hľadačov znamená objavenie skrývača okamžitú odmenu, čo ich motivuje k aktívnemu prehľadávaniu prostredia.
              Naopak, skrývači dostanú trest, ak sú objavení, čo ich nabáda k strategickej skrýši.`,
              part2:
                'Okrem toho sú ako hľadači, tak skrývači podrobení systému odmien založených na vzdialenosti, ktorý pôsobí nepretržite počas celej hry. Pre skrývačov to znamená získavanie odmien úmerných ich vzdialenosti od hľadačov, čo ich povzbudzuje udržiavať si odstup a zostať skrytí. Hľadači na druhej strane sú odmeňovaní za približovanie sa k skrývačom, čo podporuje aktívnu vyhľadávaciu stratégiu.',
              part3: `Na konci každej epizódy sú udelené konečné odmeny na posúdenie celkového výkonu agentov počas hry. Metóda agreguje individuálne odmeny pre každého agenta (skrývačov a hľadačov) a ich celkové skupinové odmeny. Za každého nájdeného skrývača je hľadačom udelený objavný bonus, zatiaľ čo skrývačom sú pripočítané penalizácie za ich objavenie. Časové odmeny sú udelené na základe toho, ako dlho skrývači zostali skrytí alebo ako rýchlo ich hľadači našli. Ďalšie bonusy sú udelené skrývačom, ktorí sú blízko stien, pretože to je strategickejšia pozícia v hre. Vzorce pre výpočet odmien sú nasledovné`,
              part4: 'Pre jedného skrývača',
              part5: 'Pre celkovú odmenu všetkých skrývačov',
              part6: 'Pre jedného hľadača',
              part7: 'Pre celkovú odmenu všetkých hľadačov',
              part8: 'Ak chcete skontrolovať alebo vypočítať odmeny za konkrétnu epizódu, toto sú používané konštanty',
              part9: `KOEFICIENT_VZDIALENOSTI`,
              part10: `ČASOVÁ_ODMENA`,
              part11: `HĽADAČ_OBJAVENIE_ODMENA`,
              part12: `HĽADAČ_OBJAVENIE_BONUS`,
              part13: `HĽADAČ_OBJAVENIE_PENALIZÁCIA`,
              part14: `SKRÝVAČ_SKRYTÝ_ODMENA`,
              part15: `SKRÝVAČ_SKRYTÝ_BONUS`,
              part16: `SKRÝVAČ_OBJAVENIE_PENALIZÁCIA`,
              part17: `SKRÝVAČ_STENA_BONUS`,
            },
          },
          policyUpdate: {
            title: `Aktualizácia stratégie`,
            text: 'Po zhromaždení odmien a uložení akcií do Multi-Agent Replay Bufferu nasleduje kľúčová fáza aktualizácie politiky. V tejto etape sa učiace algoritmy zameriavajú na vylepšenie rozhodovacích modelov agentov na základe nahromadených skúseností, čo zabezpečuje nepretržité zlepšovanie a adaptáciu na prostredie.',
          },
          loggingAndEvaluation: {
            title: `Zaznamenávanie a vyhodnocovanie`,
            text: {
              part1:
                'V MARL tradičné metriky ako loss alebo accuracy nezachytávajú dynamiku agentov. Aby sme prekonali túto medzeru, použili sme',
              part2: `W&B nástroj`,
              part3: `na sledovanie trénovacieho procesu. W&B poskytuje bohaté informácie o trénovacích stratégiách, odmenách a stratách, čo umožňuje lepšie pochopenie vývoja agentov`,
              part4: `Nižšie môžete vidieť report z trénovaní, pre algoritmus, ktorý máte vybraný. Report obsahuje všetkých 15 možností, a zobrazuje vývoj odmien počas trénovania.`,
            },
          },
        },
      },
      tutorial: {
        intro: `Vitajte na vzrušujúcej ceste, na ktorej sa prostredníctvom zábavnej a interaktívnej hry na schovávačku naučíte ovládať techniky multiagentového posilňovacieho učenia (MARL)! Tento návod je navrhnutý tak, aby vás sprevádzal základmi MARL pomocou knižnice PettingZoo, v kombinácii s ďalšími silnými nástrojmi ako AgileRL a PyTorch. Či už ste skúsený odborník na strojové učenie alebo v tejto oblasti len začínate, táto kapitola položí základy pre vzrušujúcu cestu svetom posilňovacieho učenia (RL).`,
        wholeCode: `Celý kód je dostupný na stránke`,
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
          models: 'Modely',
          modelsText: `Najskôr vytvorte modely.`,
          hidenseekText: `Tento súbor bude obsahovať kód pre prostredie schovávačky. Podrobné popisy sú v komentároch kódu.`,
        },
        training: {
          trainpy: `Táto časť je jadrom našej schovávačky, tu sa deje celé kúzlo trénovania. Rieši všetko od nastavenia prostredia, trénovania agentov pomocou pokročilých algoritmov ako MADDPG alebo MATD3, až po ukladanie výsledkov pre analýzu. Tento skript je kľúčový pre vylepšovanie stratégií agentov, zabezpečujúc efektívne učenie sa z každej hry, ktorú hrajú.`,
          configpy: `Hyperparametre a konfigurácie pre trénovanie sú uložené v samostatnom súbore, aby bolo jednoduchšie ich spravovanie a experimentovanie s rôznymi nastaveniami. Tento súbor obsahuje triedu Configuration, ktorá sa používa na načítanie hyperparametrov zo súboru .env.`,
          env: `Vyššie spomenutý súbor .env sa používa na ukladanie premenných prostredia, ktoré sa používajú na konfiguráciu trénovacieho procesu. Tento súbor sa používa na ukladanie hyperparametrov a iných konfigurácií, ktoré možno ľahko upraviť bez zmeny kódu.`,
        },
        main: {
          mainpy: `Hlavný skript je vstupným bodom našej hry, v ktorom si užívateľ môže vybrať, akú možnosť chce trénovať. Po výbere možností sa spustí trénovanie.`,
          wallsConfigs: `Súbor walls_configs.json sa používa na ukladanie konfigurácií pre mapy v hre. Definuje pozície stien, ktoré možno ľahko upraviť bez zmeny kódu. '1' značí stenu a '0' prázdne miesto. Všetky mapy sú veľkosti 7x7.`,
        },
      },
      furtherReading: {
        introduction: `Nižšie sú zdroje, ktoré môžete použiť na získanie ďalších informácií o témach, ktoré sme pokryli na tejto platforme:`,
        marlBook: 'MARL kniha',
        marlResourcesCollection: 'MARL kolekcia zdrojov',
        marlPapersWithCode: 'MARL články s kódom',
      },
    },
  },
}));
