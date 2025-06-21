import { useState } from "react";

function FilterEmployeeModal() {
    const [selected, setSelected] = useState('option1');
    const [selected2, setSelected2] = useState('All');
  const buttons = [
    { label: 'All', value: 'option1' },
    { label: 'Active', value: 'option2' },
    { label: 'Inactive', value: 'option3' },
  ];

  const buttons2 = [
    { label: 'All', value: 'All' },
    { label: 'Freelancer', value: 'Freelancer' },
    { label: 'Contractor', value: 'Contractor' },
  ];

    return (
        <div>
            <p className="text-xl text-gray-500 dark:text-gray-150 font-semibold text-center">Filter</p>
            <div>
                <p className="text-gray-500 dark:text-gray-150 text-xs font-medium">Contract</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {buttons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setSelected(btn.value)}
                            className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${selected === btn.value
                                    ? 'bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400'
                                    : 'bg-gray-100 dark:bg-gray-500 text-gray-300 dark:text-gray-300'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <p className="text-gray-500 dark:text-gray-150 text-xs font-medium">Type</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {buttons2.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setSelected2(btn.value)}
                            className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${selected2 === btn.value
                                    ? 'bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400'
                                    : 'bg-gray-100 dark:bg-gray-500 text-gray-300 dark:text-gray-300'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-29">
                <button className="border border-gray-500 dark:border-gray-100 dark:text-gray-100 w-34 md:w-51 h-11 md:h-14 rounded-full">Cancel</button>
                <button className="w-34 md:w-51 h-11 md:h-14 rounded-full bg-primary-200 text-white">Apply</button>
            </div>
        </div>
    )
}

export default FilterEmployeeModal
