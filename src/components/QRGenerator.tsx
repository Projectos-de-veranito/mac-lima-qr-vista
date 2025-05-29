
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QRGenerator = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQR = (productId) => {
    const productUrl = `${window.location.origin}/producto/${productId}`;
    // Using a free QR code API service
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(productUrl)}`;
    setQrCodeUrl(qrApiUrl);
    setSelectedProduct(productId);
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const product = products.find(p => p.id === selectedProduct);
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR_${product?.nombre.replace(/\s+/g, '_')}_${selectedProduct}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR descargado",
      description: "El código QR ha sido descargado exitosamente",
    });
  };

  const copyUrl = () => {
    if (!selectedProduct) return;
    
    const productUrl = `${window.location.origin}/producto/${selectedProduct}`;
    navigator.clipboard.writeText(productUrl);
    
    toast({
      title: "URL copiada",
      description: "El enlace del producto ha sido copiado al portapapeles",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {/* QR Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
            <QrCode className="h-4 w-4 md:h-5 md:w-5" />
            <span>Generar Código QR</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Seleccionar Producto</label>
            <Select value={selectedProduct} onValueChange={generateQR}>
              <SelectTrigger>
                <SelectValue placeholder="Elige un producto para generar su QR" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{product.nombre}</span>
                      <Badge variant={product.disponible ? "default" : "secondary"} className="ml-2 text-xs">
                        {product.disponible ? "Disponible" : "Agotado"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {qrCodeUrl && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-white p-3 md:p-4 rounded-lg border">
                  <img
                    src={qrCodeUrl}
                    alt="Código QR del producto"
                    className="w-48 h-48 md:w-64 md:h-64"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Button onClick={downloadQR} className="w-full text-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar QR
                </Button>
                <Button variant="outline" onClick={copyUrl} className="w-full text-sm">
                  Copiar URL del producto
                </Button>
              </div>

              {selectedProduct && (
                <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">URL del producto:</p>
                  <code className="text-xs bg-white p-2 rounded border block break-all">
                    {`${window.location.origin}/producto/${selectedProduct}`}
                  </code>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Generar QR Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">
              Genera códigos QR rápidamente para todos los productos disponibles
            </p>
            
            <div className="space-y-3">
              {products.filter(p => p.disponible).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.nombre}</h4>
                    <p className="text-xs text-slate-600">S/ {product.precio}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => generateQR(product.id)}
                    className="ml-2 flex-shrink-0"
                  >
                    <QrCode className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">QR</span>
                  </Button>
                </div>
              ))}
            </div>

            {products.filter(p => p.disponible).length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay productos disponibles para generar QR</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
