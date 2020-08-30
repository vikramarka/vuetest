<template>
  <NavBar :name="user?.name" />
  <div class="pt-20">
    <div class="flex max-w-4xl mx-auto  p-8 justify-between items-center">
      <h1 class="text-2xl">List of Games</h1>
      <div class="flex items-center">
        <input
          v-model="searchTerm"
          type="text"
          class="search-input form-input"
        />
        <div class="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style="width:30px;margin-left:8px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="gamesLoading">Loading...</div>
    <div v-else-if="filteredGames.length == 0">
      0 results found for {{ searchTerm }}.
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 max-w-4xl mx-auto px-8"
    >
      <div
        class="bg-white rounded text-grey-darkest shadow-md game-item"
        v-for="game in filteredGames"
        :key="game"
      >
        <GameItem
          :name="game.name"
          :imagePath="game.background_image"
          :bgColor="game.dominant_color"
          :gameId="game.id"
          :slug="game.slug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getLoggedInUser } from '../services/user';
import { getGames } from '../services/games';
import NavBar from '../components/NavBar';
import GameItem from '../components/GameItem';
export default {
  name: 'dashboard',
  methods: {
    filterGames: function() {
      if (this.searchTerm.trim() === '') {
        this.filteredGames = this.games;
      } else {
        this.filteredGames = this.games.filter((game) => {
          return (
            game.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
          );
        });
      }
      console.log(this.filteredGames);
    },
  },
  created: async function() {
    this.user = await getLoggedInUser();
    let games = await getGames();
    this.games = games.results;
    this.gamesLoading = false;
    this.filterGames();
  },
  data() {
    return {
      user: null,
      games: [],
      gamesLoading: true,
      searchTerm: '',
      filteredGames: [],
    };
  },
  components: {
    NavBar,
    GameItem,
  },
  watch: {
    searchTerm: function() {
      this.filterGames();
    },
  },
};
</script>

<style>
.game-item {
  height: 30em;
}
.form-input.search-input {
  width: 20em;
}
.search-icon {
  display: inline-block;
}
</style>
