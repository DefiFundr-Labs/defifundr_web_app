import { useState } from "react";
import TitleHeader from "../../common/dashboard/TitleHeader";
import Tabs from "../../common/dashboard/Tabs";
import { Accordion } from "../../common/dashboard/Accordion";
import { motion, AnimatePresence } from "framer-motion";
import ContractDetailCard from "../../components/dashboard/contracts/ContractDetailCard";
import { ThemeToggle } from "../../common/ThemeToggler";
import ContractHistoryList from "../../components/dashboard/contracts/ContractHistoryList";
function Contract() {
  const [title, setTitle] = useState("Insyder Website & Webapp Design");
  const [activeTab, setActiveTab] = useState("Details");
  const [activeAccordion, setActiveAccordion] = useState("Project details");
  const handleAccordion = (name: string) => {
    if (activeAccordion === name) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(name);
    }
  };

  const tabs = ["Details", "Payment history"];
  return (
    <div className="flex flex-col h-screen ">
      <TitleHeader
        isBackButton={true}
        title={title}
        isTabs
        tabs={tabs}
        selectedTab={activeTab}
        setSelectedTab={setActiveTab}
      />
      <div className="p-2 sm:p-4 dark:bg-gray-500 grow mt-0.5 bg-gray-100">
        {activeTab.toLocaleLowerCase() === tabs[0].toLocaleLowerCase() ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-2"
            >
              <Accordion
                title="Project details"
                isOpen={activeAccordion === "Project details"}
                handleOpen={() => handleAccordion("Project details")}
              >
                <ContractDetailCard />
              </Accordion>
              <Accordion
                title="Employee details"
                isOpen={activeAccordion === "Employee details"}
                handleOpen={() => handleAccordion("Employee details")}
              >
                <ContractDetailCard />
              </Accordion>
              <Accordion
                title="Payment"
                isOpen={activeAccordion === "Payment"}
                handleOpen={() => handleAccordion("Payment")}
              >
                <ContractDetailCard />
              </Accordion>
              <Accordion
                title="Compliance"
                isOpen={activeAccordion === "Compliance"}
                handleOpen={() => handleAccordion("Compliance")}
              >
                <ContractDetailCard />
              </Accordion>
            </motion.div>
          </AnimatePresence>
        ) : (
          <ContractHistoryList />
        )}
      </div>
    </div>
  );
}

export default Contract;
