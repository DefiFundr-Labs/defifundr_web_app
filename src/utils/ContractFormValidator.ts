import {
  CreateContractFormProps,
  ContractFormStep,
  MilestoneDetails,
} from "../types/types";

export class ContractFormValidator {
  static validateStep(
    step: ContractFormStep,
    formData: CreateContractFormProps
  ): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    switch (step) {
      case 1: // Contract Type
        if (!formData.contractType) {
          errors.push("Contract type is required");
        }
        break;

      case 2: // Project Details
        if (!formData.projectTitle?.trim()) {
          errors.push("Project title is required");
        }
        if (!formData.jobRole?.trim()) {
          errors.push("Job role is required");
        }
        if (!formData.scope?.trim()) {
          errors.push("Scope of work is required");
        }
        if (formData.projectTitle && formData.projectTitle.length < 3) {
          warnings.push("Project title should be more descriptive");
        }
        break;

      case 3: // Employee Details
        const employee = formData.employeeDetails[0];
        if (!employee?.firstName?.trim()) {
          errors.push("First name is required");
        }
        if (!employee?.lastName?.trim()) {
          errors.push("Last name is required");
        }
        if (!employee?.email?.trim()) {
          errors.push("Email is required");
        } else if (!this.isValidEmail(employee.email)) {
          errors.push("Valid email is required");
        }
        if (!employee?.phoneNumber?.trim()) {
          errors.push("Phone number is required");
        }
        if (!employee?.country?.trim()) {
          errors.push("Country is required");
        }
        if (!employee?.address?.trim()) {
          errors.push("Address is required");
        }
        if (!employee?.city?.trim()) {
          errors.push("City is required");
        }
        break;

      case 4: // Contract Details
        const { contractDetails, contractType } = formData;

        // Common validations
        if (!contractDetails.startDate) {
          errors.push("Start date is required");
        } else if (new Date(contractDetails.startDate) < new Date()) {
          errors.push("Start date cannot be in the past");
        }

        if (contractDetails.noticePeriod < 0) {
          errors.push("Notice period cannot be negative");
        }

        if (!contractDetails.paymentDetails.network) {
          errors.push("Payment network is required");
        }

        if (!contractDetails.paymentDetails.asset) {
          errors.push("Payment asset is required");
        }

        // Contract type specific validations
        if (contractType === "milestone") {
          const milestoneValidation = this.validateMilestones(
            contractDetails.milestoneDetails
          );
          errors.push(...milestoneValidation.errors);
          warnings.push(...milestoneValidation.warnings);
        } else {
          // Fixed rate and pay-as-you-go validations
          if (!contractDetails.paymentDetails.amount) {
            errors.push("Payment amount is required");
          } else if (parseFloat(contractDetails.paymentDetails.amount) <= 0) {
            errors.push("Payment amount must be greater than 0");
          }

          if (!contractDetails.invoiceDetails.invoiceFrequency) {
            errors.push("Invoice frequency is required");
          }

          if (!contractDetails.invoiceDetails.issueInvoiceOn) {
            errors.push("Invoice issue timing is required");
          }

          if (!contractDetails.invoiceDetails.paymentDue) {
            errors.push("Payment due timing is required");
          }

          // First invoice validations
          if (contractDetails.firstInvoice.type === "custom") {
            if (!contractDetails.firstInvoice.date) {
              errors.push("First payment date is required for custom payments");
            }
            if (!contractDetails.firstInvoice.amount) {
              errors.push(
                "First payment amount is required for custom payments"
              );
            } else {
              const firstAmount = parseFloat(
                contractDetails.firstInvoice.amount
              );
              const totalAmount = parseFloat(
                contractDetails.paymentDetails.amount
              );
              if (firstAmount > totalAmount) {
                errors.push("First payment cannot exceed total amount");
              }
            }
          }
        }

        // Tax validations
        if (
          contractDetails.taxDetails?.taxType &&
          !contractDetails.taxDetails.accountNumber
        ) {
          errors.push(
            "Tax account number is required when tax type is specified"
          );
        }
        if (
          contractDetails.taxDetails?.taxType &&
          !contractDetails.taxDetails.taxRate
        ) {
          errors.push("Tax rate is required when tax type is specified");
        }
        break;

      case 5: // Compliance
        // Add compliance validations here
        warnings.push("Compliance validation not implemented yet");
        break;

      case 6: // Review & Sign
        // Final review validations
        const allStepsValid = [1, 2, 3, 4, 5].every(
          (stepNum) =>
            this.validateStep(stepNum as ContractFormStep, formData).isValid
        );
        if (!allStepsValid) {
          errors.push("Please complete all previous steps before reviewing");
        }
        break;

      default:
        errors.push("Invalid step");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validates milestone-specific requirements
   */
  static validateMilestones(milestones: MilestoneDetails[]): {
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (milestones.length === 0) {
      errors.push("At least one milestone is required for milestone contracts");
      return { errors, warnings };
    }

    milestones.forEach((milestone, index) => {
      const milestoneNum = index + 1;

      if (!milestone.title?.trim()) {
        errors.push(`Milestone ${milestoneNum}: Title is required`);
      }

      if (!milestone.amount?.trim()) {
        errors.push(`Milestone ${milestoneNum}: Amount is required`);
      } else {
        const amount = parseFloat(milestone.amount);
        if (isNaN(amount) || amount <= 0) {
          errors.push(
            `Milestone ${milestoneNum}: Amount must be a valid positive number`
          );
        }
      }

      if (milestone.dueDate) {
        const dueDate = new Date(milestone.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dueDate < today) {
          warnings.push(`Milestone ${milestoneNum}: Due date is in the past`);
        }
      }

      if (!milestone.deliverables?.trim() && !milestone.description?.trim()) {
        warnings.push(
          `Milestone ${milestoneNum}: Consider adding deliverables or description for clarity`
        );
      }
    });

    // Check for overlapping due dates
    const datedMilestones = milestones.filter((m) => m.dueDate);
    if (datedMilestones.length > 1) {
      const sortedDates = datedMilestones
        .map((m, idx) => ({ date: new Date(m.dueDate!), index: idx }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i].date;
        const previousDate = sortedDates[i - 1].date;
        const daysDiff =
          (currentDate.getTime() - previousDate.getTime()) /
          (1000 * 60 * 60 * 24);

        if (daysDiff < 7) {
          warnings.push(
            `Milestones have due dates within 7 days of each other - consider spacing them out`
          );
          break;
        }
      }
    }

    return { errors, warnings };
  }

  /**
   * Validates the entire form across all steps
   */
  static validateEntireForm(formData: CreateContractFormProps): {
    isValid: boolean;
    stepValidations: Record<
      ContractFormStep,
      { isValid: boolean; errors: string[]; warnings: string[] }
    >;
    overallErrors: string[];
    overallWarnings: string[];
  } {
    const stepValidations = {} as Record<
      ContractFormStep,
      { isValid: boolean; errors: string[]; warnings: string[] }
    >;
    const overallErrors: string[] = [];
    const overallWarnings: string[] = [];

    // Validate each step
    for (let step = 1; step <= 6; step++) {
      stepValidations[step as ContractFormStep] = this.validateStep(
        step as ContractFormStep,
        formData
      );
    }

    // Cross-step validations
    if (
      formData.contractDetails.endDate &&
      formData.contractDetails.startDate
    ) {
      const startDate = new Date(formData.contractDetails.startDate);
      const endDate = new Date(formData.contractDetails.endDate);

      if (endDate <= startDate) {
        overallErrors.push("End date must be after start date");
      }

      const contractDuration =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      if (contractDuration < 7) {
        overallWarnings.push(
          "Contract duration is less than a week - consider if this is sufficient"
        );
      }
    }

    // Milestone-specific cross validations
    if (
      formData.contractType === "milestone" &&
      formData.contractDetails.milestoneDetails.length > 0
    ) {
      const totalMilestoneAmount =
        formData.contractDetails.milestoneDetails.reduce(
          (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
          0
        );

      if (totalMilestoneAmount === 0) {
        overallErrors.push("Total milestone amount cannot be zero");
      }

      if (formData.contractDetails.milestoneDetails.length > 10) {
        overallWarnings.push(
          "Consider consolidating milestones - you have more than 10"
        );
      }
    }

    const isValid =
      Object.values(stepValidations).every(
        (validation) => validation.isValid
      ) && overallErrors.length === 0;

    return {
      isValid,
      stepValidations,
      overallErrors,
      overallWarnings,
    };
  }

  /**
   * Email validation helper
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Phone number validation helper
   */
  static isValidPhoneNumber(
    phone: string,
    countryCode: string = "+1"
  ): boolean {
    const phoneRegexMap: Record<string, RegExp> = {
      "+234": /^\+234[6789][0-9]{9}$/,
      "+1": /^\+1\d{10}$/,
      "+44": /^\+44\d{10}$/,
      "+91": /^\+91\d{10}$/,
    };

    const regex = phoneRegexMap[countryCode];
    return regex ? regex.test(phone) : phone.length >= 10;
  }

  /**
   * Currency amount validation helper
   */
  static isValidAmount(amount: string): boolean {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0 && /^\d+(\.\d{1,2})?$/.test(amount);
  }

  /**
   * Date validation helper
   */
  static isValidFutureDate(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return !isNaN(date.getTime()) && date >= today;
  }
}

// Form state management utilities
export class FormStateManager {
  /**
   * Calculates form completion percentage
   */
  static getCompletionPercentage(formData: CreateContractFormProps): number {
    const stepValidations =
      ContractFormValidator.validateEntireForm(formData).stepValidations;
    const completedSteps = Object.values(stepValidations).filter(
      (v) => v.isValid
    ).length;
    return Math.round((completedSteps / 6) * 100);
  }

  /**
   * Gets the next incomplete step
   */
  static getNextIncompleteStep(
    formData: CreateContractFormProps
  ): ContractFormStep | null {
    const stepValidations =
      ContractFormValidator.validateEntireForm(formData).stepValidations;

    for (let step = 1; step <= 6; step++) {
      if (!stepValidations[step as ContractFormStep].isValid) {
        return step as ContractFormStep;
      }
    }

    return null;
  }

  /**
   * Checks if user can proceed to a specific step
   */
  static canProceedToStep(
    targetStep: ContractFormStep,
    formData: CreateContractFormProps
  ): boolean {
    if (targetStep === 1) return true;

    // Check if all previous steps are valid
    for (let step = 1; step < targetStep; step++) {
      const validation = ContractFormValidator.validateStep(
        step as ContractFormStep,
        formData
      );
      if (!validation.isValid) {
        return false;
      }
    }

    return true;
  }
}
