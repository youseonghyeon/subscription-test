<template>
  <div class="subscription-page">
    <h1 class="page-title">구독 plan 구매 테스트</h1>

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
        <button class="purchase-btn" @click="enroll(plan.planId)">지금 구입</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.plans-container {
  display: flex;
  flex-direction: row; /* 가로 방향으로 배열 */
  gap: 30px; /* 플랜 섹션 간의 간격 */
  justify-content: space-between; /* 각 섹션 간격 동일하게 */
}

.plan-section {
  flex: 1; /* 각 섹션의 너비를 동일하게 */
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
    background-color: #0056b3; /* 버튼 호버 시 색상 변경 */
  }
}

.subscription-page {
  padding: 30px;
  font-family: 'Arial', sans-serif; /* 예제용 폰트, 원하는 폰트로 변경 가능 */
  background-color: #f5f5f5; /* 전체 배경색 변경 */
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px; /* 제목과 플랜 사이 간격 추가 */
  color: #333; /* 제목 색상 */
  border-bottom: 2px solid #007BFF; /* 제목 아래에 파란색 선 추가 */
  padding-bottom: 10px;
}
</style>


<script>
export default {
  name: 'SubscriptionPlans',

  methods: {
    enroll(planId) {
      const customerId = 'someCustomerId';
      const authToken = 'hbqbZvjndlegD7Emm153IVGtBDNYTJFkF0DtxUYN0no=';

      $.ajax({
        url: 'http://localhost:9999/api/enroll',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        data: JSON.stringify({
          customerId,
          planId
        }),
        success: function(data, textStatus, jqXHR) {
          console.log('Enrollment successful:', data);
          if (jqXHR.status === 200 && data.subscriptionId) {
            // 상태 코드가 200이며 subscriptionId가 응답에 포함된 경우
            // /payment 라우트로 이동하며 subscriptionId를 파라미터로 전달
            this.$router.push({
              name: 'Payment',
              params: { subscriptionId: data.subscriptionId }
            });
          }
        }.bind(this),  // this context를 보존하기 위해 bind 사용
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Enrollment failed:', errorThrown);
          // 오류 처리 (예: 사용자에게 오류 메시지 표시)
        }
      });
    }
  },



  data() {
    return {
      plans: [
        {
          planId: 1,
          name: 'Business Basic',
          price: '$5.00/user/month',
          officeApps: 'Web version',
          cloudStorage: '1 TB',
          emailHosting: 'Yes'
        },
        {
          planId: 2,
          name: 'Business Standard',
          price: '$12.50/user/month',
          officeApps: 'Desktop & Web version',
          cloudStorage: '1 TB',
          emailHosting: 'Yes'
        },
        {
          planId: 3,
          name: 'Business Premium',
          price: '$20.00/user/month',
          officeApps: 'Desktop & Web version',
          cloudStorage: '1 TB',
          emailHosting: 'Yes with advanced security'
        },
      ]
    };
  }
}
</script>
