import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>AST Explorer - Visualize Your Code Structure</Title>
					<div class="min-h-screen bg-background font-sans antialiased">
						<main class="relative flex flex-col min-h-screen">
							<Suspense fallback={<div class="flex items-center justify-center min-h-screen">Loading...</div>}>
								{props.children}
							</Suspense>
						</main>
					</div>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
