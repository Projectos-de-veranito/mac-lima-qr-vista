import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ChevronLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
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
  const { logout } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
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
              <div className="flex items-center space-x-3">
                <img
                  src="https://maclima.pe/wordpress/wp-content/uploads/2019/11/logo_blanco_148x50.png"
                  alt="MAC Lima"
                  className="h-6 w-auto filter invert"
                />
                <h1 className="text-xl font-semibold">
                  {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
                </h1>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Volver</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-3 flex-1 justify-center">
              <img
                src="https://maclima.pe/wordpress/wp-content/uploads/2019/11/logo_blanco_148x50.png"
                alt="MAC Lima"
                className="h-5 md:h-6 w-auto filter invert"
              />
              <span className="text-base md:text-lg font-semibold text-slate-900 hidden sm:inline">Panel de Administración</span>
              <span className="text-sm font-semibold text-slate-900 sm:hidden">Admin</span>
            </div>
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <span className="sm:hidden">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6">
            <TabsTrigger value="products" className="text-xs md:text-sm">Productos</TabsTrigger>
            <TabsTrigger value="qr-generator" className="text-xs md:text-sm">QR</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs md:text-sm">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Gestión de Productos</h2>
                <p className="text-slate-600 text-sm md:text-base">Administra el catálogo de productos de la tienda</p>
              </div>
              <Button
                onClick={() => setShowProductForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Nuevo Producto</span>
                <span className="sm:hidden">Nuevo</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {products.map((product) => (
                <Card key={product.id} className="p-4 md:p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between flex-grow">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1">
                        <h3 className="text-base md:text-lg font-semibold text-slate-900 truncate">{product.nombre}</h3>
                        <Badge variant="secondary" className="text-xs">{product.categoria}</Badge>
                        <Badge variant={product.disponible ? "default" : "destructive"} className="text-xs">
                          {product.disponible ? "Disponible" : "Agotado"}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">{product.descripcion}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-slate-500">
                        <span>Precio: S/ {product.precio}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Creado: {product.fechaCreacion}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductForm(true);
                      }}
                      className="flex-1 sm:flex-none"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 sm:flex-none"
                    >
                      Eliminar
                    </Button>
                    <Link to={`/producto/${product.id}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qr-generator" className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Generador de Códigos QR</h2>
              <p className="text-slate-600 text-sm md:text-base">Crea códigos QR para los productos de la tienda</p>
            </div>

            <QRGenerator products={products} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Estadísticas</h2>
              <p className="text-slate-600 text-sm md:text-base">Resumen de la actividad del catálogo</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{products.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold text-green-600">
                    {products.filter(p => p.disponible).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Agotados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-bold text-red-600">
                    {products.filter(p => !p.disponible).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Productos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {['Libros', 'Arte', 'Accesorios'].map(categoria => {
                    const count = products.filter(p => p.categoria === categoria).length;
                    const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                    return (
                      <div key={categoria} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{categoria}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 md:w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 min-w-[1rem]">{count}</span>
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
