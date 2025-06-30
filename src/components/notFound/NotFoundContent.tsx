import not_found_image from "../../assets/images/404.webp";
function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center  gap-4 sm:gap-6  dark:bg-gray-500 size-full rounded-lg bg-white">
      <img
        src={not_found_image}
        alt="Decorative image representing page not found error"
        className="sm:max-w-md max-w-3xs"
      />
      <div className="text-center space-y-1">
        <h1 className="font-semibold text-base dark:text-gray-150 sm:text-xl text-gray-500">
          Oops, there seems to be a problem
        </h1>
        <p className="font-medium text-xs dark:text-gray-300 max-w-xs sm:text-sm sm:max-w-sm text-gray-300">
          Contracts you create will be displayed hereSorry, the page you are
          looking for doesn't exist or has been moved. Here are some helpful
          links
        </p>
      </div>
    </div>
  );
}

export default NotFoundContent;
