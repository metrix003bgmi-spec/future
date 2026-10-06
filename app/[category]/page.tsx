import { notFound } from 'next/navigation';
import { catalogData } from '@/lib/data'; 
import CategoryHeader from '@/components/CategoryHeader';
import ProductGrid from '@/components/ProductGrid'; // Import your new component

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category.toLowerCase() as keyof typeof catalogData;
  const products = catalogData[categoryKey];

  if (!products) {
    notFound();
  }

  return (
    <div className="bg-white m-0 p-0 font-sans antialiased text-black min-h-screen">
      <CategoryHeader />

      <section className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="font-lato text-4xl md:text-5xl font-light tracking-wide uppercase mb-8">
          {resolvedParams.category}
        </h2>
        
        {/* Replace the old filters and grid with the new interactive component */}
        <ProductGrid products={products} />
        
      </section>
    </div>
  );
}