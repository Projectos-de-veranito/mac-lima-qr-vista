
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock product data - in a real app this would come from your database
const mockProducts = {
  "1": {
    id: "1",
    nombre: "Catálogo Exposición Permanente",
    precio: 45,
    descripcion: "Libro oficial de la colección permanente del MAC Lima. Una cuidadosa selección de las obras más representativas de nuestro acervo, con textos críticos de reconocidos especialistas en arte contemporáneo latinoamericano. Incluye ensayos sobre los movimientos artísticos más importantes del siglo XX y XXI en el Perú.",
    imagenes: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    categoria: "Libros",
    disponible: true,
    dimensiones: "24 x 30 cm",
    paginas: "240 páginas",
    idioma: "Español/Inglés"
  },
  "2": {
    id: "2",
    nombre: "Póster Edición Limitada",
    precio: 25,
    descripcion: "Póster de alta calidad en papel arte de obra emblemática de nuestra colección. Impresión digital de máxima calidad con tintas resistentes a la luz. Perfecto para decorar espacios con arte contemporáneo peruano.",
    imagenes: [
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=600&fit=crop"
    ],
    categoria: "Arte",
    disponible: true,
    dimensiones: "50 x 70 cm",
    material: "Papel arte 250gr",
    edicion: "Limitada a 100 ejemplares"
  },
  "3": {
    id: "3",
    nombre: "Tote Bag MAC Lima",
    precio: 18,
    descripcion: "Bolsa de algodón orgánico 100% con el logo distintivo del MAC Lima. Producida de manera sostenible y con certificación de comercio justo. Ideal para llevar tus libros y objetos cotidianos con estilo.",
    imagenes: [
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=600&fit=crop"
    ],
    categoria: "Accesorios",
    disponible: false,
    dimensiones: "38 x 42 cm",
    material: "Algodón orgánico 100%",
    color: "Natural con logo azul"
  }
};

const Product = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id && mockProducts[id]) {
      setProduct(mockProducts[id]);
    }
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.nombre,
          text: product?.descripcion,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Enlace copiado",
      description: "El enlace del producto ha sido copiado al portapapeles",
    });
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === product.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.imagenes.length - 1 : prev - 1
      );
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Producto no encontrado</h2>
            <p className="text-slate-600 mb-6">
              El producto que buscas no está disponible o el código QR no es válido.
            </p>
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span>Volver</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">MAC</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">MAC Lima</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                <img
                  src={product.imagenes[currentImageIndex]}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
                {product.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {product.imagenes.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {product.imagenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-sm">
                  {product.categoria}
                </Badge>
                <Badge variant={product.disponible ? "default" : "destructive"}>
                  {product.disponible ? "Disponible en tienda" : "Agotado"}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.nombre}
              </h1>
              <div className="text-3xl font-bold text-blue-600 mb-6">
                S/ {product.precio}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Descripción</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.descripcion}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Especificaciones</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.dimensiones && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Dimensiones</span>
                    <p className="text-slate-900">{product.dimensiones}</p>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Material</span>
                    <p className="text-slate-900">{product.material}</p>
                  </div>
                )}
                {product.paginas && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Páginas</span>
                    <p className="text-slate-900">{product.paginas}</p>
                  </div>
                )}
                {product.idioma && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Idioma</span>
                    <p className="text-slate-900">{product.idioma}</p>
                  </div>
                )}
                {product.edicion && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Edición</span>
                    <p className="text-slate-900">{product.edicion}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-sm font-medium text-slate-500">Color</span>
                    <p className="text-slate-900">{product.color}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!product.disponible}
              >
                {product.disponible ? "Disponible en tienda - Pregunta por este producto" : "Producto agotado"}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Compartir producto
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>💡 Consejo:</strong> Este producto está disponible en nuestra tienda física. 
                Acércate al mostrador y menciona el código del producto para más información.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
