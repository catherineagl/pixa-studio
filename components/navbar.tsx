import Link from "next/link"
import { ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Pixa<span className="text-primary">Studio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/mis-compras">Mis Compras</Link>
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}