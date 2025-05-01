import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<div className="container mx-auto px-4 py-16">
				<div className="flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="flex-1 space-y-6">
						<div className="space-y-2">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
								Wow Planer
							</h1>
							<div className="h-1 w-20 bg-purple-600 rounded-full"></div>
						</div>
						<p className="text-lg md:text-xl text-gray-600 max-w-xl">
						A simple way for you to visualize n World of Warcraft raid encounters in 3D
						</p>
						<Button
							size="lg"
							className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8"
						>
							<Link href="/planner">Go to Planner</Link>
						</Button>
					</div>

					<div className="flex-1 w-full md:w-auto">
						<div className="aspect-square md:aspect-[4/3] w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
							{/* ThreeJS Canvas will go here */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
								<p className="text-gray-400 font-medium">
									3D Visualization Canvas
								</p>
							</div>

							{/* Decorative elements */}
							<div className="absolute top-4 left-4 w-24 h-6 bg-gray-100 rounded-md"></div>
							<div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 rounded-full"></div>
							<div className="absolute bottom-4 left-4 w-16 h-16 bg-gray-100 rounded-md"></div>
						</div>
					</div>
				</div>

		
			</div>
		</div>
	);
}
