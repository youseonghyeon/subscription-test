<template>
  <div class="subscription-page">
    <h1 class="page-title">구독 plan 구매(TEST)</h1>

    <div class="plans-container">
      <div v-for="plan in plans" :key="plan.name" class="plan-section">
        <h2>{{ plan.name }}</h2>
        <table>
          <tbody>
          <tr>
            <th>Price</th>
            <td>{{ plan.price }}</td>
          </tr>
          <tr>
            <th>Office Apps</th>
            <td>{{ plan.officeApps }}</td>
          </tr>
          <tr>
            <th>Cloud Storage</th>
            <td>{{ plan.cloudStorage }}</td>
          </tr>
          <tr>
            <th>Email Hosting</th>
            <td>{{ plan.emailHosting }}</td>
          </tr>
          </tbody>
        </table>
        <input class="plan-id-input" type="number" placeholder="여기에 Plan ID를 입력하십시오" min="0" v-model="inputPlanId"
               v-if="plan.button"/>
        <button class="purchase-btn" @click="enroll(inputPlanId)" v-if="plan.button">지금 구입</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.plan-id-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

.plans-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-between;
}

.plan-section {
  flex: 1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 15px 20px;
  text-align: left;
}

th {
  background-color: #007BFF;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.purchase-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}

.subscription-page {
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #333;
  border-bottom: 2px solid #007BFF;
  padding-bottom: 10px;
}
</style>


<script>
import axiosInstance from "@/axiosInstance";

export default {
  name: 'SubscriptionPlans',

  methods: {
    enroll(planId) {
      const customerId = 'testCustomer';
      axiosInstance.post('/api/enroll', JSON.stringify({
        customerId,
        planId
      }))
          .then(
              (response) => {
                console.log('Enrollment successful:', response.data);
                if (response.status === 200 && response.data.subscriptionId) {
                  // 상태 코드가 200이며 subscriptionId가 응답에 포함된 경우
                  // /payment 라우트로 이동하며 subscriptionId를 파라미터로 전달
                  this.$router.push({
                    name: 'Payment',
                    params: {subscriptionId: response.data.subscriptionId}
                  });
                }
              }
          )
          .catch(
              (error) => {
                if (error.response.data.startsWith('Invalid application ID')) {
                  alert('구매 실패: 애플리케이션 ID가 유효하지 않습니다.');
                } else if (error.response.data.startsWith('Invalid subscription plan ID')) {
                  alert('구매 실패: 구독Plan ID가 유효하지 않습니다.');
                } else if (error.response.data.startsWith('Customer already has an active subscription')) {
                  alert('구매 실패: 이미 구독중인 Plan이 있습니다.');
                } else {
                  alert('구매 실패 msg:' + error.response.data);
                }
              }
          )
    }
  },

  data() {
    return {
      inputPlanId: null,
      plans: [
        {
          planId: 1,
          name: 'Plan A',
          price: '$00/user/month',
          officeApps: 'Web version',
          cloudStorage: '1 TB',
          emailHosting: 'Yes',
          button: true
        },
        {
          planId: 2,
          name: 'Plan B',
          price: '$00/user/month',
          officeApps: 'Desktop & Web version',
          cloudStorage: '2 TB',
          emailHosting: 'Yes',
          button: false
        },
        {
          planId: 3,
          name: 'Plan C',
          price: '$00/user/month',
          officeApps: 'Desktop & Web version',
          cloudStorage: '4 TB',
          emailHosting: 'Yes with advanced security',
          button: false
        },
      ]
    };
  }
}
</script>
