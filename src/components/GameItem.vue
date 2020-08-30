<template>
  <router-link
    :to="getLink"
    class="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover relative"
    :style="{ backgroundImage: `url(${imagePath})` }"
  >
    <div
      class="p-6 absolute bottom-0 w-full text-block text-white"
      :style="{ backgroundColor: `#${bgColor}` }"
    >
      <h2 class="text-2xl game-title">
        {{ name }}
      </h2>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GameItem',
  props: ['name', 'imagePath', 'bgColor', 'textColor', 'slug', 'gameId'],
  created: function() {},
  computed: {
    getLink: function() {
      return `/game/${this.gameId}/${this.slug}/`;
    },
  },
};
</script>

<style>
.text-block {
  height: 6em;
}
</style>
