interface ErrorMessageProps {
  errorMessage?: string;
  isVisible?: boolean;
}

const ErrorMessage = ({
  isVisible = true,
  errorMessage,
}: ErrorMessageProps) => {
  return (
    <p
      className={
        "absolute -bottom-5 break-words text-xs font-medium text-error-500 transition-opacity duration-200 " +
        (isVisible ? "opacity-100" : "opacity-0")
      }
    >
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;
