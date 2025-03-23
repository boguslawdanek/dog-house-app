import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const LoadingSpinner = ({
  size = "medium",
}: LoadingSpinnerProps): React.ReactElement => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className={`flex items-center justify-center mb-8`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-primary animate-spin`}
        aria-label="loading"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
