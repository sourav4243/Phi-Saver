// This is a client-side only module for echarts
// It prevents SSR issues with echarts

let echarts: any;

if (typeof window !== 'undefined') {
  // Only import echarts on the client side
  echarts = require('echarts');
}

export default echarts;
