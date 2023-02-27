import axios from 'axios';

export default {
  state: {
    currencies: [
      { id: 1, code: 'USD' },
      { id: 2, code: 'EUR' },
      { id: 3, code: 'UAH' },
      { id: 4, code: 'GBP' },
      { id: 5, code: 'BTC' },
      { id: 6, code: 'ETH' },
      { id: 7, code: 'BNB' },
      { id: 8, code: 'XRP' }
    ],
    currencyFrom: 'USD',
    currencyTo: 'BTC',
    amountFrom: '',
    amountTo: '',
    currencySelect: 'USD'
  },
  getters: {
    getCurrencies(state) {
      return state.currencies;
    },
    getExchangeCurrencyFrom(state) {
      return state.currencyFrom;
    },
    getExchangeCurrencyTo(state) {
      return state.currencyTo;
    },
    getExchangeAmountFrom(state) {
      return state.amountFrom;
    },
    getExchangeAmountTo(state) {
      return state.amountTo;
    },
    getRateCurrencySelect(state) {
      return state.currencySelect;
    }
  },
  mutations: {
    SET_EXCHANGE_CURRENCY_FROM(state, payload) {
      state.currencyFrom = payload;
    },
    SET_EXCHANGE_CURRENCY_TO(state, payload) {
      state.currencyTo = payload;
    },
    SET_EXCHANGE_AMOUNT_FROM(state, payload) {
      state.amountFrom = payload;
    },
    SET_EXCHANGE_AMOUNT_TO(state, payload) {
      state.amountTo = payload;
    },
    SET_RATE_CURRENCY_SELECT(state, payload) {
      state.currencySelect = payload;
    },
    ADD_NEW_CURRENCY(state, payload) {
      const check = state.currencies.some((i) => i.code == payload);
      if (!check) {
        state.currencies.push({ code: payload });
      }
    },
    LOAD_LOCAL_CURRENCY(state, payload) {
      let newData;
      if (localStorage.getItem('myCurrency')) {
        newData = JSON.parse(localStorage.getItem('myCurrency')).split(', ');
      } else {
        newData = [];
      }
      newData.forEach((word) => {
        state.currencies.push({ code: word });
      });
    },
    ADD_LOCAL_CURRENCY(state, payload) {
      let newData;
      if (localStorage.getItem('myCurrency')) {
        newData = JSON.parse(localStorage.getItem('myCurrency')).concat(', ', payload);
      } else {
        newData = payload;
      }
      localStorage.setItem('myCurrency', JSON.stringify(newData));
    }
  },
  actions: {
    setExchangeCurrencyFrom({ commit }, payload) {
      commit('SET_EXCHANGE_CURRENCY_FROM', payload);
    },
    setExchangeCurrencyTo({ commit }, payload) {
      commit('SET_EXCHANGE_CURRENCY_TO', payload);
    },
    setExchangeAmountFrom({ commit }, payload) {
      commit('SET_EXCHANGE_AMOUNT_FROM', payload);
    },
    setExchangeAmountTo({ commit }, payload) {
      commit('SET_EXCHANGE_AMOUNT_TO', payload);
    },
    setRateCurrencySelect({ commit }, payload) {
      commit('SET_RATE_CURRENCY_SELECT', payload);
    },
    addNewCurrency({ commit }, payload) {
      commit('ADD_NEW_CURRENCY', payload);
      commit('ADD_LOCAL_CURRENCY', payload);
    },
    loadCurrencyFromLocal({ commit }) {
      commit('LOAD_LOCAL_CURRENCY');
    },
    CurrencyFromLocal({ commit }, payload) {
      commit('ADD_LOCAL_CURRENCY', payload);
    },
    async calcExchange({ state, commit }, priority) {
      const currencyFrom = state.currencyFrom;
      const currencyTo = state.currencyTo;
      const responseFrom = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=${currencyFrom}`
      );
      const responseTo = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=${currencyTo}`
      );
      if (currencyFrom === currencyTo) {
        return;
      }
      try {
        if (priority == 'to') {
          const exchangeRate = responseTo.data.data.rates[currencyFrom];
          const amount = state.amountTo * exchangeRate;
          commit('SET_EXCHANGE_AMOUNT_FROM', amount);
        } else {
          const exchangeRate = responseFrom.data.data.rates[currencyTo];
          const amount = state.amountFrom * exchangeRate;
          commit('SET_EXCHANGE_AMOUNT_TO', amount);
        }
      } catch (error) {
        console.log(error);
      } finally {
        const exchangeRate = responseTo.data.data.rates['USD'];
        const maxAmount = 10000 / exchangeRate;
        if (state.amountTo > maxAmount) {
          alert(`10k$ max, limit: ${maxAmount.toFixed(8)}`);
          commit('SET_EXCHANGE_AMOUNT_TO', maxAmount);
          const amount = responseTo.data.data.rates[state.currencyFrom] * maxAmount;
          commit('SET_EXCHANGE_AMOUNT_FROM', amount);
        }
      }
    }
  }
};
