<template>
  <div class="currency-exchange__from h-block">
    <div class="h-block__title">From</div>
    <div class="block">
      <input
        class="h-input"
        type="number"
        :value="getExchangeAmountFrom"
        @input="uppdateAmount"
        placeholder="0.00"
      />
      <select class="h-select" v-model="currencySelect">
        <option
          v-for="currency in getCurrencies"
          :key="currency.id"
          :disabled="getExchangeCurrencyTo == currency.code"
        >
          {{ currency.code }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'CurrencyExchangeFrom',
  data() {
    return {
      currencySelect: ''
    };
  },
  methods: {
    uppdateAmount(event) {
      this.setExchangeAmountFrom(event.target.value);
      this.calcExchange('from');
    },
    ...mapActions([
      'setExchangeCurrencyFrom',
      'setExchangeCurrencyTo',
      'setExchangeAmountFrom',
      'setExchangeAmountTo',
      'calcExchange'
    ])
  },

  computed: {
    ...mapGetters([
      'getCurrencies',
      'getExchangeCurrencyFrom',
      'getExchangeCurrencyTo',
      'getExchangeAmountFrom',
      'getExchangeAmountTo'
    ])
  },
  watch: {
    currencySelect(value) {
      this.setExchangeCurrencyFrom(value);
      this.calcExchange('from');
    }
  },
  mounted() {
    this.currencySelect = this.getExchangeCurrencyFrom;
  }
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
}
.h-input {
  width: 100%;
}
.h-select {
  margin: 0 auto;
  margin-left: auto;
}
.currency-exchange__from {
  max-width: 450px;
}
</style>
