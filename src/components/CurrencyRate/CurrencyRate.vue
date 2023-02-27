<template>
  <form class="currency-rate h-block">
    <CurrencyRateSelect />
    <CurrencyRateTable />
  </form>
</template>

<script>
import CurrencyRateSelect from '@/components/CurrencyRate/CurrencyRateSelect';
import CurrencyRateTable from '@/components/CurrencyRate/CurrencyRateTable';
export default {
  name: 'CurrencyRate',
  data() {
    return {};
  },
  components: { CurrencyRateSelect, CurrencyRateTable }
};
</script>

<style lang="scss" scoped>
.currency-rate {
  display: flex;
  flex-direction: column;
  margin: 20px;
  max-width: 450px;
}
</style>
