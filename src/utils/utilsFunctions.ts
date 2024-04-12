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

export function haversine_distance(mk1: any, mk2: any) {
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}

export const createGoogleMapsUrl = (lat: string, lng: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return url;
};

export const calulateDiffBtwTwoDates = (startDate: any, endDate: any) => {
  const differenceInMilliseconds = Math.abs(endDate - startDate);
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};
