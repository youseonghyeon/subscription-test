<template>
  <div class="payment-container">
    <h1>결제 페이지</h1>
    <!-- 기타 결제 관련 UI 요소들 -->

    <button class="test-payment-btn" @click="testPayment">테스트 결제</button>
  </div>
</template>

<script>
import axiosInstance from "@/axiosInstance";

export default {
  name: 'PaymentPage',
  methods: {
    testPayment() {
      const subscriptionId = this.$route.params.subscriptionId;
      axiosInstance.post('/api/activate', JSON.stringify({
        subscriptionId
      })).then(
          (response) => {
            console.log('Test payment successful:', response.data);
            alert("결제가 완료되었습니다.");
            window.location.href = "/";
          }
      ).catch(
          (error) => {
            console.error('Test payment failed:', error);
          }
      )
    }
  }
}
</script>

<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border: 2px solid #e7e7e7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 40px;
}

.test-payment-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
}
</style>
