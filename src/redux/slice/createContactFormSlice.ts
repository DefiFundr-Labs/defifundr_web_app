import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComplianceDetails } from "../../types/types";

// Enhanced milestone type
export type MilestoneDetails = {
  id: number;
  title: string;
  amount: string;
  description?: string;
  dueDate?: string;
  deliverables?: string;
  createdAt: string;
  updatedAt?: string;
};

// Enhanced contract details type
export type ContractDetails = {
  startDate: string;
  endDate?: string;
  noticePeriod: number;
  paymentDetails: {
    network: string;
    asset: string;
    amount: string;
  };
  invoiceDetails: {
    invoiceFrequency: string;
    issueInvoiceOn: string;
    paymentDue: string;
  };
  firstInvoice: {
    type: "full" | "custom";
    date?: string;
    amount?: string;
  };
  taxDetails?: {
    taxType: string;
    accountNumber: string;
    taxRate: string;
  };
  milestoneDetails: MilestoneDetails[];
  requireDeposit?: boolean;
  rateUnit?: string;
  totalMilestoneAmount?: string;
  completedMilestones?: number;
};

// Enhanced form state type
export type CreateContractFormProps = {
  contractType: "fixed rate" | "pay as you go" | "milestone";
  projectType: "freelancer" | "contractor";
  projectTitle: string;
  jobRole: string;
  scope: string;
  employeeDetails: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    address: string;
    city: string;
    postalCode: string;
  }>;
  contractDetails: ContractDetails;
  complianceDetails: Array<ComplianceDetails>;
  formStep: number;
  isFormValid: boolean;
  lastUpdated: string;
};

const initialState: CreateContractFormProps = {
  contractType: "fixed rate",
  projectType: "freelancer",
  projectTitle: "",
  jobRole: "",
  scope: "",
  employeeDetails: [
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
      postalCode: "",
    },
  ],
  contractDetails: {
    startDate: "",
    endDate: "",
    noticePeriod: 0,
    paymentDetails: {
      network: "",
      asset: "",
      amount: "",
    },
    invoiceDetails: {
      invoiceFrequency: "",
      issueInvoiceOn: "",
      paymentDue: "",
    },
    firstInvoice: {
      type: "full",
      date: "",
      amount: "",
    },
    taxDetails: {
      taxType: "",
      accountNumber: "",
      taxRate: "",
    },
    milestoneDetails: [],
    requireDeposit: false,
    rateUnit: "hourly",
    totalMilestoneAmount: "0",
    completedMilestones: 0,
  },
  complianceDetails: [
    { agreement: null, additionalAgreement: "", agreementType: "" },
  ],

  formStep: 1,
  isFormValid: false,
  lastUpdated: new Date().toISOString(),
};

const createContractSlice = createSlice({
  name: "contractForm",
  initialState,
  reducers: {
    updateContractForm: (
      state,
      action: PayloadAction<Partial<CreateContractFormProps>>
    ) => {
      Object.assign(state, action.payload);
      state.lastUpdated = new Date().toISOString();
    },

    updateContractDetails: (
      state,
      action: PayloadAction<Partial<ContractDetails>>
    ) => {
      state.contractDetails = {
        ...state.contractDetails,
        ...action.payload,
      };
      state.lastUpdated = new Date().toISOString();
    },

    updateEmployeeDetails: (
      state,
      action: PayloadAction<
        Partial<CreateContractFormProps["employeeDetails"][0]> & {
          index: number;
        }
      >
    ) => {
      const { index, ...employeeData } = action.payload;
      if (state.employeeDetails[index]) {
        state.employeeDetails[index] = {
          ...state.employeeDetails[index],
          ...employeeData,
        };
      }
      state.lastUpdated = new Date().toISOString();
    },
    updateComplianceDetails: (
      state,
      action: PayloadAction<
        Partial<CreateContractFormProps["complianceDetails"][0]> & {
          index: number;
        }
      >
    ) => {
      const { index, ...complianceData } = action.payload;

      // Ensure array exists
      if (!Array.isArray(state.complianceDetails)) {
        state.complianceDetails = [];
      }

      // Ensure specific index exists
      if (!state.complianceDetails[index]) {
        state.complianceDetails[index] = {
          agreement: null,
          additionalAgreement: "",
          agreementType: "",
        };
      }

      state.complianceDetails[index] = {
        ...state.complianceDetails[index],
        ...complianceData,
      };

      state.lastUpdated = new Date().toISOString();
    },

    addMilestone: (state, action: PayloadAction<MilestoneDetails>) => {
      state.contractDetails.milestoneDetails.push(action.payload);

      // Recalculate total milestone amount
      const total = state.contractDetails.milestoneDetails.reduce(
        (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
        0
      );
      state.contractDetails.totalMilestoneAmount = total.toFixed(2);
      state.lastUpdated = new Date().toISOString();
    },

    updateMilestone: (
      state,
      action: PayloadAction<{
        id: number;
        updates: Partial<MilestoneDetails>;
      }>
    ) => {
      const { id, updates } = action.payload;
      const milestoneIndex = state.contractDetails.milestoneDetails.findIndex(
        (milestone) => milestone.id === id
      );

      if (milestoneIndex >= 0) {
        state.contractDetails.milestoneDetails[milestoneIndex] = {
          ...state.contractDetails.milestoneDetails[milestoneIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        // Recalculate total if amount changed
        if (updates.amount !== undefined) {
          const total = state.contractDetails.milestoneDetails.reduce(
            (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
            0
          );
          state.contractDetails.totalMilestoneAmount = total.toFixed(2);
        }
      }
      state.lastUpdated = new Date().toISOString();
    },

    removeMilestone: (state, action: PayloadAction<number>) => {
      state.contractDetails.milestoneDetails =
        state.contractDetails.milestoneDetails.filter(
          (milestone) => milestone.id !== action.payload
        );

      // Recalculate total milestone amount
      const total = state.contractDetails.milestoneDetails.reduce(
        (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
        0
      );
      state.contractDetails.totalMilestoneAmount = total.toFixed(2);
      state.lastUpdated = new Date().toISOString();
    },

    setFormStep: (state, action: PayloadAction<number>) => {
      state.formStep = action.payload;
      try {
        localStorage.setItem("contract_form_step", action.payload.toString());
      } catch (error) {
        console.error("Failed to save step:", error);
      }
    },
    loadFromStorage: (_, action: PayloadAction<CreateContractFormProps>) => {
      // Load saved data into state
      return { ...action.payload };
    },

    setFormValidity: (state, action: PayloadAction<boolean>) => {
      state.isFormValid = action.payload;
    },

    resetContractForm: () => ({
      ...initialState,
      lastUpdated: new Date().toISOString(),
    }),

    duplicateMilestone: (state, action: PayloadAction<number>) => {
      const originalMilestone = state.contractDetails.milestoneDetails.find(
        (m) => m.id === action.payload
      );

      if (originalMilestone) {
        const duplicatedMilestone: MilestoneDetails = {
          ...originalMilestone,
          id: Date.now() + Math.random(),
          title: `${originalMilestone.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: undefined,
        };

        state.contractDetails.milestoneDetails.push(duplicatedMilestone);

        // Recalculate total
        const total = state.contractDetails.milestoneDetails.reduce(
          (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
          0
        );
        state.contractDetails.totalMilestoneAmount = total.toFixed(2);
      }
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  updateContractForm,
  updateContractDetails,
  updateEmployeeDetails,
  addMilestone,
  updateMilestone,
  removeMilestone,
  setFormStep,
  setFormValidity,
  resetContractForm,
  duplicateMilestone,
  loadFromStorage,
  updateComplianceDetails,
} = createContractSlice.actions;

export default createContractSlice.reducer;
