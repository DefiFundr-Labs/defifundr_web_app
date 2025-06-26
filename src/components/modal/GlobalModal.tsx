import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, resetModal } from "../../redux/slice/modalSlice";
import { RootState } from "../../redux/store";

interface ModalButton {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  className?: string;
}

const GlobalModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalProps } = useSelector((state: RootState) => state.modal);

  const {
    title,
    content,
    confirmText,
    onConfirm,
    onCancel,
    type,
    customComponent,
    size = "md",
    showButtons = true,
    buttons = [],
    showCloseButton = true,
  } = modalProps;

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch(closeModal());
    // Reset the modal state after animation completes
    setTimeout(() => {
      dispatch(resetModal());
    }, 300);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch(closeModal());
    // Reset the modal state after animation completes
    setTimeout(() => {
      dispatch(resetModal());
    }, 300);
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "full":
        return "max-w-full mx-4";
      default:
        return "max-w-md";
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return "dark:bg-black bg-white text-black dark:text-white";
      case "warning":
        return "dark:bg-black bg-white text-black dark:text-white";
      case "error":
        return "dark:bg-black bg-white text-black dark:text-white";
      case "confirm":
        return "dark:bg-black bg-white text-black dark:text-white";
      case "info":
      default:
        return "dark:bg-black bg-white text-black dark:text-white";
    }
  };

  const getButtonClass = (
    variant: string = "primary",
    customClassName?: string
  ) => {
    const baseClass = "button !w-full";

    if (customClassName) {
      return `${baseClass} ${customClassName}`;
    }

    switch (variant) {
      case "primary":
        return `${baseClass} py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200`;
      case "secondary":
        return `${baseClass} py-3 rounded-full border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200`;
      case "danger":
        return `${baseClass} py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200`;
      case "success":
        return `${baseClass} py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200`;
      default:
        return `${baseClass} button--primary`;
    }
  };

  // Determine which buttons to render
  const renderButtons = () => {
    // If custom buttons are provided, use them
    if (buttons && buttons.length > 0) {
      return buttons.map((button: ModalButton, index: number) => (
        <button
          key={index}
          className={getButtonClass(button.variant, button.className)}
          onClick={() => {
            if (button.onClick) {
              button.onClick();
            }
            dispatch(closeModal());
            setTimeout(() => {
              dispatch(resetModal());
            }, 300);
          }}
          disabled={button.disabled}
        >
          {button.text}
        </button>
      ));
    }

    // Fallback to traditional confirm button if showButtons is true
    if (showButtons) {
      return (
        <button className={getButtonClass("primary")} onClick={handleConfirm}>
          {confirmText || "Confirm"}
        </button>
      );
    }

    // No buttons
    return null;
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[99] focus:outline-none"
      onClose={showCloseButton ? handleClose : () => {}}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <DialogPanel
            transition
            className={`w-full ${getSizeClass()} flex-col flex rounded-xl ${getTypeClasses()} relative p-8 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl`}
          >
            {/* Close button - only show if showCloseButton is true */}
            {showCloseButton && (
              <button onClick={handleClose} className="self-start">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.4532 6.66675L15.9998 14.1201L8.5465 6.66675L6.6665 8.54675L14.1198 16.0001L6.6665 23.4534L8.5465 25.3334L15.9998 17.8801L23.4532 25.3334L25.3332 23.4534L17.8798 16.0001L25.3332 8.54675L23.4532 6.66675Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}

            {title && (
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                {title}
              </DialogTitle>
            )}

            {/* Render custom component or content */}
            {customComponent ? (
              <div className="mt-2">{customComponent}</div>
            ) : (
              content && (
                <div className="mt-2">
                  {typeof content === "string" ? (
                    <p className="text-gray-700 text-sm/6 dark:text-white/70">
                      {content}
                    </p>
                  ) : (
                    content
                  )}
                </div>
              )
            )}

            {/* Action buttons - only render if there are buttons to show */}
            {(showButtons || (buttons && buttons.length > 0)) && (
              <div className="flex justify-end mt-6 space-x-3 h-14">
                {renderButtons()}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GlobalModal;
