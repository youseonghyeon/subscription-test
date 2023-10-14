<template>
  <div class="payment-container">
    <h1>결제 페이지</h1>
    <!-- 기타 결제 관련 UI 요소들 -->

    <button class="test-payment-btn" @click="testPayment">테스트 결제</button>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage',
  methods: {
    testPayment() {
      const subscriptionId = this.$route.params.subscriptionId;
      const authToken = 'hbqbZvjndlegD7Emm153IVGtBDNYTJFkF0DtxUYN0no=';

      $.ajax({
        url: 'http://localhost:9999/api/activate',
        type: 'POST',
        // dataType: 'json', // 응답값 없이 사용
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        data: JSON.stringify({
          subscriptionId
        }),
        success: function (data) {
          console.log('Test payment successful:', data);
          alert("결제가 완료되었습니다.");
          window.location.href = "/";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error('Test payment failed:', errorThrown);
          console.error('Server response:', jqXHR.responseText);
        }
      });
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
