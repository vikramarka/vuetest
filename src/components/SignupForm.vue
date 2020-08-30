<template>
  <div class="text-center mt-24">
    <div class="flex justify-center my-2 mx-4 md:mx-0">
      <form
        @submit.prevent="submitForm"
        class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
        novalidate
      >
        <h2 class="text-4xl mb-6">Signup</h2>
        <div class="form-input-group">
          <label class="label">Name</label>
          <input
            v-bind:class="{ 'form-input': true, error: name.error }"
            type="text"
            v-model="name.value"
          />
          <div v-if="name.error" class="form-error">Name must not be empty</div>
        </div>
        <div class="form-input-group">
          <label class="label">Email address</label>
          <input
            v-bind:class="{ 'form-input': true, error: email.error }"
            type="email"
            v-model="email.value"
          />
          <div v-if="email.error" class="form-error">Enter valid email</div>
          <div v-if="registrationError" class="form-error">
            User already exists
          </div>
        </div>
        <div class="form-input-group">
          <label class="label">Password</label>
          <input
            v-bind:class="{ 'form-input': true, error: password.error }"
            type="password"
            v-model="password.value"
          />
          <div v-if="password.error" class="form-error">
            Password cannot be empty.
          </div>
        </div>
        <div class="form-input-group">
          <label class="label">Confirm Password</label>
          <input
            v-bind:class="{ 'form-input': true, error: confirmPassword.error }"
            type="password"
            v-model="confirmPassword.value"
          />
          <div v-if="confirmPassword.error" class="form-error">
            Passwords do not match
          </div>
        </div>
        <button class="btn--primary" type="submit">Signup</button>
        <div class="mt-4">
          Already registered?
          <router-link to="/signup">Login.</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '../utils/validators';
import { registerUser } from '../services/user';

export default {
  name: 'SignupForm',
  data() {
    return {
      registrationError: '',
      name: {
        value: '',
        error: false,
      },
      email: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
      confirmPassword: {
        value: '',
        error: false,
      },
    };
  },
  methods: {
    validate: function() {
      this.email.error = !this.email.value || !validateEmail(this.email.value);
      this.password.error = !this.password.value;
      this.name.error = !this.name.value;
      this.confirmPassword.error =
        this.confirmPassword.value === '' ||
        this.confirmPassword.value !== this.password.value;
      return (
        !this.email.error &&
        !this.password.error &&
        !this.name.error &&
        !this.confirmPassword.error
      );
    },
    submitForm: function() {
      this.validate();
      registerUser(this.name.value, this.email.value, this.password.value)
        .then(
          function() {
            this.registrationError = '';
            this.$router.push('/');
          }.bind(this)
        )
        .catch(
          function(e) {
            this.registrationError = e;
          }.bind(this)
        );
    },
  },
};
</script>

<style></style>
