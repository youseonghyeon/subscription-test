<template>
  <div class="subscribed-plans">
    <h1>나의 구독 플랜</h1>
    <!--    <button @click="viewAvailablePlans">구매 가능한 플랜 보기</button>-->

    <ul>
      <li v-for="plan in subscribedPlans" :key="plan.id">
        <p>id : {{ plan.id }}</p>
        <p>구독 플랜 : {{ plan.subscribeName }}</p>
        <p>시작일 : {{ plan.startDate}}</p>
        <p>{{ plan.endDate}}</p>
        <p>{{ plan.price }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import SubscriptionPlans from "@/components/SubscriptionPlans.vue";

export default {
  computed: {
    SubscriptionPlans() {
      return SubscriptionPlans;
    }
  },
  data() {
    return {
      subscribedPlans: []
    };
  },
  created() {
    this.fetchSubscribedPlans();
  },
  methods: {
    fetchSubscribedPlans() {
      const authToken = 'hbqbZvjndlegD7Emm153IVGtBDNYTJFkF0DtxUYN0no=';

      $.ajax({
        url: 'http://localhost:9999/api/customers/someCustomerId',
        type: 'GET',
        dataType: 'json',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        success: (data) => {
          this.subscribedPlans = data;
        },
        error: (error) => {
          console.error('Error fetching subscribed plans:', error);
        }
      });
    },
    viewAvailablePlans() {
      this.$router.push('/plans');
    }
  }
}
</script>


<style scoped>
.subscribed-plans {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

h2 {
  margin: 0;
  font-size: 18px;
}
</style>
