<template>
  <div class="subscribed-plans-settings">
    <h1>구독 플랜 설정</h1>
    <div class="setting-item">
      <label for="allowMultipleSubscriptions">중복 구독 허용:</label>
      <input type="checkbox" id="allowMultipleSubscriptions" v-model="allowMultipleSubscriptions">
    </div>
    <button type="submit"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allowMultipleSubscriptions: false, // 중복 구독 허용 여부
      // ... 추가로 설정값을 data에 추가할 수 있습니다.
    };
  },
  watch: {
    allowMultipleSubscriptions(newVal) {
      // 변경된 설정값을 서버에 업데이트하거나 다른 처리를 하려면 이 watch 내에서 구현할 수 있습니다.
    },
    // ... 다른 설정값에 대한 watch도 추가 가능합니다.
  }
};
</script>

<style scoped>
.subscribed-plans-settings {
  padding: 20px;
}

.setting-item {
  margin-bottom: 20px;
}
</style>
