
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: product?.nombre || "",
    precio: product?.precio || "",
    descripcion: product?.descripcion || "",
    categoria: product?.categoria || "",
    disponible: product?.disponible ?? true,
    dimensiones: product?.dimensiones || "",
    material: product?.material || "",
    paginas: product?.paginas || "",
    idioma: product?.idioma || "",
    edicion: product?.edicion || "",
    color: product?.color || "",
    imagenes: product?.imagenes || [""]
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.imagenes];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, imagenes: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ 
      ...prev, 
      imagenes: [...prev.imagenes, ""] 
    }));
  };

  const removeImageField = (index) => {
    if (formData.imagenes.length > 1) {
      const newImages = formData.imagenes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, imagenes: newImages }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty image URLs
    const cleanedImages = formData.imagenes.filter(img => img.trim() !== "");
    
    if (!formData.nombre || !formData.precio || cleanedImages.length === 0) {
      alert("Por favor completa todos los campos obligatorios (nombre, precio y al menos una imagen)");
      return;
    }

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      imagenes: cleanedImages
    };

    onSave(productData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product ? "Editar Producto" : "Nuevo Producto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Producto *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Catálogo de Arte Contemporáneo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio (S/) *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => handleInputChange("precio", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Descripción detallada del producto..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Libros">Libros</SelectItem>
                  <SelectItem value="Arte">Arte</SelectItem>
                  <SelectItem value="Accesorios">Accesorios</SelectItem>
                  <SelectItem value="Joyería">Joyería</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-3 pt-8">
              <Switch
                id="disponible"
                checked={formData.disponible}
                onCheckedChange={(checked) => handleInputChange("disponible", checked)}
              />
              <Label htmlFor="disponible">Producto disponible</Label>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Imágenes del Producto *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar imagen
              </Button>
            </div>
            {formData.imagenes.map((imagen, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={imagen}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="URL de la imagen (ej: https://example.com/image.jpg)"
                  className="flex-1"
                />
                {formData.imagenes.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeImageField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <p className="text-sm text-slate-500">
              Puedes usar imágenes de Unsplash, como: https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Especificaciones (Opcional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dimensiones">Dimensiones</Label>
                <Input
                  id="dimensiones"
                  value={formData.dimensiones}
                  onChange={(e) => handleInputChange("dimensiones", e.target.value)}
                  placeholder="Ej: 24 x 30 cm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => handleInputChange("material", e.target.value)}
                  placeholder="Ej: Algodón 100%"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paginas">Páginas</Label>
                <Input
                  id="paginas"
                  value={formData.paginas}
                  onChange={(e) => handleInputChange("paginas", e.target.value)}
                  placeholder="Ej: 240 páginas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Input
                  id="idioma"
                  value={formData.idioma}
                  onChange={(e) => handleInputChange("idioma", e.target.value)}
                  placeholder="Ej: Español/Inglés"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edicion">Edición</Label>
                <Input
                  id="edicion"
                  value={formData.edicion}
                  onChange={(e) => handleInputChange("edicion", e.target.value)}
                  placeholder="Ej: Edición limitada"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="Ej: Azul marino"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-6">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              {product ? "Actualizar Producto" : "Crear Producto"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
