import { CareOrderStatus } from "@/types/types";

export const formatPetAge = (age: string) => {
  switch (age) {
    case "very-young":
      return "Cachorr@";
    case "young":
      return "Joven";
    case "adult":
      return "Adult@";
    case "elder":
      return "Ancian@";
  }
};
export const formatPetSize = (size: string) => {
  switch (size) {
    case "S":
      return "Pequeño";
    case "M":
      return "Mediano";
    case "L":
      return "Grande";
  }
};

export const parseCareOrderStatus = (status: CareOrderStatus) => {
  switch (status) {
    case CareOrderStatus.NOT_CONFIRMED:
      return "Pendiente";
    case CareOrderStatus.CANCELLED:
      return "Cancelada";
    case CareOrderStatus.CONFIRMED:
      return "Confirmada";
    case CareOrderStatus.EXPIRED:
      return "Expirada";
    case CareOrderStatus.FULLFILLED:
      return "Completada";
    case CareOrderStatus.ON_GOING:
      return "En proceso";
    default:
      "";
  }
};
export const parseCareOrderBtnClass = (status: CareOrderStatus) => {
  switch (status) {
    case CareOrderStatus.NOT_CONFIRMED:
      return "bg-yellow-500 pulse";
    case CareOrderStatus.CANCELLED:
      return "bg-red-500";
    case CareOrderStatus.CONFIRMED:
      return "bg-green-500 pulse";
    case CareOrderStatus.EXPIRED:
      return "bg-red-500";
    case CareOrderStatus.FULLFILLED:
      return "bg-green-500";
    case CareOrderStatus.ON_GOING:
      return "bg-green-500 pulse";
    default:
      return "";
  }
};

export const calculateAmountOfDays = (dates: any) => {
  const startDate = new Date(dates?.startDate);
  const endDate = new Date(dates?.endDate);
  // To calculate the time difference of two dates
  let Difference_In_Time = endDate.getTime() - startDate.getTime();

  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days;
};
