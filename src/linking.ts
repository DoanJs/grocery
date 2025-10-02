// linking.ts
const linking = {
  prefixes: ['grocery://'],
  config: {
    screens: {
      ProductDetailsScreen: 'product/:productId',
      
    },
  },
};

export default linking;
