"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Smartphone, Copyright } from "lucide-react" // Usamos Copyright como placeholder de Binance
import { supabase } from "@/lib/supabase"

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const [method, setMethod] = useState<"binance" | "pagomovil" | null>(null)
  const [reference, setReference] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Obtenemos el usuario actual (debe estar logueado para comprar)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert("Debes iniciar sesión para registrar tu pago")
      return
    }

    // Registramos la venta como "pending"
    const { error } = await supabase.from("sales").insert({
      user_email: user.email,
      payment_method: method,
      reference_number: reference,
      status: "pending",
      // Aquí podrías buscar el ID del producto por el slug primero
    })

    if (!error) alert("¡Pago registrado! Procesaremos tu acceso en breve.")
    setLoading(false)
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button 
          variant={method === "binance" ? "default" : "outline"}
          className="h-24 flex flex-col gap-2"
          onClick={() => setMethod("binance")}
        >
          <span className="text-xl font-bold italic text-yellow-500">Binance</span>
          <span className="text-xs">USDT / PayID</span>
        </Button>

        <Button 
          variant={method === "pagomovil" ? "default" : "outline"}
          className="h-24 flex flex-col gap-2"
          onClick={() => setMethod("pagomovil")}
        >
          <Smartphone className="h-6 w-6" />
          <span className="text-xs">Pago Móvil (Bs)</span>
        </Button>
      </div>

      {method && (
        <Card className="animate-in fade-in slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle>Datos de Pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información de la cuenta según el método */}
            <div className="bg-muted p-4 rounded-lg border-2 border-dashed border-primary/20">
              {method === "binance" ? (
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Binance PayID:</p>
                  <code className="block bg-background p-2 rounded text-lg text-center font-mono">123456789</code>
                  <p className="text-xs text-muted-foreground italic text-center">Nombre: Tu Nombre Completo</p>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p><strong>Banco:</strong> Banesco (0134)</p>
                  <p><strong>Cédula:</strong> V-00.000.000</p>
                  <p><strong>Teléfono:</strong> 0412-0000000</p>
                </div>
              )}
            </div>

            {/* Formulario de Confirmación */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ref">Número de Referencia / Comprobante</Label>
                <Input 
                  id="ref" 
                  placeholder="Ej: 987654" 
                  value={reference} 
                  onChange={(e) => setReference(e.target.value)} 
                  required 
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Confirmar Pago Realizado"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}