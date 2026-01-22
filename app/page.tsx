import { supabase } from "@/lib/supabase"
import { ProductCard } from "@/components/product-card"
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error("Error de Supabase:", error.message, error.details);
    return <div>Error cargando productos: {error.message}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No hay productos en la base de datos.</div>;
  }


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto pb-20 px-4">
        <Hero />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}