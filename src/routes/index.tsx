import { Component } from "solid-js";
import { A } from "@solidjs/router";

const Home: Component = () => {
	return (
		<div style={{
			"min-height": "100vh",
			"background-color": "#f9fafb",
			padding: "2rem",
			display: "flex",
			"flex-direction": "column",
			gap: "2rem",
			"align-items": "center"
		}}>
			<h1 style={{
				"font-size": "2.5rem",
				"font-weight": "bold",
				color: "#111827"
			}}>
				Welcome to AST Explorer
			</h1>
			<div style={{
				display: "flex",
				gap: "1rem"
			}}>
				<A href="/ast"
					style={{
						padding: "1rem 2rem",
						"background-color": "#3b82f6",
						color: "white",
						"border-radius": "0.5rem",
						"text-decoration": "none",
						"font-weight": "500"
					}}
				>
					AST Viewer
				</A>
				<A href="/editor"
					style={{
						padding: "1rem 2rem",
						"background-color": "#10b981",
						color: "white",
						"border-radius": "0.5rem",
						"text-decoration": "none",
						"font-weight": "500"
					}}
				>
					Text Editor
				</A>
			</div>
		</div>
	);
};

export default Home;
