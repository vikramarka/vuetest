<template>
  <NavBar :name="tempName" />
  <div class="pt-20">
    <div class="max-w-4xl mx-auto  p-8">
      <h1 class="text-left text-2xl">Update Profile</h1>
      <div class="text-center mt-24">
        <div class="flex justify-center my-2 mx-4 md:mx-0">
          <form
            @submit.prevent="submitForm"
            class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          >
            <div class="form-input-group">
              <label class="label">Name</label>
              <input
                v-bind:class="{ 'form-input': true, error: name.error }"
                type="text"
                v-model="name.value"
              />
              <div v-if="name.error" class="form-error">Enter valid name</div>
            </div>
            <button class="btn--primary" type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import { getLoggedInUser, updateUser } from '../services/user';
export default {
  name: 'Profile',
  created: async function() {
    this.user = await getLoggedInUser();
    this.name.value = this.user.name;
    this.tempName = this.name.value;
  },
  data() {
    return {
      name: {
        value: '',
        error: false,
      },
      tempName: '',
    };
  },
  methods: {
    validate: function() {
      this.name.error = !this.name.value;
      return !this.name.error;
    },
    submitForm: function() {
      if (this.validate()) {
        console.log(this.user.email, this.name.value);
        updateUser(this.user.email, this.name.value)
          .then(
            function() {
              this.user = { ...this.user, name: this.name.value };
              this.tempName = this.name.value;
            }.bind(this)
          )
          .catch(function() {}.bind(this));
      }
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style></style>
