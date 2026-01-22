import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .single()

  return {
    title: `${product?.name || 'Producto'} | PixaStudio`,
    description: product?.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // 1. Fetch del producto por slug
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single()

  // 2. Si no existe, lanzamos un 404 de Next.js
  if (!product) notFound()

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Botón de volver */}
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a la tienda
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Columna Izquierda: Imagen y Badges */}
          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-xl border bg-muted">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Beneficios rápidos (Hardcoded para el MVP) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Acceso de por vida
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Archivos descargables
              </div>
            </div>
          </div>

          {/* Columna Derecha: Info y Compra */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">Producto Digital</Badge>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {product.name}
              </h1>
            </div>

            <p className="text-3xl font-bold">${product.price}</p>

            <div className="prose prose-stone dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <Button size="lg" className="w-full text-lg h-14" asChild>
                <a href={product.hotmart_url} target="_blank" rel="noopener noreferrer">
                  ¡Lo quiero ahora! (Vía Hotmart)
                </a>
              </Button>
              <p className="text-xs text-center text-muted-foreground italic">
                Pago seguro procesado por Hotmart. Acceso inmediato tras la compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}