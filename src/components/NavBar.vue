<template>
  <!-- <header class="flex bg-blue-600 px-4 py-4">
    <div class="text-white text-2xl">
      Welcome Vikram!
    </div>
  </header> -->
  <header
    class="lg:px-16 px-6 bg-blue-600 flex flex-wrap items-center lg:py-0 py-2 fixed w-full z-50"
  >
    <div
      class="flex-1 flex justify-between items-center font-bold text-white text-2xl"
    >
      Welcome {{ name }}!
    </div>

    <label for="menu-toggle" class="pointer-cursor lg:hidden block"
      ><svg
        class="fill-current text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg
    ></label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      <nav>
        <ul
          class="lg:flex items-center justify-between text-base text-white pt-4 lg:pt-0"
        >
          <li>
            <router-link
              to="/profile"
              class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white"
              >Profile</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard"
              class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link
              @click.once="logout"
              to=""
              class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white"
              >Logout</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { logoutUser } from '../services/user';
export default {
  name: 'NavBar',
  props: ['name'],
  methods: {
    logout: function() {
      logoutUser().then(
        function() {
          this.$router.push('/');
        }.bind(this)
      );
    },
  },
};
</script>

<style></style>
