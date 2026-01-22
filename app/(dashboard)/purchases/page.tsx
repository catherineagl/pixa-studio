import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function MyPurchasesPage() {
  // 1. Verificar sesión
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  // 2. Traer compras del usuario
  const { data: purchases } = await supabase
    .from('sales')
    .select(`
      id,
      products (
        name,
        image_url,
        file_url
      )
    `)
    .eq('user_email', session.user.email)

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Mis Descargas</h1>
      
      {purchases?.length === 0 ? (
        <p className="text-muted-foreground">Aún no tienes compras realizadas.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {purchases?.map((sale: any) => (
            <Card key={sale.id} className="flex items-center p-4 gap-6">
              <img 
                src={sale.products.image_url} 
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <CardTitle className="text-lg">{sale.products.name}</CardTitle>
                <p className="text-sm text-muted-foreground italic">Comprado con: {session.user.email}</p>
              </div>
              <Button asChild variant="outline">
                <a href={sale.products.file_url} target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Descargar
                </a>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}