"use client";

import dynamic from 'next/dynamic';

const FinancialAnalysis = dynamic(() => import('@/app/dashboard/financial_analysis').then(mod => ({ default: mod.FinancialAnalysis })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
});

export default function StatsPage() {
  return <FinancialAnalysis />;
} 