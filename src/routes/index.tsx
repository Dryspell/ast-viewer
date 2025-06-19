import { Component } from "solid-js";
import { A } from "@solidjs/router";

const Home: Component = () => {
	return (
		<div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			{/* Hero Section */}
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div class="text-center">
					<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						<span class="block">AST Explorer</span>
						<span class="block text-blue-600 mt-2">Visualize Your Code Structure</span>
					</h1>
					<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						Explore and understand your code's Abstract Syntax Tree with our interactive visualization tools.
						Debug, analyze, and learn from your code's structure in real-time.
					</p>
					<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
						<div class="rounded-md shadow">
							<A
								href="/ast"
								role="button"
								tabindex="0"
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
							>
								Launch AST Viewer
							</A>
						</div>
						<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
							<A
								href="/editor"
								role="button"
								tabindex="0"
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
							>
								Open Text Editor
							</A>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div class="py-12 bg-white">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Feature 1 */}
						<div class="feature-card">
							<div class="text-center">
								<div class="feature-icon-container">
									<svg class="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<h3 class="mt-4 text-lg font-medium text-gray-900">Interactive Visualization</h3>
								<p class="mt-2 text-base text-gray-500">
									Explore your code's structure through an interactive, visual representation of the Abstract Syntax Tree.
								</p>
							</div>
						</div>

						{/* Feature 2 */}
						<div class="feature-card">
							<div class="text-center">
								<div class="feature-icon-container">
									<svg class="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								</div>
								<h3 class="mt-4 text-lg font-medium text-gray-900">Real-time Updates</h3>
								<p class="mt-2 text-base text-gray-500">
									See your AST update in real-time as you modify your code in the integrated text editor.
								</p>
							</div>
						</div>

						{/* Feature 3 */}
						<div class="feature-card">
							<div class="text-center">
								<div class="feature-icon-container">
									<svg class="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								</div>
								<h3 class="mt-4 text-lg font-medium text-gray-900">Advanced Analysis</h3>
								<p class="mt-2 text-base text-gray-500">
									Gain deeper insights into your code's structure and relationships between different elements.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
