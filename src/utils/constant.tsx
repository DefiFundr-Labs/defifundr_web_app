import {
  CalendarCheckIcon,
  DocumentIcon,
  Dollar,
  DollarCircle,
  NotebookIcon,
  Profile,
} from "../assets/svg/svg";
import {
  AccountOption,
  Address,
  AddressData,
  CompanyInfo,
  ProfileData,
  TemplateData,
  UserPermissionsData,
} from "../types/types";

export const accountTypeOptions: AccountOption[] = [
  {
    id: "business",
    title: "Business",
    description: "For companies and organizations managing business operations",
    // icon: businessIcon,
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "For independent contractors and self-employed professionals",
    // icon: freelancerIcon,
  },
  {
    id: "employee",
    title: "Employee/Contractor",
    description: "For individuals working within an organization",
    // icon: employeeIcon,
  },
];

export const AUTH_STEPS = {
  CREATE_ACCOUNT: 1,
  CREATE_PASSWORD: 2,
  ACCOUNT_TYPE: 3,
  BUSINESS_INFO: 4,
} as const;

export const MetricsData = [
  {
    title: "Completed contracts",
    value: "12",
    subValue: "10 employees",
    icon: <CalendarCheckIcon />,
  },
  {
    title: "Active contracts",
    value: "04",
    subValue: "04 employees",
    icon: <CalendarCheckIcon />,
  },
  {
    title: "Average Salary per Contract",
    value: "$7,200.00",
    subValue: "12 contracts",
    icon: <Dollar />,
  },
  {
    title: "Total Locked in Escrow",
    value: "$20,200.00",
    subValue: "04 contracts",
    icon: <DollarCircle />,
  },
];

export const contractsData = [
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "In Review",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Rejected",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Active",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Active",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
];

export const dummyEmployees = [
  {
    id: 1,
    name: "Omobolaji Olanrewaju Akinbiola",
    job: "Frontend Developer",
    contracts: 1,
    active: true,
  },
  {
    id: 2,
    name: "Raymond Joseph",
    job: "Frontend Developer",
    contracts: 7,
    active: true,
  },
  {
    id: 3,
    name: "Michael Francis",
    job: "Frontend Developer",
    contracts: 9,
    active: false,
  },
  {
    id: 4,
    name: "Alice Johnson",
    job: "UI/UX Designer",
    contracts: 2,
    active: true,
  },
  {
    id: 5,
    name: "Michael Brown",
    job: "DevOps Engineer",
    contracts: 6,
    active: false,
  },
  {
    id: 6,
    name: "Emily Davis",
    job: "Project Manager",
    contracts: 4,
    active: true,
  },
  {
    id: 7,
    name: "David Wilson",
    job: "Data Analyst",
    contracts: 1,
    active: false,
  },
  {
    id: 8,
    name: "Sophia Lee",
    job: "Mobile Developer",
    contracts: 7,
    active: true,
  },
  {
    id: 9,
    name: "Chris Taylor",
    job: "QA Engineer",
    contracts: 3,
    active: false,
  },
  {
    id: 10,
    name: "Olivia White",
    job: "Full Stack Developer",
    contracts: 8,
    active: true,
  },
  {
    id: 11,
    name: "Daniel Harris",
    job: "Product Owner",
    contracts: 2,
    active: false,
  },
];

export const invoiceMetricsData = [
  {
    title: "Total invoices",
    value: "$ 7,200.00",
    subValue: "20 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Unpaid invoices",
    value: "$ 1,200.00",
    subValue: "04 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Paid invoices",
    value: "$ 5,000.00",
    subValue: "12 Invoices",
    icon: <DocumentIcon />,
  },
  {
    title: "Overdue invoices",
    value: "$ 1,000.00",
    subValue: "04 Invoices",
    icon: <DocumentIcon />,
  },
];

export const billingDetailsData = [
  {
    tag: "Billed to",
    name: "James Akinbiola",
    mail: " mailjames@gmail.com",
    phone: "+234 903 489 4238",
    location:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  },
  {
    tag: "Billed from",
    name: "Tomiwa Oluwagbemiga",
    mail: " mailjames@gmail.com",
    phone: "+234 903 489 4238",
    location:
      "No 8 James Robertson Shittu/Ogunlana Drive, Surulere, Nigeria | 142261",
  },
];

export const invoiceServiceData = [
  {
    icon: <NotebookIcon />,
    title: "Quikdash",
    desc: "Pay as you go",
    buttonText: "View contract",
    link: "",
  },
  {
    icon: <Profile />,
    title: "James Akinbiola",
    desc: "Front-end developer",
    buttonText: "View details",
    link: "",
  },
];

export const invoiceBreakDownData = [
  {
    title: "Item Name",
    value: "$500",
    subValue: "100 unit(s) at $5",
  },
  {
    title: "Item Name",
    value: "$80",
    subValue: "10 unit(s) at $8",
  },
  {
    title: "Subtotal",
    value: "$580",
  },
  {
    title: "VAT (20%)",
    value: "$2.20",
  },
];

// COMPANY INFORMATION SETTINGS
let companyInformationData = {
  companyName: "Touchpoint 360",
  registeredName: "Touchpoint 360",
  registrationNumber: "",
  countryCode: "NG",
  size: "",
  vatRate: "",
  websiteURL: "https://www.touchpoint360.com",
};

export function getCompanyInformation(): CompanyInfo {
  try {
    const stored = localStorage.getItem("companyInformation");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to parse stored company information:", e);
  }
  return companyInformationData;
}

export function updateCompanyInformation(
  data: Partial<CompanyInfo>
): CompanyInfo {
  companyInformationData = { ...companyInformationData, ...data };

  try {
    localStorage.setItem(
      "companyInformation",
      JSON.stringify(companyInformationData)
    );
  } catch (e) {
    console.warn("Failed to save company information to localStorage:", e);
  }
  return companyInformationData;
}

// BILLING ADDRESS SETTINGS
let addressData = {
  billingAddress: {
    addressLine: "",
    alternateAddress: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
  },
  registeredAddress: {
    addressLine: "",
    alternateAddress: "",
    city: "",
    region: "",
    country: "",
    postalCode: "",
  },
};

export function getAddressData() {
  try {
    const stored = localStorage.getItem("addressData");
    if (stored) {
      const parsedData: AddressData = JSON.parse(stored);
      return parsedData;
    } else return null;
  } catch (e) {
    return null;
  }
}

export function updateAddressData(
  section: keyof AddressData,
  data: Partial<Address>
) {
  addressData = {
    ...addressData,
    [section]: {
      ...addressData[section],
      ...data,
    },
  };
  try {
    localStorage.setItem("addressData", JSON.stringify(addressData));
  } catch (e) {
    console.warn("Failed to save addressData to localStorage", e);
  }
}

// PERMISSION SETTINGS
let permissionsData = [
  {
    id: 1,
    name: "James Akinbiola",
    email: "mailjames@gmail.com",
    permissions: ["Administrator"],
  },
];

export function getAllUserPermission(): UserPermissionsData[] {
  try {
    const stored = localStorage.getItem("permission");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to parse stored user information:", e);
  }
  return permissionsData;
}

export function updateUserPermission(data: Partial<UserPermissionsData>) {
  try {
    const stored = localStorage.getItem("permission");
    let existing = stored ? JSON.parse(stored) : permissionsData;
    existing.push(data);

    localStorage.setItem("permission", JSON.stringify(existing));
  } catch (e) {
    console.warn("Failed to save user information to localStorage:", e);
  }
}

// EDIT PROFILE SETTINGS
let editProfile = {
  name: "Peter",
  email: "dapoye8379@deusa7.com",
};

export function getProfile(): ProfileData {
  try {
    const stored = localStorage.getItem("profile");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to parse stored profile information:", e);
  }
  return editProfile;
}

export function updateProfile(data: Partial<ProfileData>) {
  const editProfileData = { ...editProfile, ...data };

  try {
    localStorage.setItem("profile", JSON.stringify(editProfileData));
  } catch (e) {
    console.warn("Failed to save profile information to localStorage:", e);
  }
}

const TEMPLATE_KEY = "template";

export function getTemplates(): TemplateData[] | null {
  try {
    const stored = localStorage.getItem(TEMPLATE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to parse stored template information:", e);
  }
  return null;
}

export function saveTemplate(template: TemplateData) {
  try {
    const stored = localStorage.getItem(TEMPLATE_KEY);
    const templates: TemplateData[] = stored ? JSON.parse(stored) : [];

    const exists = templates.some((t) => t.id === template.id);

    const newList = exists
      ? templates.map((t) => (t.id === template.id ? template : t))
      : [...templates, template];

    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(newList));
  } catch (e) {
    console.warn("Failed to save template:", e);
  }
}
