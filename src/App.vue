<template>
  <div>
    <div class="header">
      <router-link class="header-item" to="/">Home</router-link>
      <router-link class="header-item" to="/plans">Plans</router-link>
      <router-link class="header-item" to="/options">Others</router-link>
      <a class="header-item" :href="wasServerUrl">SUBSCRIBE</a>
      <input v-model="authToken" @input="useToken" type="text" placeholder="Application Key" class="header-item"/>
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {tokenManager} from "@/axiosInstance";

export default {
  data() {
    return {
      wasServerUrl: import.meta.env.VITE_SUBSCRIBE_WAS_SERVER_URL,
      authToken: tokenManager.token
    };
  },
  methods: {
    useToken() {
      tokenManager.token = this.authToken;
    },
  },
};
</script>


<style scoped>
.header {
  display: flex;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.header-item {
  margin-right: 20px;
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
}
</style>


<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
