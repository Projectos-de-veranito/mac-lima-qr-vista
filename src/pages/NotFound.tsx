import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8 space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://maclima.pe/wordpress/wp-content/uploads/2019/11/logo_blanco_148x50.png" 
              alt="MAC Lima"
              className="h-12 w-auto filter invert"
            />
          </div>

          {/* Error message */}
          <div className="space-y-3">
            <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
            <h1 className="text-2xl font-bold text-slate-900">
              Página no encontrada
            </h1>
            <p className="text-slate-600">
              La página que buscas no existe.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Home className="mr-2 h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;