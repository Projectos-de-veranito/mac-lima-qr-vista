import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
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
			<header className="bg-slate-900 border-b sticky top-0 z-50">
				<div className="container mx-auto px-4 py-3 md:py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<img
								src="https://maclima.pe/wordpress/wp-content/uploads/2019/11/logo_blanco_148x50.png"
								alt="MAC Lima"
								className="h-6 md:h-8 w-auto"
							/>
						</div>
						{isAdmin && (
							<Link to="/admin">
								<Button variant="outline" size="sm" className="text-slate-900 border-white text-xs md:text-sm">
									<span className="hidden sm:inline">Panel Admin</span>
									<span className="sm:hidden">Admin</span>
								</Button>
							</Link>
						)}
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-8 md:py-16 px-4">
				<div className="container mx-auto text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6">
							Descubre Nuestra
							<span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
								Tienda Digital
							</span>
						</h2>
						<p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 px-4">
							Escanear los códigos QR en nuestra tienda física para ver información detallada de nuestros productos exclusivos
						</p>
						{isAdmin && (
							<div className="flex justify-center">
								<Link to="/admin">
									<Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
										Ver Panel Admin
										<ChevronRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-8 md:py-16 px-4 bg-slate-50/50">
				<div className="container mx-auto">
					<div className="text-center mb-8 md:mb-12">
						<h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Productos Destacados</h3>
						<p className="text-slate-600 max-w-2xl mx-auto px-4">
							Una selección especial de productos disponibles en nuestra tienda física
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
						{featuredProducts.map((product) => (
							<Link key={product.id} to={`/producto/${product.id}`}>
								<Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white h-full flex flex-col">
									<div className="aspect-square overflow-hidden rounded-t-lg">
										<img
											src={product.imagen}
											alt={product.nombre}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<CardHeader className="flex-grow p-4 md:p-6">
										<div className="flex items-center justify-between mb-2 flex-wrap gap-1">
											<Badge variant="secondary" className="text-xs">{product.categoria}</Badge>
											<Badge variant={product.disponible ? "default" : "destructive"} className="text-xs">
												{product.disponible ? "Disponible" : "Agotado"}
											</Badge>
										</div>
										<CardTitle className="text-base md:text-lg line-clamp-2">{product.nombre}</CardTitle>
										<CardDescription className="text-sm line-clamp-3">{product.descripcion}</CardDescription>
									</CardHeader>
									<CardContent className="mt-auto p-4 md:p-6 pt-0">
										<div className="flex items-center justify-between">
											<span className="text-xl md:text-2xl font-bold text-blue-600">S/ {product.precio}</span>
											<ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-slate-900 text-white py-8 md:py-12 px-4">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						<div className="text-center md:text-left">
							<div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
								<img 
									src="https://maclima.pe/wordpress/wp-content/uploads/2019/11/logo_blanco_148x50.png" 
									alt="MAC Lima"
									className="h-5 md:h-6 w-auto"
								/>
							</div>
							<p className="text-slate-400 text-sm md:text-base">
								Museo de Arte Contemporáneo de Lima - Promoviendo el arte y la cultura contemporánea
							</p>
						</div>
						<div className="text-center md:text-left">
							<h4 className="font-semibold mb-4">Contacto</h4>
							<div className="space-y-2 text-slate-400 text-sm md:text-base">
								<p>Av. Miguel Grau 1511, Barranco</p>
								<p>Lima, Perú</p>
								<p>+51 1 514-6800</p>
							</div>
						</div>
						<div className="text-center md:text-left">
							<h4 className="font-semibold mb-4">Horarios</h4>
							<div className="space-y-2 text-slate-400 text-sm md:text-base">
								<p>Martes a Domingo</p>
								<p>10:00 AM - 8:00 PM</p>
								<p>Lunes cerrado</p>
							</div>
						</div>
					</div>
					<div className="border-t border-slate-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-slate-400 text-sm">
						<p>&copy; 2025 MAC Lima. Todos los derechos reservados.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Index;
