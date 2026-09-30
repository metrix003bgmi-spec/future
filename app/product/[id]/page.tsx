import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/data';
import CategoryHeader from '@/components/CategoryHeader';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await the URL parameters
  const resolvedParams = await params;
  
  // Look up the product in our mock DB
  const product = getProductById(resolvedParams.id);

  // If the product doesn't exist, trigger a 404
  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white m-0 p-0 font-sans antialiased text-black min-h-screen">
      {/* 1. Global Navigation Header */}
      <CategoryHeader />

      {/* 2. Interactive Product Display */}
      <ProductDetailClient product={product} />
    </div>
  );
}