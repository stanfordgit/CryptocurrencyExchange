<template>
  <div class="currency-rate__select">
    <select class="h-select" v-model="currencySelect">
      <option v-for="currency in filteredCurrency" :key="currency.id">
        {{ currency.code }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'CurrencyRateSelect',
  data() {
    return {
      currencySelect: '',
      test: 'USD',
      filtersCurrency: ['USD', 'EUR', 'UAH']
    };
  },
  methods: {
    ...mapActions(['setRateCurrencySelect'])
  },

  computed: {
    ...mapGetters(['getCurrencies', 'getRateCurrencySelect']),
    filteredCurrency() {
      return this.getCurrencies.filter((i) => this.filtersCurrency.includes(i.code));
    }
  },
  watch: {
    currencySelect(value) {
      this.setRateCurrencySelect(value);
    }
  },
  mounted() {
    this.currencySelect = this.getRateCurrencySelect;
  }
};
</script>

<style lang="scss" scoped>
.h-select {
  margin-bottom: 20px;
}
</style>
