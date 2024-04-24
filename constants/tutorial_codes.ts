export const VENV = `python -m venv hidenseek-venv \nsource hidenseek-venv/bin/activate  #On Unix/macOS \nhidenseek-venv\\Scripts\\activate.bat #On Windows`;
export const PIP_INSTALL = `pip install pettingzoo==1.24.0 agilerl==0.1.21 torch==2.1.0 python-dotenv==1.0.1`;
export const NEW_PROJECT = `mkdir hidenseek\ncd hidenseek`;
export const PROJECT_STRUCTURE = `├── environments/
│   ├── __init__.py
│   ├── hidenseek.py
│   └── models.py
├── img/
├── results/
├── utils/
│   ├── __init__.py
│   └── config.py
├── .env
├── main.py
├── train.py
└── walls_configs.json
`;

export const ENV_MODELS = `from enum import Enum
from dataclasses import dataclass
from typing import Self
from typing import List, Dict


class AgentType(Enum):
    """
    Enumerates the types of agents in the game: Hider or Seeker.
    """

    HIDER = 0
    SEEKER = 1

class Agent:
    """
    Represents an agent in the game, which can be either a Hider or a Seeker.

    Attributes:
        name (str): The name of the agent.
        type (AgentType): The type of the agent, either HIDER or SEEKER.
        x (int): The x-coordinate of the agent on the grid.
        y (int): The y-coordinate of the agent on the grid.
    """

    name: str
    type: AgentType
    x: int
    y: int

    def __init__(self, name, type: AgentType, x, y):
        """
        Initializes an Agent with a name, type, and starting coordinates.
        """
        self.name = name
        self.type = type
        self.x = x
        self.y = y

    def reset(self, x, y):
        """
        Resets the agent's position to the given coordinates. Used at the start of a new game or episode.
        """
        self.x = x
        self.y = y



class Movement(Enum):
    """
    Enumerates the possible movements for agents: left, right, up, down, or stay (no movement).
    """

    LEFT = 0
    RIGHT = 1
    UP = 2
    DOWN = 3
    STAY = 4



@dataclass
class HiderRewards:
    """
    Represents the rewards accumulated by a hider during an episode.
    """

    time_reward: float
    next_to_wall_reward: float
    hidden_reward: float
    discovery_penalty: float

    def add(self, rew: Self):
        """
        Adds the rewards from another HiderRewards instance to this one, aggregating the total rewards.
        """
        self.time_reward += rew.time_reward
        self.next_to_wall_reward += rew.next_to_wall_reward
        self.hidden_reward += rew.hidden_reward
        self.discovery_penalty += rew.discovery_penalty

    def get_total_reward(self):
        """
        Calculates the total reward for a hider by summing all rewards and subtracting penalties.
        """
        return (
            self.time_reward
            + self.next_to_wall_reward
            + self.hidden_reward
            + self.discovery_penalty
        )


@dataclass
class SeekerRewards:
    """
    Represents the rewards accumulated by a seeker during an episode.

    Attributes describe various types of rewards and penalties specific to seeker agents.
    """
    time_reward: float
    discovery_reward: float
    discovery_penalty: float

    def add(self, rew: Self):
        """
        Adds the rewards from another SeekerRewards instance to this one, aggregating the total rewards.
        """
        self.time_reward += rew.time_reward
        self.discovery_reward += rew.discovery_reward
        self.discovery_penalty += rew.discovery_penalty

    def get_total_reward(self):
        """
        Calculates the total reward for a seeker by summing all rewards and subtracting penalties.
        """
        return self.time_reward + self.discovery_reward + self.discovery_penalty


@dataclass
class Rewards:
    """
    Holds the reward structures for both hiders and seekers, including total rewards for each group.

    Attributes:
        hiders (Dict[str, HiderRewards]): Rewards for each hider.
        hiders_total_reward (float): Total rewards for all hiders.
        seekers (Dict[str, SeekerRewards]): Rewards for each seeker.
        seekers_total_reward (float): Total rewards for all seekers.
    """
    hiders: Dict[str, HiderRewards]
    hiders_total_reward: float
    seekers: Dict[str, SeekerRewards]
    seekers_total_reward: float

    def add(self, rew: Self):
        """
        Aggregates rewards from another Rewards instance into this one, updating totals and individual rewards.
        """
        self.hiders_total_reward += rew.hiders_total_reward
        self.seekers_total_reward += rew.seekers_total_reward
        for hider in rew.hiders:
            if hider not in self.hiders:
                self.hiders[hider] = rew.hiders[hider]
            else:
                self.hiders[hider].add(rew.hiders[hider])
        for seeker in rew.seekers:
            if seeker not in self.seekers:
                self.seekers[seeker] = rew.seekers[seeker]
            else:
                self.seekers[seeker].add(rew.seekers[seeker])


@dataclass
class Frame:
    """
    Represents a single frame in an episode, capturing the state of the game, actions taken by agents,
    and the outcome of those actions.

    Attributes capture the state of the grid, actions performed, whether agents are done, if the game is won, and which agent was found.
    """
    state: List[List[Dict[str, str]]]
    actions: Dict[str, Dict[str, int]]
    done: Dict[str, Dict[str, int]]
    won: Dict[str, bool]
    found: Dict[str, str]


@dataclass
class Episode:
    """
    Represents an entire episode of gameplay, containing a sequence of frames, the accumulated rewards, and an identifier.

    Attributes:
        number (int): The episode number.
        rewards (Rewards): The accumulated rewards for the episode.
        frames (List[Frame]): A list of frames depicting the episode's progression.
    """
    number: int
    rewards: Rewards
    frames: List[Frame]
`;

export const ENV_HIDENSEEK = `import functools
from copy import copy
import math

import numpy as np
from gymnasium import spaces
from typing import List, Dict, Tuple
from pettingzoo import ParallelEnv

from environments.models import (
    Agent,
    AgentType,
    Movement,
    Rewards,
    HiderRewards,
    SeekerRewards,
)

DISTANCE_COEFFICIENT = 0.1

SEEKER_DISCOVERY_REWARD = 40.0
SEEKER_DISCOVERY_BONUS = 2.5
SEEKER_TIME_REWARD = 0.1
SEEKER_DISCOVERY_PENALTY = -5.0

HIDER_HIDDEN_REWARD = 10.0
HIDER_HIDDEN_BONUS = 2.5
HIDER_DISCOVERY_PENALTY = -5.0
HIDER_TIME_REWARD = 0.1
NEXT_TO_WALL_REWARD = 0.5


class HideAndSeekEnv(ParallelEnv):
    """
    A parallel environment for a hide-and-seek game where multiple agents (hiders and seekers) interact in a grid world.
    The game progresses in discrete time steps, and agents move based on their actions.
    """

    metadata = {
        "name": "hide_and_seek_v1",
    }

    # Class attributes for agents and environment components
    seekers: List[Agent] = []  # List to store seeker agents
    hiders: List[Agent] = []  # List to store hider agents
    wall: List[List[int]] = []  # Grid representing wall placement
    found: Dict[str, str] = {}  # Dictionary to track which hiders have been found
    grid_size = 0  # Size of the grid
    static_seekers = False  # Indicates if seekers stay in their starting position
    static_hiders = False  # Indicates if hiders stay in their starting position
    max_distance = 0  # Maximum possible distance between any two points in the grid

    # Constructor to initialize the environment with given parameters
    def __init__(
        self,
        num_seekers=2,
        num_hiders=2,
        grid_size=7,
        wall=None,
        total_time=50,
        hiding_time=30,
        visibility_radius=2,
        static_hiders=False,
        static_seekers=False,
    ):
        # Agent generation logic - checks if enough agents are provided
        if num_seekers < 2 or num_hiders < 2:
            raise ValueError("Number of seekers and hiders must be at least 2")

        self.static_seekers = static_seekers
        self.static_hiders = static_hiders

        # Initialization of seekers
        # Places seekers at the bottom-right if static, else top-left
        seekers_x = grid_size - 1 if static_seekers else 0
        seekers_y = grid_size - 1 if static_seekers else 0
        self.seekers = [
            Agent(f"seeker_{index}", AgentType.SEEKER, seekers_x, seekers_y)
            for index in range(num_seekers)
        ]

        # Initialization of hiders
        # Places hiders at the bottom-left if static, else top-left
        hiders_x = grid_size - 1 if static_hiders else 0
        hiders_y = 0 if static_hiders else 0
        self.hiders = [
            Agent(f"hider_{index}", AgentType.HIDER, hiders_x, hiders_y)
            for index in range(num_hiders)
        ]

        # Initialize dictionary to track whether hiders have been found, starting with None (not found)
        self.found = {h.name: None for h in self.hiders}

        # Possible agents includes all seekers and hiders by their names
        self.possible_agents = [agent.name for agent in self.seekers + self.hiders]

        # The init method takes in environment arguments.
        self.grid_size = grid_size
        self.max_distance = math.sqrt(2 * (grid_size - 1) ** 2)

        # Wall configuration - setting up walls on the grid
        # A default wall configuration can be passed or an empty grid is initialized
        if wall is None:
            self.wall = [[0] * grid_size] * grid_size
        else:
            # Check if the wall configuration is valid (square matrix of 0s and 1s)
            if len(wall) != grid_size:
                raise ValueError("Wall must be a square matrix")
            for row in wall:
                if len(row) != grid_size:
                    raise ValueError("Wall must be a square matrix")
                for column in row:
                    if column != 0 and column != 1:
                        raise ValueError("Wall must contain only 0 or 1")

            self.wall = wall
        self.walls_coords = self._get_walls_coordinates()  # Get coordinates of walls

        # Initialize visibility radius and total game time
        self.visibility_radius = visibility_radius  # How far can the seeker see
        self.total_game_time = total_time
        self.game_time = total_time
        self.hider_time_limit = hiding_time

    def reset(self):
        """
        Resets the environment state for a new game episode.
        This includes resetting the positions of all agents, the 'found' status of hiders, and the remaining game time.

        Returns the initial observation for all agents.
        """
        # Copy the list of possible agents to the active agents list.
        # This 'resets' the agents so that all are considered active at the start of a new episode.
        self.agents = copy(self.possible_agents)
        # Reset the 'found' status of all hiders to None, indicating that no hiders have been found at the start.
        self.found = {h.name: None for h in self.hiders}

        # Determine the starting position for seekers based on whether they are static or not.
        # If static, they start at the bottom-right corner; otherwise, they start at the top-left.
        seeker_x = self.grid_size - 1 if self.static_seekers else 0
        seeker_y = self.grid_size - 1 if self.static_seekers else 0

        # Reset each seeker to their starting position.
        for seeker in self.seekers:
            seeker.reset(seeker_x, seeker_y)

        # Determine the starting position for hiders based on whether they are static or not.
        # If static, they start at the bottom-left corner; otherwise, they start at the top-left.
        hiders_x = self.grid_size - 1 if self.static_hiders else 0
        hiders_y = 0 if self.static_hiders else 0

        # Reset each hider to their starting position.
        for hider in self.hiders:
            hider.reset(hiders_x, hiders_y)

        # Get the initial observations for all agents.
        observations = self._get_observations()

        # Reset the game time to the total time allocated for the game.
        # This acts like a countdown timer for the duration of the game.
        self.game_time = self.total_game_time

        # Return the initial observations so agents can decide their first move.
        return observations

    def get_positions(self) -> Dict[str, Tuple[int, int]]:
        """
        Retrieves the current positions of all agents in the environment.

        Returns:
        - positions: A dictionary mapping agent names to their current x, y coordinates.
        """
        positions = {}
        for agent in self.seekers + self.hiders:
            positions[agent.name] = (agent.x, agent.y)
        return positions

    def step(self, hiders_actions, seekers_actions):
        """
        Advances the environment by one timestep. Updates agent states and computes new observations and rewards.

        Parameters:
        - hiders_actions: dict containing the actions for each hider agent
        - seekers_actions: dict containing the actions for each seeker agent

        Returns:
        - observations: a new snapshot of the environment after all agents have moved
        - rewards: the amount of reward or penalty received after the move
        - done: a flag indicating if the episode has ended
        - won: which group of agents won the game, if any
        - found: updated information on which hiders have been found
        """

        # Update the positions of the hiders if they are still allowed to move
        if not self._hider_time_limit_exceeded():
            for agent_name in hiders_actions.keys():
                self._move_agent(
                    AgentType.HIDER, agent_name, hiders_actions[agent_name]
                )

        # Update the positions of the seekers if the hiders' time has exceeded and the game is still ongoing
        if self._hider_time_limit_exceeded() and not self._seeker_time_limit_exceeded():
            for agent_name in seekers_actions.keys():
                self._move_agent(
                    AgentType.SEEKER, agent_name, seekers_actions[agent_name]
                )

        # Retrieve the new state of the environment after all agents have moved
        observations = self._get_observations()

        # If hiders' hiding time is up, check if seekers have found any hiders
        if self._hider_time_limit_exceeded():
            for seeker in self.seekers:
                for hider in self.hiders:
                    if self._check_found(seeker.x, seeker.y, hider.x, hider.y):
                        # If a hider is found for the first time, update the 'found' dictionary
                        if self.found[hider.name] is None:
                            self.found[hider.name] = seeker.name

        # Calculate the cumulative rewards based on the new state of the environment
        rewards, won = self._get_cummulative_rewards()

        # Determine if the game is done, which is the case if the list of active agents is empty
        t_done = 1 if self.agents == [] else 0

        # A dictionary that indicates whether the game is over for seekers and hiders
        done = {
            "seekers": {agent.name: t_done for agent in self.seekers},
            "hiders": {agent.name: t_done for agent in self.hiders},
        }

        # Decrement the game time unless it has run out
        if self.game_time > 0:
            self.game_time -= 1  # Decrease the time left with each step

        # Return the new observations, rewards, done status, winning status, and found hiders
        return (
            observations,
            rewards,
            done,
            won,
            {f: self.found[f] for f in self.found},
        )

    def calculate_total_rewards(self):
        """
        Calculates the accumulated rewards for hiders and seekers at the end of an episode.

        Rewards are based on various factors such as the remaining game time, whether hiders
        have been found or not, proximity to walls, and successful discoveries made by seekers.

        The method aggregates both individual rewards for each agent (hiders and seekers) and
        their total group rewards. A discovery bonus is granted to seekers for each hider found,
        while penalties are applied to hiders that have been discovered. Time rewards are given
        based on how long hiders remained hidden or how quickly seekers found them. Additional
        bonuses are granted for hiders that are close to walls, as this is a more strategic
        position in the game.

        The method updates the rewards structure which contains individual rewards, total rewards,
        and a record of which side won the game.

        Returns:
            Rewards: An object containing detailed reward breakdowns for both hiders and seekers.
        """
        # Initialize rewards structure with zero values for all agents.
        rewards = Rewards(
            hiders={h.name: HiderRewards(0.0, 0.0, 0.0, 0.0) for h in self.hiders},
            seekers={s.name: SeekerRewards(0.0, 0.0, 0.0) for s in self.seekers},
            hiders_total_reward=0.0,
            seekers_total_reward=0.0,
            hiders_total_penalty=0.0,
            seekers_total_penalty=0.0,
        )

        # Determine how many hiders are still hidden.
        hidden = len(self.hiders) - len(
            [h for h in self.found if self.found[h] is not None]
        )

        # Allocate rewards to seekers or hiders based on whether hiders have been found.
        if not self._seeker_time_limit_exceeded():
            # If game is ongoing, allocate time-based rewards.
            if hidden == 0:  # If all hiders have been found, seekers win.
                for s in self.seekers:
                    # Time Reward for Seekers
                    rewards.seekers[s.name].time_reward += (
                        SEEKER_TIME_REWARD * self.game_time
                    )
                for h in self.hiders:
                    # Time Reward for Hiders
                    rewards.hiders[h.name].time_reward += HIDER_TIME_REWARD * (
                        self.total_game_time - self.hider_time_limit - self.game_time
                    )
                    # Bonus reward for hiders near walls.
                    if self._is_near_wall(h.x, h.y):
                        rewards.hiders[
                            h.name
                        ].next_to_wall_reward += NEXT_TO_WALL_REWARD

        else:  # If game is over, allocate hiding-based rewards.
            for h in self.hiders:
                # Reward for count of hidden hiders
                rewards.hiders[h.name].hidden_reward += HIDER_HIDDEN_REWARD * hidden

                # Additional bonus if the hider was never found.
                if self.found[h.name] is None:
                    rewards.hiders[h.name].hidden_reward += HIDER_HIDDEN_BONUS

                # Reward for hiding next to the wall
                if self._is_near_wall(h.x, h.y):
                    rewards.hiders[h.name].next_to_wall_reward += NEXT_TO_WALL_REWARD

            for s in self.seekers:
                # Penalty for not finding hiders
                rewards.seekers[s.name].discovery_penalty += (
                    SEEKER_DISCOVERY_PENALTY * hidden
                )

        # Penalize hiders that have been found and reward seekers for each discovery.
        for f in self.found:
            if self.found[f] != None:
                rewards.hiders[f].discovery_penalty += HIDER_DISCOVERY_PENALTY
                rewards.seekers[
                    self.found[f]
                ].discovery_reward += SEEKER_DISCOVERY_BONUS
                for seeker in rewards.seekers:
                    rewards.seekers[seeker].discovery_reward += SEEKER_DISCOVERY_REWARD

        # Sum up total rewards for each group.
        for h in self.hiders:
            rewards.hiders_total_reward += rewards.hiders[h.name].get_total_reward()
            rewards.hiders_total_penalty += rewards.hiders[h.name].discovery_penalty

        for s in self.seekers:
            rewards.seekers_total_reward += rewards.seekers[s.name].get_total_reward()
            rewards.seekers_total_penalty += rewards.seekers[s.name].discovery_penalty

        return rewards

    def _hider_time_limit_exceeded(self):
        """
        Checks if the hiders' time to hide has elapsed, indicating they can no longer move.

        Returns:
            bool: True if the hiding time limit has been exceeded, otherwise False.
        """
        if self.game_time <= self.total_game_time - self.hider_time_limit:
            return True
        return False

    def _seeker_time_limit_exceeded(self):
        """
        Checks if the seekers' time to seek has run out, marking the end of the game.

        Returns:
            bool: True if the game time has reached zero, otherwise False.
        """
        return self.game_time == 0

    def _is_near_wall(self, x, y):
        """
        Determines if the specified coordinates are right next to block.

        Parameters:
        - x (int): The x-coordinate of the location to check.
        - y (int): The y-coordinate of the location to check.

        Returns:
        - bool: True if a wall is next to the specified coordinates, otherwise False.
        """
        if x > 0 and self.wall[x - 1][y] == 1:
            return True
        if x < self.grid_size - 1 and self.wall[x + 1][y] == 1:
            return True
        if y > 0 and self.wall[x][y - 1] == 1:
            return True
        if y < self.grid_size - 1 and self.wall[x][y + 1] == 1:
            return True
        return False

    def _move_agent(self, agent_type: AgentType, name: str, action: int):
        """
        Moves an agent based on the specified action. The movement is constrained by the grid boundaries
        and walls within the environment.

        Parameters:
        - agent_type (AgentType): The type of the agent, either HIDER or SEEKER.
        - name (str): The name identifier of the agent to move.
        - action (int): The action to take, represented by a value from the Movement enum.
        """

        # Find the agent to move by its name and type
        agent = next(
            filter(
                lambda x: x.name == name,
                self.hiders if agent_type == AgentType.HIDER else self.seekers,
            )
        )

        # Retrieve the agent's current position
        x, y = agent.x, agent.y

        # Update the agent's position based on the specified action
        match action:
            case Movement.LEFT.value:  # Move the agent left
                x, y = self._get_new_position(x, y, -1, 0)
            case Movement.RIGHT.value:  # Move the agent right
                x, y = self._get_new_position(x, y, 1, 0)
            case Movement.UP.value:  # Move the agent up
                x, y = self._get_new_position(x, y, 0, -1)
            case Movement.DOWN.value:  # Move the agent down
                x, y = self._get_new_position(x, y, 0, 1)

        # Update the agent's position in the environment
        agent.x = x
        agent.y = y

    def _get_new_position(self, x: int, y: int, dx: int, dy: int):
        """
        Calculates the new position of an agent considering movement and walls.

        Parameters:
        - x, y: Current coordinates of the agent.
        - dx, dy: Direction of movement.

        Returns:
        - (new_x, new_y): Updated coordinates after movement. If the movement is blocked by a wall, returns the original coordinates.
        """

        # Ensure the new position stays within the grid boundaries
        new_x = max(0, min(self.grid_size - 1, x + dx))
        new_y = max(0, min(self.grid_size - 1, y + dy))
        # If the new position is a wall, return the original coordinates
        if self.wall[new_x][new_y] == 1:
            return x, y
        return new_x, new_y

    def _get_walls_coordinates(self):
        """
        Collects the coordinates of all walls in the grid.

        Returns:
        - walls: A list of tuples (x, y) representing the coordinates of each wall.
        """
        walls = []
        for x in range(len(self.wall)):
            for y in range(len(self.wall[x])):
                if self.wall[x][y] == 1:
                    walls.append((x, y))
        return walls

    def _check_found(self, seeker_x, seeker_y, hider_x, hider_y):
        """
        Checks if a seeker has found a hider based on their coordinates.

        Parameters:
        - seeker_x, seeker_y: Coordinates of the seeker.
        - hider_x, hider_y: Coordinates of the hider.

        Returns:
        - bool: True if the seeker and hider are at the same coordinates, otherwise False.
        """
        if seeker_x == hider_x and seeker_y == hider_y:
            return True
        return False

    def _distance(self, x1, y1, x2, y2):
        """
        Calculates the Euclidean distance between two points.

        Parameters:
        - x1, y1: Coordinates of the first point.
        - x2, y2: Coordinates of the second point.

        Returns:
        - The Euclidean distance between the two points.
        """
        dx = x1 - x2
        dy = y1 - y2
        return math.sqrt(dx**2 + dy**2)

    def _check_visibility(self, seeker_x, seeker_y, hider_x, hider_y):
        """
        Determines if a hider is visible to a seeker, considering both distance and walls blocking the line of sight.

        Parameters:
        - seeker_x, seeker_y: Coordinates of the seeker.
        - hider_x, hider_y: Coordinates of the hider.

        Returns:
        - bool: True if the hider is within the seeker's visibility radius and not blocked by walls, otherwise False.
        """
        distance = self._distance(seeker_x, seeker_y, hider_x, hider_y)
        if distance == 0:
            return True

        # Check if the hider is within the specified radial radius
        if distance > self.visibility_radius:
            return False

        dx = hider_x - seeker_x
        dy = hider_y - seeker_y
        # Check for walls along the line of sight
        for t in range(int(distance) + 1):
            x = round(seeker_x + t * (dx / distance))
            y = round(seeker_y + t * (dy / distance))

            # Check if the cell contains a wall
            if (x, y) in self.walls_coords:
                return False

        # If no walls are encountered, the hider is within visibility radius
        return True

    def _get_observation(self, agent: Agent, type: AgentType):
        """
        Constructs the observation vector for an agent, containing the agent's position, wall locations, and visible hiders (for seekers).

        Parameters:
        - agent: The agent for which to construct the observation.
        - type: The type of the agent (HIDER or SEEKER).

        Returns:
        - np.array: The observation vector for the agent.
        """
        m = [agent.x, agent.y]
        for y in range(self.grid_size):
            for x in range(self.grid_size):
                if any([wx == x and wy == y for wx, wy in self.walls_coords]):
                    m.append(1)
                    continue
                hider = list(filter(lambda h: h.x == x and h.y == y, self.hiders))
                if type == AgentType.SEEKER and len(hider) > 0:
                    if self._check_visibility(agent.x, agent.y, x, y):
                        m.append(2)
                    else:
                        m.append(0)
                    continue
                m.append(0)

        # if type == AgentType.SEEKER:
        #     print(agent.name)
        #     self.print_grid(m)
        return np.array(m, dtype=np.float32)

    def _get_observations(self):
        """
        Generates observations for all agents in the environment. Observations may include
        the agent's own position, positions of walls, and positions of other agents depending
        on the agent type (hider or seeker).

        Returns:
            observations (Dict[str, np.array]): A dictionary mapping agent names to their
            respective observation arrays.
        """
        observations = {}
        # Generate observations for seekers based on their visibility
        for agent in self.seekers:
            observations[agent.name] = self._get_observation(agent, AgentType.SEEKER)
        # Generate observations for hiders
        for agent in self.hiders:
            observations[agent.name] = self._get_observation(agent, AgentType.HIDER)

        return observations

    def _get_reward(self, agent_name: str, type: AgentType):
        """
        Computes the reward for a given agent based on its type and current state.

        Parameters:
            agent_name (str): The name of the agent for which to calculate the reward.
            type (AgentType): The type of the agent (either HIDER or SEEKER).

        Returns:
            float: The calculated reward for the agent.
        """
        # Identify the agent from the list and calculate its reward based on distance to others
        agent = next(
            filter(
                lambda x: x.name == agent_name,
                self.hiders if type == AgentType.HIDER else self.seekers,
            )
        )
        if type == AgentType.HIDER:
            # Reward for hiders is based on the distance to the nearest seeker
            return (
                min([self._distance(agent.x, agent.y, s.x, s.y) for s in self.seekers])
                * DISTANCE_COEFFICIENT
            )
        else:
            # Reward for seekers is based on proximity to hiders
            return (
                self.max_distance
                - min([self._distance(agent.x, agent.y, h.x, h.y) for h in self.hiders])
            ) * DISTANCE_COEFFICIENT

    def _get_cummulative_rewards(self):
        """
        Calculates cumulative rewards for all agents based on the current game state, determining
        which team, hiders or seekers, has won if the game is concluded.

        Returns:
            tuple: Contains two elements; a dictionary of rewards for each agent, and a dictionary indicating if a team has won.
        """
        # Initialize rewards structure for hiders and seekers
        rewards = {
            "hiders": {
                h.name: self._get_reward(h.name, AgentType.HIDER) for h in self.hiders
            },
            "seekers": {
                s.name: self._get_reward(s.name, AgentType.SEEKER) for s in self.seekers
            },
        }

        # Sum total rewards for hiders and seekers
        rewards["hiders_total_reward"] = sum(rewards["hiders"].values())
        rewards["seekers_total_reward"] = sum(rewards["seekers"].values())

        # Determine win conditions
        won = {"hiders": False, "seekers": False}
        hidden = len(self.hiders) - len(
            [h for h in self.found if self.found[h] is not None]
        )

        # Determine the winning side based on remaining hiders and game state
        if self._seeker_time_limit_exceeded():
            if hidden > 0:
                won["hiders"] = True
                self._game_over()
            else:
                won["seekers"] = True
                self._game_over()
        else:
            if hidden == 0:
                won["seekers"] = True
                self._game_over()

        return rewards, won

    def _game_over(self):
        """
        Marks the game as over by clearing the list of active agents.
        """
        self.agents = []

    @functools.lru_cache(maxsize=None)
    def action_space(self, agent_name: str):
        """
        Defines the action space for each agent. Here, all agents have the same action space size.

        Parameters:
            agent_name (str): The name of the agent.

        Returns:
            spaces.Discrete(5): The discrete action space with 5 actions for each agent.
        """
        return spaces.Discrete(5)
`;

export const TRAINING_LOOP = `import datetime
import numpy as np
import torch
from agilerl.algorithms.maddpg import MADDPG
from agilerl.algorithms.matd3 import MATD3
from agilerl.components.multi_agent_replay_buffer import MultiAgentReplayBuffer
from typing import List, Dict, Tuple
import os
import json
from enum import Enum
from utils.config import Config
from environments.models import Episode, Frame, Rewards
from environments import hidenseek


class AgentConfig(Enum):
    """
    Defines the behavior modes for agents within the training environment, allowing
    for configuration of static, random, or learning-based agent actions.
    """

    NO_RANDOM = 1
    RANDOM_SEEKERS = 2
    RANDOM_HIDERS = 3
    RANDOM_BOTH = 4
    STATIC_SEEKERS = 5
    STATIC_HIDERS = 6


def save_episode_part(training_date: str, file_n: int, episodes_data: List[Episode]):
    """
    Saves a part of the episode data to a JSON file for later analysis or replay.

    Parameters:
    - training_date (str): The date of the training session, used for organizing saved data.
    - file_n (int): The file number, used for splitting data into manageable parts.
    - episodes_data (List[Episode]): The episode data to be saved.
    """
    save_file = open(f"./results/{training_date}/part{file_n}.json", "w")
    json.dump(episodes_data, save_file, indent=2, default=lambda obj: obj.__dict__)
    save_file.close()


def run_frame(
    observation: Dict[str, np.ndarray],
    agent_config: AgentConfig,
    env: hidenseek.HideAndSeekEnv,
    ep: Episode,
    hiders: MADDPG | MATD3 | None,
    seekers: MADDPG | MATD3 | None,
    buffer_hiders: MultiAgentReplayBuffer | None,
    buffer_seekers: MultiAgentReplayBuffer | None,
    epsilon: float,
    action_dim_hiders: List[int],
    action_dim_seekers: List[int],
    hiders_names: List[str],
    seekers_names: List[str],
) -> Dict[str, np.ndarray]:  # Returns the new observation after executing actions
    """
    Processes a single frame (step) in an episode, handling agent actions, state transitions,
    and learning updates.

    Parameters describe the current state of the environment, agent configurations, the
    learning algorithms for both hiders and seekers, their action spaces, names, and the
    epsilon value for exploration. The function calculates the next state and updates
    the episode object with the results.

    Returns the new observation state after all actions are executed.
    """
    if hiders is not None:
        # If hiders have a learning algorithm, use it to get actions based on observations
        hider_observation = {agent: observation[agent] for agent in hiders_names}
        hiders_cont_actions, hiders_discrete_action = hiders.getAction(
            hider_observation, epsilon
        )
    elif agent_config == AgentConfig.STATIC_HIDERS:
        # If hiders are static, they do not move
        hiders_discrete_action: Dict[str, int] = {
            agent: hidenseek.Movement.STAY.value for agent in hiders_names
        }
    elif agent_config in [AgentConfig.RANDOM_HIDERS, AgentConfig.RANDOM_BOTH]:
        # If hiders are to act randomly, sample actions from their action spaces
        hiders_discrete_action: Dict[str, int] = {
            agent: int(env.action_space(agent).sample()) for agent in hiders_names
        }

    # Prepare continuous actions if necessary, based on agent configuration
    if agent_config in [
        AgentConfig.STATIC_HIDERS,
        AgentConfig.RANDOM_HIDERS,
        AgentConfig.RANDOM_BOTH,
    ]:
        hiders_cont_actions = {
            agent: np.zeros(action_dim_hiders) for agent in hiders_names
        }
        for agent in hiders_names:
            hiders_cont_actions[agent][hiders_discrete_action[agent]] = 1

    # Determine actions for seekers similarly, based on their agent configuration
    if seekers is not None:
        seeker_observation = {agent: observation[agent] for agent in seekers_names}
        seekers_cont_actions, seekers_discrete_action = seekers.getAction(
            seeker_observation, epsilon
        )
    elif agent_config == AgentConfig.STATIC_SEEKERS:
        seekers_discrete_action: Dict[str, int] = {
            agent: hidenseek.Movement.STAY.value for agent in seekers_names
        }
    elif agent_config in [AgentConfig.RANDOM_SEEKERS, AgentConfig.RANDOM_BOTH]:
        # Generate random actions
        seekers_discrete_action: Dict[str, int] = {
            agent: int(env.action_space(agent).sample()) for agent in seekers_names
        }
    if agent_config in [
        AgentConfig.STATIC_SEEKERS,
        AgentConfig.RANDOM_SEEKERS,
        AgentConfig.RANDOM_BOTH,
    ]:
        seekers_cont_actions = {
            agent: np.zeros(action_dim_seekers) for agent in seekers_names
        }
        for agent in seekers_names:
            seekers_cont_actions[agent][seekers_discrete_action[agent]] = 1

    # Execute the determined actions in the environment
    new_obs, rewards, done, won, found = env.step(
        hiders_discrete_action, seekers_discrete_action
    )

    # Add experiences to replay buffers for both hiders and seekers
    # This includes the current observation, actions, received rewards, new observation, and done flags
    if hiders is not None:
        buffer_hiders.save2memory(
            observation,
            hiders_cont_actions,
            rewards["hiders"],
            new_obs,
            done["hiders"],
        )
    if seekers is not None:
        buffer_seekers.save2memory(
            observation,
            seekers_cont_actions,
            rewards["seekers"],
            new_obs,
            done["seekers"],
        )

    # Train both hiders and seekers if conditions are met
    if hiders is not None:
        if (buffer_hiders.counter % hiders.learn_step == 0) and (
            len(buffer_hiders) >= hiders.batch_size
        ):
            experiences = buffer_hiders.sample(hiders.batch_size)
            # Learn according to agent's RL algorithm
            hiders.learn(experiences)
    if seekers is not None:
        if (buffer_seekers.counter % seekers.learn_step == 0) and (
            len(buffer_seekers) >= seekers.batch_size
        ):
            experiences = buffer_seekers.sample(seekers.batch_size)
            # Learn according to agent's RL algorithm
            seekers.learn(experiences)

    # Update the episode object with the current frame's data
    ep.frames.append(
        Frame(
            actions={
                "seekers": {
                    agent_name: int(seekers_discrete_action[agent_name])
                    for agent_name in seekers_discrete_action
                },
                "hiders": {
                    agent_name: int(hiders_discrete_action[agent_name])
                    for agent_name in hiders_discrete_action
                },
            },
            won=won,
            found=found,
        )
    )

    # Accumulate total rewards for hiders and seekers based on the rewards received in this frame
    ep.rewards.hiders_total_reward += rewards["hiders_total_reward"]
    ep.rewards.seekers_total_reward += rewards["seekers_total_reward"]
    # Return the new observation for the next frame
    return new_obs


def run_episode(
    env: hidenseek.HideAndSeekEnv,
    episode: int,
    agent_config: AgentConfig,
    hiders_names: List[str],
    seekers_names: List[str],
    hiders: MADDPG | MATD3 | None,
    seekers: MADDPG | MATD3 | None,
    buffer_hiders: MultiAgentReplayBuffer | None,
    buffer_seekers: MultiAgentReplayBuffer | None,
    epsilon: float,
    action_dim_hiders: List[int],
    action_dim_seekers: List[int],
) -> Episode:
    """
    Executes one full episode of training or evaluation, given the environment and
    configuration for agents. Manages the episode lifecycle from start to finish.

    Collects data for each frame within the episode, handles learning updates for
    agents, and logs episode outcomes.

    Returns the Episode object filled with the episode's data for further analysis or review.
    """

    # Initialize the episode data structure.
    ep: Episode = Episode(
        episode,
        Rewards(
            hiders={},
            hiders_total_reward=0,
            hiders_total_penalty=0,
            seekers={},
            seekers_total_reward=0,
            seekers_total_penalty=0,
        ),
        [],
    )
    # Reset the environment to start a new episode and get the initial observation
    observation = env.reset()

    # Process each frame in the episode until all agents are done
    while env.agents:
        observation = run_frame(
            observation,
            agent_config,
            env,
            ep,
            hiders,
            seekers,
            buffer_hiders,
            buffer_seekers,
            epsilon,
            action_dim_hiders,
            action_dim_seekers,
            hiders_names,
            seekers_names,
        )

    # After the episode ends, calculate total rewards and penalties for the episode
    ep.rewards.add(env.calculate_total_rewards())

    # Append the total rewards for seekers and hiders to their respective score history
    # if the current agent configuration involves learning (non-random) agents
    if agent_config in [
        AgentConfig.NO_RANDOM,
        AgentConfig.RANDOM_HIDERS,
        AgentConfig.STATIC_HIDERS,
    ]:
        seekers.scores.append(ep.rewards.seekers_total_reward)

    if agent_config in [
        AgentConfig.NO_RANDOM,
        AgentConfig.RANDOM_SEEKERS,
        AgentConfig.STATIC_SEEKERS,
    ]:
        hiders.scores.append(ep.rewards.hiders_total_reward)

    # Return the populated episode data structure.
    return ep


def round_up_rewards(ep_data: Episode):
    """
    Rounds up the rewards to 2 decimal places for all agents in the episode data.
    """
    for hider in ep_data.rewards.hiders:
        ep_data.rewards.hiders[hider].time_reward = round(
            ep_data.rewards.hiders[hider].time_reward, 2
        )

    for seeker in ep_data.rewards.seekers:
        ep_data.rewards.seekers[seeker].time_reward = round(
            ep_data.rewards.seekers[seeker].time_reward, 2
        )
    ep_data.rewards.hiders_total_reward = round(ep_data.rewards.hiders_total_reward, 2)
    ep_data.rewards.seekers_total_reward = round(
        ep_data.rewards.seekers_total_reward, 2
    )
    return ep_data


def train_data(agent_config: AgentConfig, config: Config, walls: List[List[int]]):
    """
    Initiates the training process for the hide-and-seek game given a configuration,
    environment settings, and wall structures. Organizes training data collection,
    model updates, and logging.

    Uses Weights & Biases for experiment tracking, and handles the setup and teardown
    of training infrastructure.

    Parameters:
    - agent_config: Specifies the behavior and roles of agents in the training.
    - config: Training and environment configuration.
    - walls: Specifies the layout of walls within the environment.

    Returns a list of Episode objects containing the data from each training episode.
    """

    # Initialize a list to hold the data of each episode
    episodes_data: List[Episode] = []

    # Create the environment for the Hide and Seek game from the specified configuration
    env = hidenseek.HideAndSeekEnv(
        wall=walls,
        num_hiders=config.N_HIDERS,
        num_seekers=config.N_SEEKERS,
        grid_size=config.GRID_SIZE,
        total_time=config.TOTAL_TIME,
        hiding_time=config.HIDING_TIME,
        visibility_radius=config.VISIBILITY,
        static_seekers=agent_config == AgentConfig.STATIC_SEEKERS,
        static_hiders=agent_config == AgentConfig.STATIC_HIDERS,
    )
    initial_positions = env.get_positions()
    env.reset()
    # Set up the computing device for training (GPU or CPU)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    field_names = ["state", "action", "reward", "next_state", "done"]
    # Parameters for epsilon-greedy strategy in exploration
    eps_start = 1.0  # Initial exploration rate
    eps_end = 0.1  # Final exploration rate
    eps_decay = 0.995  # Decay rate of exploration per episode
    epsilon = eps_start  # Current exploration rate

    # Configuration for seekers
    seekers_names = [agent.name for agent in env.seekers]
    # State dimension includes the grid size and agent position
    state_dim_seekers = [
        (config.GRID_SIZE**2 + 2,) for _ in seekers_names
    ]  # +2 for the agent's position
    action_dim_seekers = [
        # Action dimension obtained from the environment's action space
        env.action_space(
            agent
        ).n  # We are calling .n because we have discrete action space
        for agent in seekers_names
    ]

    if agent_config in [
        AgentConfig.NO_RANDOM,
        AgentConfig.RANDOM_HIDERS,
        AgentConfig.STATIC_HIDERS,
    ]:
        # Initialize the replay buffer
        buffer_seekers = MultiAgentReplayBuffer(
            memory_size=1000,
            field_names=field_names,
            agent_ids=seekers_names,
            device=device,
        )

        # NN for seekers agents
        if config.ALGORITHM == "MADDPG":
            seekers = MADDPG(
                state_dims=state_dim_seekers,
                action_dims=action_dim_seekers,
                n_agents=config.N_SEEKERS,
                agent_ids=seekers_names,
                discrete_actions=True,
                min_action=None,
                max_action=None,
                one_hot=False,
                device=device,
            )
        elif config.ALGORITHM == "MATD3":
            seekers = MATD3(
                state_dims=state_dim_seekers,
                action_dims=action_dim_seekers,
                n_agents=config.N_SEEKERS,
                agent_ids=seekers_names,
                discrete_actions=True,
                min_action=None,
                max_action=None,
                one_hot=False,
                device=device,
            )
    else:
        buffer_seekers = None
        seekers = None

    # Configuration for hiders
    hiders_names = [agent.name for agent in env.hiders]
    state_dim_hiders = [(config.GRID_SIZE**2 + 2,) for _ in hiders_names]
    action_dim_hiders = [env.action_space(agent).n for agent in hiders_names]

    if agent_config in [
        AgentConfig.NO_RANDOM,
        AgentConfig.RANDOM_SEEKERS,
        AgentConfig.STATIC_SEEKERS,
    ]:
        buffer_hiders = MultiAgentReplayBuffer(
            memory_size=1000,
            field_names=field_names,
            agent_ids=hiders_names,
            device=device,
        )

        # NN for hiders agents
        if config.ALGORITHM == "MADDPG":
            hiders = MADDPG(
                state_dims=state_dim_hiders,
                action_dims=action_dim_hiders,
                n_agents=config.N_HIDERS,
                agent_ids=hiders_names,
                discrete_actions=True,
                one_hot=False,
                min_action=None,
                max_action=None,
                device=device,
            )
        elif config.ALGORITHM == "MATD3":
            hiders = MATD3(
                state_dims=state_dim_hiders,
                action_dims=action_dim_hiders,
                n_agents=config.N_HIDERS,
                agent_ids=hiders_names,
                discrete_actions=True,
                one_hot=False,
                min_action=None,
                max_action=None,
                device=device,
            )
    else:
        buffer_hiders = None
        hiders = None

    # Variables to keep track of the episode count and file naming
    episode_n = 0
    file_n = 0
    training_date = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    # Create directories for storing results if they don't exist
    if not os.path.exists("./results"):
        os.mkdir("./results")

    if not os.path.exists(f"./results/{training_date}"):
        os.mkdir(f"./results/{training_date}")

    # Main training loop for the specified number of episodes
    for episode in range(config.EPISODES):
        if episode_n == config.EPISODE_PART_SIZE:
            # Save the current part of the episode data and reset the tracker
            file_n += 1
            save_episode_part(training_date, file_n, episodes_data)
            episodes_data: List[Episode] = [episodes_data[0]]
            episode_n = 0

        # Run the episode and collect data
        ep_data = run_episode(
            env,
            episode,
            agent_config,
            hiders_names,
            seekers_names,
            hiders,
            seekers,
            buffer_hiders,
            buffer_seekers,
            epsilon,
            action_dim_hiders,
            action_dim_seekers,
        )
        if episode == 0:
            episodes_data.append(
                {
                    "map": walls,
                    "initial_positions": initial_positions,
                }
            )
        rounded_ep_data = round_up_rewards(ep_data)
        episodes_data.append(rounded_ep_data)
        episode_n += 1
        # Decrease epsilon for the epsilon-greedy policy as training progresses
        epsilon = max(eps_end, epsilon * eps_decay)

    # After all episodes are run, save any remaining episode data
    file_n += 1
    save_file = open(f"./results/{training_date}/part{file_n}.json", "w")
    json.dump(episodes_data, save_file, indent=2, default=lambda obj: obj.__dict__)
    save_file.close()

    # Reset for next training session
    episodes_data: List[Episode] = []
    episode_n = 0

    env.close()  # Clean up the environment resources
`;

export const TRAINING_CONFIG = `from dotenv import load_dotenv
from typing import Self
import os


class Config:
    """
    A configuration class for loading and accessing game settings from environment variables.

    Attributes:
        N_HIDERS (int): Number of hiders in the game.
        N_SEEKERS (int): Number of seekers in the game.
        GRID_SIZE (int): The size of the square grid.
        TOTAL_TIME (int): Total time allotted for each episode.
        HIDING_TIME (int): Time allotted for hiders to hide at the beginning of each episode.
        VISIBILITY (int): Visibility range for seekers.
        EPISODES (int): Number of episodes to run.
        EPISODE_PART_SIZE (int): Number of episodes after which to save a new file.
    """
    config: Self = None
    N_HIDERS: int
    N_SEEKERS: int
    GRID_SIZE: int
    TOTAL_TIME: int
    HIDING_TIME: int
    VISIBILITY: int
    EPISODES: int
    EPISODE_PART_SIZE: int
    ALGORITHM: str

    def __init__(
        self,
        N_HIDERS: int,
        N_SEEKERS: int,
        GRID_SIZE: int,
        TOTAL_TIME: int,
        HIDING_TIME: int,
        VISIBILITY: int,
        EPISODES: int,
        EPISODE_PART_SIZE: int,
        ALGORITHM: str
    ):
        """
        Initializes the configuration with specified values.
        """
        self.N_HIDERS = N_HIDERS
        self.N_SEEKERS = N_SEEKERS
        self.GRID_SIZE = GRID_SIZE
        self.TOTAL_TIME = TOTAL_TIME
        self.HIDING_TIME = HIDING_TIME
        self.VISIBILITY = VISIBILITY
        self.EPISODES = EPISODES
        self.EPISODE_PART_SIZE = EPISODE_PART_SIZE
        self.ALGORITHM = ALGORITHM

    @staticmethod
    def _load_configurations():
        """
        Loads configuration values from a .env file into the Config class.

        Returns:
            A Config instance populated with settings from the environment variables.
        """
        load_dotenv("./.env", verbose=True, override=True)
        return Config(
            N_HIDERS=int(os.getenv("N_HIDERS")),
            N_SEEKERS=int(os.getenv("N_SEEKERS")),
            GRID_SIZE=int(os.getenv("GRID_SIZE")),
            TOTAL_TIME=int(os.getenv("TOTAL_TIME")),
            HIDING_TIME=int(os.getenv("HIDING_TIME")),
            VISIBILITY=int(os.getenv("VISIBILITY")),
            EPISODES=int(os.getenv("EPISODES")),
            EPISODE_PART_SIZE=int(os.getenv("EPISODE_PART_SIZE")),
            ALGORITHM=os.getenv("ALGORITHM")
        )
        
    @staticmethod
    def get():
        """
        Returns a singleton instance of the Config class, loading the configuration from environment variables if not already done.

        Returns:
            The singleton Config instance with loaded settings.
        """
        if Config.config is None:
            Config.config = Config._load_configurations()
        return Config.config
`;

export const CONFIG_ENV = `TOTAL_TIME = 100
HIDING_TIME = 50
VISIBILITY = 2
N_SEEKERS = 2
N_HIDERS = 2

GRID_SIZE = 7
EPISODES = 10000
EPISODE_PART_SIZE = 1000
ALGORITHM='MADDPG'`;

export const MAIN = `from typing import List
import os
import json

# Importing custom classes and functions from local modules
from utils.config import Config
from environments.models import Episode, Frame, Rewards
from train import AgentConfig, train_data


if __name__ == "__main__":
    # Load the main configuration settings for the game
    config = Config.get()
    # Load wall configurations from a JSON file
    walls_configs = json.load(open("walls_configs.json", "r"))

    # Start an infinite loop for the command-line interface
    while True:
        x = input("1. Train\n2. Exit\n")
        # Option 1: Training
        if x == "1":
            # Ask the user for the type of agent configuration they want
            settings = AgentConfig(
                int(
                    input(
                        "1. No random agents"
                        + "2. Random seekers"
                        + "3. Random hiders"
                        + "4. Random seekers and hiders"
                        + "5. Static seekers"
                        + "6. Static hiders"
                    )
                )
            )
            # Ask the user to choose a wall configuration
            walls = int(input("Wall configuration (1-5): ")) - 1
            # Start the training process with the selected settings and wall configurations
            train_data(
                settings,
                config,
                walls_configs[walls],
            )
        # Option 2: Exit the program
        elif x == "2":
            break

        # Handle invalid input
        else:
            print("Wrong input")
`;

export const WALLS_CONFIG = `[
    [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 1]
    ],
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
]
`;
