<template>
  <div class="subscribed-plans">
    <h1>나의 구독 플랜</h1>

    <ul>
      <li v-for="plan in subscribedPlans" :key="plan.id" :class="statusClass(plan.status)">
        <div class="plan-details">
          <span>ID: {{ plan.id }}</span>
          <span>구독 플랜: {{ plan.subscribeName }}</span>
          <span>시작일: {{ plan.startDate }}</span>
          <span>종료일: {{ plan.endDate }}</span>
          <span>STATUS: {{ plan.status }}</span>
          <span>구매가격: {{ plan.price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.subscribed-plans {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  max-width: 500px;
  margin: 20px auto;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.plan-details {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

li {
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

li:last-child {
  margin-bottom: 0;
}

li:hover {
  background-color: #f0f0f0;
}

span {
  font-size: 14px;
  color: #555;
}

.status-active {
  background-color: #e6ffe6; /* Light green for active status */
}

.status-expired {
  background-color: #ffe6e6; /* Light red for expired status */
}

.status-pending {
  background-color: #ffffe6; /* Light yellow for pending status */
}

/* Add more status colors as needed */

</style>


<script>
import SubscriptionPlans from "@/components/SubscriptionPlans.vue";
import axiosInstance from "@/axiosInstance";

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
    async fetchSubscribedPlans() {
      try {
        const response = await axiosInstance.get('/api/customers/testCustomer');
        console.log(response)
        this.subscribedPlans = response.data;
      } catch (error) {
        console.error('Error fetching subscribed plans:', error);
      }
    },

    statusClass(status) {
      switch (status) {
        case 'ACTIVE':
          return 'status-active';
        case 'EXPIRED':
          return 'status-expired';
        case 'PENDING':
          return 'status-pending';
        default:
          return '';
      }
    },

    viewAvailablePlans() {
      this.$router.push('/plans');
    }
  }
}
</script>
