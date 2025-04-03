'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EChartsWrapperProps {
  option: any;
  style?: React.CSSProperties;
  className?: string;
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({ option, style, className }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    let echarts: any = null;
    let chartInstance: any = null;

    // Only run on client-side
    if (typeof window !== 'undefined' && chartRef.current) {
      const initChart = async () => {
        try {
          console.log('Importing echarts in component...');
          // Dynamic import
          echarts = await import('echarts');
          console.log('Echarts imported in component:', typeof echarts, Object.keys(echarts));
          
          if (chartRef.current) {
            console.log('Initializing chart...');
            chartInstance = echarts.init(chartRef.current);
            console.log('Chart initialized successfully');
            chartInstance.setOption(option);
            setChart(chartInstance);
            
            // Handle resize
            const handleResize = () => {
              chartInstance?.resize();
            };
            window.addEventListener('resize', handleResize);
            
            return () => {
              window.removeEventListener('resize', handleResize);
              chartInstance?.dispose();
            };
          }
        } catch (error) {
          console.error('Error initializing ECharts:', error);
        }
      };

      initChart();
    }

    return () => {
      if (chart) {
        try {
          chart.dispose();
        } catch (e) {
          console.error('Error disposing chart:', e);
        }
      }
    };
  }, [option]);

  // Update chart when option changes
  useEffect(() => {
    if (chart) {
      try {
        chart.setOption(option);
      } catch (e) {
        console.error('Error updating chart:', e);
      }
    }
  }, [chart, option]);

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '400px', ...style }} 
      className={className}
    />
  );
};

export default EChartsWrapper;
