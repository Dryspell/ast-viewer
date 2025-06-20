import { Component } from "solid-js";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  class?: string;
}

const LoadingSpinner: Component<LoadingSpinnerProps> = (props) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const size = () => props.size || "md";

  return (
    <div class={`flex items-center justify-center ${props.class || ""}`}>
      <div
        class={`${sizeClasses[size()]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary/60`}
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 