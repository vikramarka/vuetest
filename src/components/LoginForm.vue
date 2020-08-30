<template>
  <div class="text-center mt-24">
    <div class="flex justify-center my-2 mx-4 md:mx-0">
      <form
        @submit.prevent="submitForm"
        class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="text-4xl mb-6">Hi! Welcome back.</h2>
        <h2 v-if="loginError" class="text-  xl mb-4 text-red-600">
          Email or Password is wrong
        </h2>
        <div class="form-input-group">
          <label class="label">Email</label>
          <input
            v-bind:class="{ 'form-input': true, error: email.error }"
            type="email"
            v-model="email.value"
          />
          <div v-if="email.error" class="form-error">Enter valid email</div>
        </div>
        <div class="form-input-group">
          <label class="label"> Password</label>
          <input
            v-bind:class="{ 'form-input': true, error: password.error }"
            type="password"
            v-model="password.value"
          />
          <div v-if="password.error" class="form-error">
            Password cannot be empty.
          </div>
        </div>
        <button class="btn--primary" type="submit">Login</button>
        <div class="mt-4">
          Don't have an account?
          <router-link to="/signup">Well.. Create one!</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '../utils/validators';
import { loginUser } from '../services/user';

export default {
  name: 'LoginForm',
  created() {},
  data() {
    return {
      loginError: '',
      email: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
    };
  },
  methods: {
    validate: function() {
      this.email.error = !this.email.value || !validateEmail(this.email.value);
      this.password.error = !this.password.value;
      return !this.email.error && !this.password.error;
    },
    submitForm: function() {
      if (this.validate()) {
        loginUser(this.email.value, this.password.value)
          .then(
            function() {
              this.loginError = '';
              this.$router.push('/dashboard');
            }.bind(this)
          )
          .catch(
            function(e) {
              this.loginError = e;
            }.bind(this)
          );
      }
    },
  },
};
</script>

<style></style>
