<template>
  <div class="currency-exchange__to h-block">
    <div class="h-block__title">To</div>
    <div class="block">
      <input
        class="h-input"
        type="number"
        :value="getExchangeAmountTo"
        @input="uppdateAmount"
        placeholder="0.00"
      />
      <select class="h-select" v-model="currencySelect">
        <option
          v-for="currency in getCurrencies"
          :key="currency.id"
          :disabled="getExchangeCurrencyFrom == currency.code"
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
  name: 'CurrencyExchangeTo',
  data() {
    return {
      currencySelect: ''
    };
  },
  methods: {
    uppdateAmount(event) {
      this.setExchangeAmountTo(event.target.value);
      this.calcExchange('to');
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
      this.setExchangeCurrencyTo(value);
      this.calcExchange('to');
    }
  },
  mounted() {
    this.currencySelect = this.getExchangeCurrencyTo;
  }
};
</script>

<style lang="scss" scoped>
.currency-exchange__to {
  max-width: 450px;
}
.block {
  display: flex;
}
.h-input {
  width: 100%;
}
</style>
