import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, resetModal } from "../../redux/slice/modalSlice";
import { RootState } from "../../redux/store";

const GlobalModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalProps } = useSelector((state: RootState) => state.modal);

  const {
    title,
    content,
    confirmText,
    // cancelText,
    onConfirm,
    onCancel,
    type,
    customComponent,
    size = "md",
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

  const getButtonClass = (buttonType: "confirm" | "cancel") => {
    const baseClass = "button !w-full";

    if (buttonType === "confirm") {
      switch (type) {
        case "success":
          return `${baseClass} py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200`;
        case "warning":
          return `${baseClass} button--primary`;
        case "error":
          return `${baseClass} button--primary`;
        case "confirm":
          return `${baseClass} button--primary`;
        case "info":
        default:
          return `${baseClass} button--primary`;
      }
    } else {
      return `${baseClass} button--primary`;
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[99] focus:outline-none"
      onClose={handleClose}
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

            {/* Action buttons */}
            <div className="flex justify-end mt-6 space-x-3 h-14">
              {/* {(type === "confirm" || cancelText) && (
                <button
                  className={getButtonClass("cancel")}
                  onClick={handleClose}
                >
                  {cancelText || "Cancel"}
                </button>
              )} */}
              <button
                className={getButtonClass("confirm")}
                onClick={handleConfirm}
              >
                {confirmText || "Confirm"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GlobalModal;
