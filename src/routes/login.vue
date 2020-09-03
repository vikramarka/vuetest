<template>
  <LoginForm />
  <h2 class="my-6" @click="getRandomJoke()">
    {{ !joke ? "Getting a random joke..." : joke }}
  </h2>
</template>

<script>
import LoginForm from "../components/LoginForm";
import getRandomChuckNorrisJoke from "../services/chucknorris";
export default {
  name: "Login",
  created: function () {
    this.getRandomJoke();
  },
  components: {
    LoginForm,
  },
  data() {
    return {
      joke: "",
    };
  },
  methods: {
    getRandomJoke: async function () {
      this.joke = "";
      let res = await getRandomChuckNorrisJoke();
      this.joke = res.value;
    },
  },
};
</script>

<style></style>
