<template>
  <div class="currency-rate__table">
    <ul v-for="currency in formatingCurrencies" :key="currency.id">
      <li>{{ currency.name }}: {{ currency.rate }}</li>
    </ul>
    <button class="h-button" @click.prevent="buttonClicked" :disabled="isDisabled">refresh</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'CurrencyRateTable',
  data() {
    return {
      currencySelect: '',
      currencies: [],
      isDisabled: false
    };
  },
  methods: {
    changeCurrencySelect() {
      this.currencySelect = this.getRateCurrencySelect;
      this.fetchPrices();
    },
    buttonClicked() {
      this.fetchPrices();
      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 5000);
    },
    async fetchPrices() {
      const currencySelect = this.getRateCurrencySelect;
      const apiUrl = `https://api.coinbase.com/v2/exchange-rates?currency=${currencySelect}`;
      try {
        await axios.get(apiUrl).then((response) => {
          const rates = response.data.data.rates;
          this.currencies = [
            { id: 1, name: 'USD', rate: rates.USD, fixes: 2 },
            { id: 2, name: 'EUR', rate: rates.EUR, fixes: 2 },
            { id: 3, name: 'UAH', rate: rates.UAH, fixes: 2 },
            { id: 4, name: 'BTC', rate: rates.BTC, fixes: 8 },
            { id: 5, name: 'ETH', rate: rates.ETH, fixes: 8 }
          ];
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    formatingCurrencies() {
      return this.currencies.map((i) => {
        return {
          ...i,
          rate: Number(i.rate).toFixed(i.fixes)
        };
      });
    },
    uppdateCurrencySelect() {
      return this.getRateCurrencySelect;
    },
    ...mapGetters(['getRateCurrencySelect'])
  },
  watch: {
    uppdateCurrencySelect() {
      this.changeCurrencySelect();
    }
  },
  mounted() {
    this.currencySelect = this.getRateCurrencySelect;
    this.fetchPrices();
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-top: 20px;
}
</style>
