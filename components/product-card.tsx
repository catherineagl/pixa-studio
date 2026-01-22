import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform group-hover:scale-105" 
        />
        <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-md">
          Digital
        </Badge>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-xs text-muted-foreground">Pago único</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/product/${product.slug}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
