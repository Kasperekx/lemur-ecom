'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  id: string;
  label: string;
}

const categories: FilterOption[] = [
  { id: 'category-1', label: 'Kategoria 1' },
  { id: 'category-2', label: 'Kategoria 2' },
  // Add your categories
];

export function ProductsFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRanges.length > 0;

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-black border-white/20 hover:bg-white/10 relative group"
        >
          <SlidersHorizontal className="h-4 w-4 transition-transform group-hover:rotate-12" />
          <span>Filtry</span>
          {hasActiveFilters && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {selectedCategories.length + selectedPriceRanges.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] bg-gradient-to-b from-primary to-primary/80 border-r border-white/10 backdrop-blur-lg"
      >
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span>Filtry</span>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                <span>Wyczyść</span>
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-8">
          <div>
            <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Kategorie
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <motion.label
                  key={category.id}
                  className="flex items-center space-x-3 text-gray-200 hover:text-white cursor-pointer group"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded border-white/20 bg-transparent checked:bg-secondary"
                  />
                  <span className="group-hover:text-secondary transition-colors">
                    {category.label}
                  </span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Zakres cenowy
            </h3>
            <div className="space-y-5 px-2">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={50}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="w-full"
              />

              {/* Price Range Display */}
              <div className="flex justify-between items-center text-sm text-gray-200">
                <div className="bg-white/5 rounded-md px-3 py-1 backdrop-blur-sm">
                  {priceRange[0]} zł
                </div>
                <div className="text-gray-400">-</div>
                <div className="bg-white/5 rounded-md px-3 py-1 backdrop-blur-sm">
                  {priceRange[1]} zł
                </div>
              </div>

              {/* Reset Price Range */}
              {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                <button
                  onClick={() => setPriceRange([0, 1000])}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors w-full justify-center"
                >
                  <X className="h-3 w-3" />
                  Reset cenowy
                </button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
