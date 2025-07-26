import { useState } from "react";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import { Accordion } from "../../../common/dashboard/Accordion";
import { motion, AnimatePresence } from "framer-motion";
import ContractDetailCard from "../../../components/dashboard/contracts/ContractDetailCard";
import ContractHistoryList from "../../../components/dashboard/contracts/ContractHistoryList";

function Contract() {
  const [title] = useState("Insyder Website & Webapp Design");
  const [activeTab, setActiveTab] = useState("Details");
  const [activeAccordion, setActiveAccordion] = useState("Project details");

  const handleAccordion = (name: string) => {
    if (activeAccordion === name) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(name);
    }
  };

  // Sample contract data - replace with actual data from your state/props/API
  const contractData = {
    projectTitle: "Insyder Website & Webapp Design",
    jobRole: "Full Stack Developer",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    scope:
      "Design and develop a modern, responsive website and web application for Insyder platform. This includes creating user interfaces, implementing backend functionality, integrating APIs, and ensuring optimal performance across all devices.",
    projectType: "Fixed Rate",
    terminationDate: "30",
  };

  const employeeData = {
    projectTitle: "Employee Information",
    jobRole: "Senior Developer",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    scope:
      "Employee details including qualifications, experience, and role responsibilities within the project team.",
    projectType: "Contract",
    terminationDate: "30",
  };

  const paymentData = {
    projectTitle: "Payment Structure",
    jobRole: "Payment Terms",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    scope:
      "Payment schedule, rates, milestones, and billing information for the contract duration.",
    projectType: "Monthly",
    terminationDate: "30",
  };

  const complianceData = {
    projectTitle: "Compliance Requirements",
    jobRole: "Legal Compliance",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    scope:
      "Legal requirements, regulations, and compliance standards that must be adhered to throughout the project lifecycle.",
    projectType: "Standard",
    terminationDate: "30",
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
                <ContractDetailCard
                  projectTitle={contractData.projectTitle}
                  jobRole={contractData.jobRole}
                  startDate={contractData.startDate}
                  endDate={contractData.endDate}
                  scope={contractData.scope}
                  projectType={contractData.projectType}
                  terminationDate={contractData.terminationDate}
                />
              </Accordion>
              <Accordion
                title="Employee details"
                isOpen={activeAccordion === "Employee details"}
                handleOpen={() => handleAccordion("Employee details")}
              >
                <ContractDetailCard
                  projectTitle={employeeData.projectTitle}
                  jobRole={employeeData.jobRole}
                  startDate={employeeData.startDate}
                  endDate={employeeData.endDate}
                  scope={employeeData.scope}
                  projectType={employeeData.projectType}
                  terminationDate={employeeData.terminationDate}
                />
              </Accordion>
              <Accordion
                title="Payment"
                isOpen={activeAccordion === "Payment"}
                handleOpen={() => handleAccordion("Payment")}
              >
                <ContractDetailCard
                  projectTitle={paymentData.projectTitle}
                  jobRole={paymentData.jobRole}
                  startDate={paymentData.startDate}
                  endDate={paymentData.endDate}
                  scope={paymentData.scope}
                  projectType={paymentData.projectType}
                  terminationDate={paymentData.terminationDate}
                />
              </Accordion>
              <Accordion
                title="Compliance"
                isOpen={activeAccordion === "Compliance"}
                handleOpen={() => handleAccordion("Compliance")}
              >
                <ContractDetailCard
                  projectTitle={complianceData.projectTitle}
                  jobRole={complianceData.jobRole}
                  startDate={complianceData.startDate}
                  endDate={complianceData.endDate}
                  scope={complianceData.scope}
                  projectType={complianceData.projectType}
                  terminationDate={complianceData.terminationDate}
                />
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
