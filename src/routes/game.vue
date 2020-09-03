<template>
  <NavBar :name="user?.name" />
  <div class="game-details">
    <div v-if="detailsLoading">Loading...</div>
    <div v-else>
      <div
        :style="{
          backgroundImage: `url(${this.gameDetails.background_image})`,
        }"
        class="banner-image bg-no-repeat bg-center bg-cover"
      >
        <div class="game-info font-bold">
          <h1 class="text-4xl game-title">{{ gameDetails.name }}</h1>
          <span class="game-desc block" v-html="gameDetails.description"></span>
        </div>
      </div>
      <div class="max-w-4xl mx-auto p-8 text-left">
        <h1 class="text-xl font-bold">Developers: {{ getDevelopers }}</h1>
        <h1 class="text-xl font-bold">Publishers: {{ getPublishers }}</h1>
        <div class="my-5" v-html="gameDetails.description"></div>
      </div>
      <video
        :src="gameDetails.clip.clip"
        muted
        autoplay
        loop
        class="w-full mt-4"
      ></video>
      <div class="max-w-4xl mx-auto p-8 text-left">
        <h1 class="text-xl font-bold">
          Click the any of the below links to buy this game.
        </h1>
        <ul>
          <li v-for="store in gameDetails.stores" :key="store">
            <a :href="store.url" target="_blank">{{ store.store.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoggedInUser } from "../services/user";
import { getGameDetails } from "../services/games";
import NavBar from "../components/NavBar";
export default {
  name: "game",
  components: {
    NavBar,
  },
  data() {
    return {
      user: null,
      detailsLoading: true,
      gameDetails: null,
    };
  },
  created: async function () {
    this.user = await getLoggedInUser();
    let gameId = this.$route.params.gameId;
    let gameDetails = await getGameDetails(gameId);
    this.gameDetails = gameDetails;
    console.log(gameDetails);
    this.detailsLoading = false;
  },
  computed: {
    getDevelopers: function () {
      var developers = "";
      for (var i = 0; i < this.gameDetails.developers.length; i++) {
        developers += this.gameDetails.developers[i].name;
        if (i < this.gameDetails.developers.length - 1) {
          developers += ", ";
        }
      }
      return developers;
    },

    getPublishers: function () {
      var publishers = "";
      for (var i = 0; i < this.gameDetails.publishers.length; i++) {
        publishers += this.gameDetails.publishers[i].name;
        if (i < this.gameDetails.publishers.length - 1) {
          publishers += ", ";
        }
      }
      return publishers;
    },
  },
};
</script>

<style>
.game-details {
  padding-top: 58px;
}
.banner-image {
  height: 75vh;
}
.game-info {
  text-align: right;
  padding: 50px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  height: 100%;
  color: white;
}
.game-title {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.game-desc {
  max-width: 500px;
  max-height: 450px;
  overflow: auto;
  float: right;
  text-align: justify;
}
</style>
