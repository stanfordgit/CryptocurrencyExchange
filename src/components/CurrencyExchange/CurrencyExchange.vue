<template>
  <form class="currency-exchange">
    <CurrencyExchangeFrom />
    <CurrencyExchangeTo />
  </form>
</template>

<script>
import CurrencyExchangeFrom from '@/components/CurrencyExchange/CurrencyExchangeFrom';
import CurrencyExchangeTo from '@/components/CurrencyExchange/CurrencyExchangeTo';
export default {
  name: 'CurrencyExchange',
  data() {
    return {};
  },
  components: { CurrencyExchangeFrom, CurrencyExchangeTo }
};
</script>

<style lang="scss" scoped>
.currency-exchange {
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 20px;
}
</style>
