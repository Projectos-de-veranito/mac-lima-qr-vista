
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Plus, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import QRGenerator from "@/components/QRGenerator";
import ProductForm from "@/components/ProductForm";

// Mock products data - in a real app this would come from your database
const mockProducts = [
  {
    id: "1",
    nombre: "Catálogo Exposición Permanente",
    precio: 45,
    descripcion: "Libro oficial de la colección permanente del MAC Lima",
    categoria: "Libros",
    disponible: true,
    fechaCreacion: "2024-01-15"
  },
  {
    id: "2", 
    nombre: "Póster Edición Limitada",
    precio: 25,
    descripcion: "Póster de alta calidad de obra emblemática",
    categoria: "Arte",
    disponible: true,
    fechaCreacion: "2024-01-10"
  },
  {
    id: "3",
    nombre: "Tote Bag MAC Lima",
    precio: 18,
    descripcion: "Bolsa de algodón orgánico con logo del museo",
    categoria: "Accesorios",
    disponible: false,
    fechaCreacion: "2024-01-08"
  }
];

const Admin = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // In a real app, this would be managed by authentication
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleLogin = () => {
    // In a real app, this would validate credentials
    setIsLoggedIn(true);
    toast({
      title: "Acceso concedido",
      description: "Bienvenido al panel de administración",
    });
  };

  const handleProductSave = (productData) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
      toast({
        title: "Producto actualizado",
        description: "Los cambios han sido guardados exitosamente",
      });
    } else {
      // Create new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Producto creado",
        description: "El nuevo producto ha sido agregado al catálogo",
      });
    }
    setSelectedProduct(null);
    setShowProductForm(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido removido del catálogo",
    });
  };

  const generateQRUrl = (productId) => {
    return `${window.location.origin}/producto/${productId}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">MAC</span>
            </div>
            <CardTitle>Panel de Administración</CardTitle>
            <CardDescription>
              Acceso restringido al personal del museo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" placeholder="Ingresa tu usuario" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Ingresa tu contraseña" />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showProductForm) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setShowProductForm(false);
                  setSelectedProduct(null);
                }}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Volver al panel</span>
              </button>
              <h1 className="text-xl font-semibold">
                {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <ProductForm
            product={selectedProduct}
            onSave={handleProductSave}
            onCancel={() => {
              setShowProductForm(false);
              setSelectedProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span>Volver al sitio</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">MAC</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">Panel de Administración</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="qr-generator">Generar QR</TabsTrigger>
            <TabsTrigger value="analytics">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Gestión de Productos</h2>
                <p className="text-slate-600">Administra el catálogo de productos de la tienda</p>
              </div>
              <Button
                onClick={() => setShowProductForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Producto
              </Button>
            </div>

            <div className="grid gap-6">
              {products.map((product) => (
                <Card key={product.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{product.nombre}</h3>
                        <Badge variant="secondary">{product.categoria}</Badge>
                        <Badge variant={product.disponible ? "default" : "destructive"}>
                          {product.disponible ? "Disponible" : "Agotado"}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{product.descripcion}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Precio: S/ {product.precio}</span>
                        <span>•</span>
                        <span>Creado: {product.fechaCreacion}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductForm(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </Button>
                      <Link to={`/producto/${product.id}`}>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qr-generator" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Generador de Códigos QR</h2>
              <p className="text-slate-600">Genera códigos QR para los productos del catálogo</p>
            </div>

            <QRGenerator products={products} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Estadísticas</h2>
              <p className="text-slate-600">Resumen de la actividad del catálogo</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{products.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Productos Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {products.filter(p => p.disponible).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Productos Agotados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {products.filter(p => !p.disponible).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Productos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Libros', 'Arte', 'Accesorios'].map(categoria => {
                    const count = products.filter(p => p.categoria === categoria).length;
                    const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                    return (
                      <div key={categoria} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{categoria}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
