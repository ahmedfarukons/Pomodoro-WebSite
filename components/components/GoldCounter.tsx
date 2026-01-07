import React from 'react';
import { Coins } from 'lucide-react';

interface GoldCounterProps {
  amount: number;
}

const GoldCounter: React.FC<GoldCounterProps> = ({ amount }) => {
  return (
    <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-sm">
      <Coins className="h-5 w-5 text-amber-500" />
      <span className="font-bold text-amber-800">{amount}</span>
    </div>
  );
};

export default GoldCounter;