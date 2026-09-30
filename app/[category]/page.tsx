import { notFound } from 'next/navigation';
import { catalogData } from '@/lib/data'; 
import ProductCard from '@/components/ProductCard';
import { FaBars, FaSearch, FaRegHeart, FaSlidersH, FaChevronDown } from 'react-icons/fa';
import CategoryHeader from '@/components/CategoryHeader';

// 1. Update the interface to define params as a Promise
interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// 2. Add 'async' to the component
export default async function CategoryPage({ params }: PageProps) {
  
  // 3. Await the params before extracting the category
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category.toLowerCase() as keyof typeof catalogData;
  
  // 4. Fetch the corresponding products
  const products = catalogData[categoryKey];

  if (!products) {
    notFound();
  }

  return (
    <div className="bg-white m-0 p-0 font-sans antialiased text-black min-h-screen">
      
      {/* Minimal Header for Context */}
      <CategoryHeader />

      {/* Page Title & Filters */}
      <section className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="font-lato text-4xl md:text-5xl font-light tracking-wide uppercase mb-8">
          {resolvedParams.category}
        </h2>
        
        <div className="w-full flex justify-between items-center border-t border-b border-gray-200 py-4 mb-10 text-sm font-semibold uppercase tracking-wider text-gray-500">
          <button className="hover:text-black transition flex items-center gap-2">
            <FaSlidersH /> Filter
          </button>
          <span className="text-xs tracking-widest font-normal">{products.length} Products</span>
          <button className="hover:text-black transition flex items-center gap-2">
            Sort By <FaChevronDown className="text-[10px]" />
          </button>
        </div>

        {/* Dynamic Product Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              designer={product.designer}
              imgPrimary={product.imgPrimary}
              imgSecondary={product.imgSecondary}
              link={product.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}