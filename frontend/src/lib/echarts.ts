// This is a client-side only module for echarts
// It prevents SSR issues with echarts

// Use a more generic type to avoid type errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let echartsModule: any = null;

// This function ensures echarts is only loaded on the client side
export function getEcharts() {
  console.log('getEcharts called');

  if (echartsModule) {
    console.log('Returning cached echarts module');
    return echartsModule;
  }

  if (typeof window !== 'undefined') {
    try {
      // Only import echarts on the client side
      console.log('Importing echarts...');
      // Use dynamic import instead of require
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const echarts = require('echarts');
      console.log('Echarts imported successfully:', typeof echarts, Object.keys(echarts));
      echartsModule = echarts;
      return echarts;
    } catch (error) {
      console.error('Error importing echarts:', error);
      return null;
    }
  } else {
    console.log('Window is undefined, skipping echarts import');
    return null;
  }
}

// For compatibility with default imports
export default getEcharts;
