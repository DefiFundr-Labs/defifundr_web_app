import React, { Dispatch, SetStateAction } from "react";
import SelectCard from "./SelectCard";
import { useDispatch } from "react-redux";
import { updateContractForm } from "../../../../redux/slice/createContactFormSlice";
import FormNavigation from "./FormNavigation";
interface ContractTypeProps {
  contractType: string;
  setContractType: Dispatch<
    SetStateAction<"fixed rate" | "pay as you go" | "milestone">
  >;
  setStepper: (nextStep: number) => void;
}
function ContractType({
  contractType,
  setContractType,
  setStepper,
}: ContractTypeProps) {
  const dispatch = useDispatch();

  const contractTypes = [
    {
      name: "Fixed Rate",
      text: "For contracts that have a fixed rate each payment cycle.",
    },
    {
      name: "Pay as you go",
      text: "For contracts that require time sheets or work submissions each payment cycle.",
    },
    {
      name: "Milestone",
      text: "For contracts with milestones that get paid each time they're completed.",
    },
  ];
  const handleSelectContractType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    console.log(selectedType);

    if (selectedType.toLowerCase() !== contractType.toLowerCase()) {
      setContractType(
        selectedType as "fixed rate" | "pay as you go" | "milestone"
      );
      dispatch(
        updateContractForm({
          contractType: selectedType as
            | "fixed rate"
            | "pay as you go"
            | "milestone",
        })
      );
    }
  };

  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contractTypes.map((contract, index) => (
          <SelectCard
            key={index}
            type="contractType"
            name={contract.name}
            text={contract.text}
            handleOnClick={(e) => handleSelectContractType(e)}
            value={contract.name}
            isChecked={
              contract.name.toLowerCase() === contractType.toLowerCase()
            }
          />
        ))}
      </div>
      <FormNavigation
        isNextDisable={contractType.toLowerCase() === ""}
        handleNext={() => setStepper(2)}
        previousBtnText="Cancel"
        handlePrev={() => {
          console.log(contractType);
        }}
      />
    </form>
  );
}

export default ContractType;
