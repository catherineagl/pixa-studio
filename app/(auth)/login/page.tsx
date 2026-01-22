"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/purchases`,
      },
    })

    if (error) setMessage("Error: " + error.message)
    else setMessage("¡Revisa tu correo! Te enviamos un link de acceso.")
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar a mis descargas</CardTitle>
          <CardDescription>Introduce tu email para recibir un acceso directo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="email" 
              placeholder="tu@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Magic Link"}
            </Button>
            {message && <p className="text-sm text-center mt-4 text-blue-600 font-medium">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}