function RejectTimeSheetModal() {
  return (
    <div className="w-screen h-svh sm:h-fit sm:w-full">
      {/* <div className="flex ">
        <CancelIcon />
        <p>Reject timesheet</p>
      </div> */}
      <div className="p-2 ">
        <div className="w-full p-4 dark:bg-gray-500">
          <div className="w-full form-control">
            <label htmlFor="reason">Reason(s)</label>
            <textarea
              name="reason"
              className="resize-none"
              id="reason"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectTimeSheetModal;
