
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const featuredProducts = [
  {
    id: "1",
    nombre: "Catálogo Exposición Permanente",
    precio: 45,
    descripcion: "Libro oficial de la colección permanente del MAC Lima",
    imagen: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
    categoria: "Libros",
    disponible: true
  },
  {
    id: "2", 
    nombre: "Póster Edición Limitada",
    precio: 25,
    descripcion: "Póster de alta calidad de obra emblemática",
    imagen: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop",
    categoria: "Arte",
    disponible: true
  },
  {
    id: "3",
    nombre: "Tote Bag MAC Lima",
    precio: 18,
    descripcion: "Bolsa de algodón orgánico con logo del museo",
    imagen: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=600&fit=crop",
    categoria: "Accesorios",
    disponible: false
  }
];

const Index = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MAC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">MAC Lima</h1>
                <p className="text-sm text-slate-600">Museo de Arte Contemporáneo</p>
              </div>
            </div>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Panel Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Descubre Nuestra
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tienda Digital
              </span>
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Escanea los códigos QR en nuestra tienda física para ver información detallada de nuestros productos exclusivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <QrCode className="mr-2 h-5 w-5" />
                Escanear QR
              </Button>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="lg">
                    Ver Panel Admin
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-slate-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Productos Destacados</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Una selección especial de productos disponibles en nuestra tienda física
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/producto/${product.id}`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{product.categoria}</Badge>
                      <Badge variant={product.disponible ? "default" : "destructive"}>
                        {product.disponible ? "Disponible" : "Agotado"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{product.nombre}</CardTitle>
                    <CardDescription className="text-sm">{product.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">S/ {product.precio}</span>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MAC</span>
                </div>
                <span className="text-xl font-bold">MAC Lima</span>
              </div>
              <p className="text-slate-400">
                Museo de Arte Contemporáneo de Lima - Promoviendo el arte y la cultura contemporánea
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-slate-400">
                <p>Av. Miguel Grau 1511, Barranco</p>
                <p>Lima, Perú</p>
                <p>+51 1 514-6800</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Horarios</h4>
              <div className="space-y-2 text-slate-400">
                <p>Martes a Domingo</p>
                <p>10:00 AM - 8:00 PM</p>
                <p>Lunes cerrado</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MAC Lima. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
