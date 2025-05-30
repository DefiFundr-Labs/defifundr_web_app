import EmptyState from "../EmptyState";

const Employees = () => {
  return (
    <>
      <div className="rounded-lg bg-white dark:bg-gray-600 flex-1 flex-col flex justify-center items-center">
        <EmptyState
          title="No employees yet"
          description="Employees you have contracts with will be displayed here"
        />
      </div>
    </>
  );
};

export default Employees;
