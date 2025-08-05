import React from 'react';
import { ClipboardList, ArrowRight } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 px-6 bg-amber-50 rounded-lg border-2 border-dashed border-amber-200">
      <ClipboardList className="h-16 w-16 mx-auto mb-4 text-amber-400" />
      <h2 className="text-xl font-bold text-amber-800 mb-2">Görevlerinizi Yönetin</h2>
      <p className="text-amber-700 mb-6">
        Görevlerinizi ekleyin, tamamlayın ve altın kazanın!
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">1</div>
          <ArrowRight className="h-4 w-4 text-amber-400" />
          <p className="text-amber-700 text-sm">Yeni görev ekleyin ve ödül belirleyin</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">2</div>
          <ArrowRight className="h-4 w-4 text-amber-400" />
          <p className="text-amber-700 text-sm">Zamanında tamamlayın tam ödül kazanın</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">3</div>
          <ArrowRight className="h-4 w-4 text-amber-400" />
          <p className="text-amber-700 text-sm">Geç kalırsanız ödülünüz yarıya düşer</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;