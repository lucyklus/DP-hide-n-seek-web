<template>
  <h2 class="mt-10">Detailed description</h2>
  <h3 class="underline">What happens first?</h3>
  <p class="main-text">
    Initially, the main script loads configurations which may include hyperparameters, the number of episodes for
    training, and environment settings. An instance of the hide-and-seek environment is created with the specified
    settings, which includes grid size, number of <span class="purple-text">agents</span>, visibility settings, and
    hiding/seeking time.
  </p>
  <h3 class="underline">Training process</h3>
  <p class="main-text">
    In the training process for the hide-and-seek game, a series of complex and interlinked steps are followed to teach
    agents (both hiders and seekers) how to optimize their strategies within the game environment.
  </p>
  <h4>Episodes and frames</h4>
  <p class="main-text">
    Training is structured around episodes. Each episode consists of a sequence of timesteps or frames, during which all
    agents (hiders or seekers) simultaneously take steps based on their current policy. The number of frames in an
    episode corresponds to the total time allowed before the game resets.
  </p>
  <h4>Agent action decision</h4>
  <p class="main-text">
    Each agent's decision-making process at each timestep during an episode is crucial for the overall strategy of the
    game. This process is driven by the chosen learning algorithm, either MADDPG or MATD3, which utilizes a neural
    network to predict the best possible action based on the current state of the environment. The
    <span class="purple-text">state dimensions</span> encapsulate all relevant information an agent perceives, including
    its own position, the positions of other agents within its visibility radius, and nearby obstacles. <br /><br />

    Actions are defined within a fixed set of possibilities, represented by the
    <span class="purple-text">action dimensions</span>, which include movements in four directions and staying in place.
    The choice of action at each step is influenced by the <span class="purple-text">epsilon-greedy strategy</span>.
    Initially, to encourage exploration of the environment, actions are more likely to be chosen at random. As training
    progresses, epsilon gradually decreases, thereby supporting the agents to act based on what they have learnt. In our
    example, the epsilon value is set to 1.0 at the beginning of training and decreases by 0.001 after each episode
    until it reaches 0.1. <br /><br />

    Once an action is chosen, it is executed in the environment, and the outcome is observed. This includes the new
    state and received rewards or penalties based on the action's effectiveness. The new state is then stored in a
    <span class="purple-text">Multi-Agent Replay Buffer</span>. During training, the learning algorithm periodically
    samples batches of experiences from the buffer to update the policy model. This update adjusts the weights of the
    neural network to better predict actions that maximize rewards.
  </p>
  <h4>Agent's observation space</h4>
  <span class="main-text">
    Each agent perceives the environment through its unique observation space, which is a critical component of how it
    navigates and makes decisions during training. The observation space is represented as a
    <span class="purple-text">linear vector</span> of 51 numbers. <br /><br />

    The first two entries in the vector are the agent's own coordinates (x, y) on the grid. The remaining elements of
    the vector represent a flattened view of the entire grid, encoded to show both static walls and dynamic elements.<br /><br />
    For hiders, the map is encoded with the following values: '0' for empty space, '1' for wall.
    <br />
    For seekers, the observation space changes dynamically based on the
    <span class="purple-text">visibility radius</span>. If a hider is within the seeker's visibility radius, the cell is
    marked as '2'. Otherwise, it is marked as '0'. For example, if the visibility radius is set to 3, the seeker can see
    up to 3 cells in each direction (north, south, east, west). He can not see through walls. You can imagine the
    visibility radius as a flashlight in the dark.
  </span>
  <h4>Reward system</h4>
  <span class="main-text"
    >The reward system takes into account both the actions of the agents during each step and the final result of an
    episode. For seekers, discovering a hider means getting an immediate reward, encouraging them to actively search the
    environment. On the contrary, hiders receive a penalty if discovered, which encourages strategic hiding.
    <br /><br />
    Additionally, both seekers and hiders are subject to a distance-based reward system that operates continuously
    throughout the game. For hiders, this means receiving rewards proportional to their distance from the seekers,
    encouraging them to maintain distance and stay hidden. Seekers, on the other hand, are rewarded for closing in on
    hiders, promoting an active search strategy. <br /><br />

    At the end of each episode, the final rewards are given to assess the overall performance of agents throughout the
    game. The method aggregates both individual rewards for each agent (hiders and seekers) and their total group
    rewards. A discovery bonus is granted to the seekers for each hider found, while penalties are applied to hiders
    that have been discovered. Time rewards are given based on how long the hiders remained 4 hidden or how quickly the
    seekers found them. Additional bonuses are granted for hiders that are close to walls, as this is a more strategic
    position in the game. The reward formulas are as follows:
    <ul class="ml-5 my-5 list-disc">
      <li class="mb-10">
        For an individual hider:<br />
        <span v-html="eq1"></span>
      </li>
      <li class="mb-10">For the total reward of all hiders:<br /><span v-html="eq2"></span></li>
      <li class="mb-10">For an individual seeker:<br /><span v-html="eq3"></span></li>
      <li>For the total reward of all seekers:<br /><span v-html="eq4"></span></li>
    </ul>
    <!-- TODO: distance reward -->
    If you want to check or calculate the rewards for a specific episode, these are the constants used:
    <ul class="ml-5 mt-5 list-disc">
      <li class="mb-2">DISTANCE_COEFFICIENT = 0.1</li>
      <li class="mb-2">TIME_REWARD = 0.1</li>
      <li class="mb-2">SEEKER_DISCOVERY_REWARD = 40.0</li>
      <li class="mb-2">SEEKER_DISCOVERY_BONUS = 2.5</li>
      <li class="mb-2">SEEKER_DISCOVERY_PENALTY = -5.0</li>
      <li class="mb-2">HIDER_HIDDEN_REWARD = 10.0</li>
      <li class="mb-2">HIDER_HIDDEN_BONUS = 2.5</li>
      <li class="mb-2">HIDER_DISCOVERY_PENALTY = -5.0</li>
      <li>NEXT_TO_WALL_REWARD = 0.5</li>
    </ul>
  </span>
  <h4>Policy update</h4>
  <span class="main-text">
    After gathering rewards and storing interactions in the Multi-Agent Replay Buffer, the next crucial phase is the
    policy update. This step is where the learning algorithms refine the agents' decision-making models based on
    accumulated experiences, ensuring continuous improvement and adaptation to the environment.
  </span>
  <h3 class="underline">Logging and Evaluation</h3>
  <span class="main-text"
    >In MARL, traditional metrics such as loss or accuracy do not capture agent dynamics. To bridge this gap, we used
    <a class="underline" href="https://wandb.ai/"> W&B tool </a>to track and log extensive episodes. This approach
    helped us with the refinement of hyperparameters and reward systems, and offered deeper insights into the neural
    networks driving our agents. <br /><br />
    Below you can see two charts representing the training process of a MADDPG algorithm, on a crossroad map and with
    balanced classic configuration.
  </span>
  <!-- TODO: iframe approach? -->
  <div class="flex justify-between items-center mx-auto space-x-5 my-5">
    <img src="/img/MADDPG_m1_c1_hiders.png" alt="MADDPG crossroad" class="w-1/2" />
    <img src="/img/MADDPG_m1_c1_seekers.png" alt="MADDPG balanced" class="w-1/2" />
  </div>
</template>

<script lang="ts" setup>
import katex from 'katex';

const eq1 = ref<string>('');
const eq2 = ref<string>('');
const eq3 = ref<string>('');
const eq4 = ref<string>('');
onMounted(() => {
  eq1.value = katex.renderToString(
    'Reward_{{hider}_i} = \\sum_{t=1}^{T} ({distance\\_reward}_{i, t}) + {time\\_reward}_i + {discovery\\_penalty}_i + {next\\_to\\_wall\\_reward}_i + {hidden\\_reward}_i',
    {
      throwOnError: false,
    },
  );
  eq2.value = katex.renderToString('Total\\_Reward\\_Hiders = \\sum_{i=1}^{N} Reward_{{hider}_i}', {
    throwOnError: false,
  });
  eq3.value = katex.renderToString(
    'Reward_{{seeker}_j} = \\sum_{t=1}^{T} ({distance\\_reward}_{j, t}) + {time\\_reward}_j + {discovery\\_reward}_j + {discovery\\_penalty}_j',
    {
      throwOnError: false,
    },
  );
  eq4.value = katex.renderToString('Total\\_Reward\\_Seekers = \\sum_{j=1}^{N} Reward_{{seeker}_j}', {
    throwOnError: false,
  });
});
</script>
<style>
span[aria-hidden='true'] {
  display: none;
}
</style>
