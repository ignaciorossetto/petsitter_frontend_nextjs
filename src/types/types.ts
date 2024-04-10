import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TDate } from "timeago.js";

export type NavBarPropType = {
  type?: string;
};

export type MessagePropsType = {
  message: MessageType;
  scrollRef: React.MutableRefObject<any>;
};

export enum userTypeEnum {
  USER = "user",
  SITTER = "sitter",
}

export type MessageType = {
  conversationId?: string;
  sender: string;
  text: string;
  createdAt?: TDate | undefined;
  updatedAt?: string;
  _id?: string;
};

export type ConversationType = {
  members: [string];
  _id: string;
};

export type ConversationPropsType = {
  type?: string;
  key?: any;
  conv: ConversationType;
  setSelectedReceiver: React.Dispatch<string>;
  selectedConv: string;
  setSelectedConv: React.Dispatch<string>;
  receiverID: string[];
  setOpenCreateOrder: React.Dispatch<boolean>;
};

export type PetType = {
  _id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  type: string;
  size: string;
  images: string[];
  breed: string;
  desc: string;
  age: string;
  sex: string;
  featured: boolean;
  available: boolean;
  dates?: string[];
  milisecondsDates?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type CardProps = {
  petInfo: PetType;
  handleDeletePetBtn: (petId: string) => {};
};

export type LoginFormUserPropsType = {
  containerClasses?: string;
  formClasses?: string;
  inputClasses?: string;
  googleBtnContainerClasses?: string;
};

export type AddressGoogleMapInputPropsType = {
  setAddress: React.Dispatch<AddressType>;
  register: UseFormRegister<any>;
  errors: FieldErrors<SitterSignUpFormType>;
  className?: string;
};

export interface AddressType {
  address?: string;
  latLng?: {
    lat?: number;
    lng?: number;
  };
}

export interface SignUpFormType {
  username: string;
  password: string;
  confirmPswd: string;
  email: string;
  confirmEmail: string;
  fullAddress: AddressType;
  type?: string;
  newsCheckBox?: boolean;
  termsCheckBock?: boolean;
  pets?: Array<string>;
  admin?: boolean;
  profileImg?: string;
  strategy: string;
}

export type SignUpFormPropsType = {
  setSubmittingForm: React.Dispatch<boolean>;
  setEmail: React.Dispatch<string>;
  setSubmittedForm: React.Dispatch<boolean>;
};

export interface SitterSignUpFormType {
  username: string;
  password: string;
  confirmPswd: string;
  email: string;
  addressFile: any;
  confirmEmail: string;
  fullAddress?: AddressType;
  type?: string;
  newsCheckBox?: boolean;
  termsCheckBock?: boolean;
  pets?: string[];
  admin?: boolean;
  profileImg?: any;
  strategy: string;
}

export type JWTtype = string | null;

export type GeoLocSittersInfoType = {
  lat: number;
  lng: number;
  radius: number;
};
export type LoginFormType = {
  email: string;
  password: string;
};

export interface DateInterface {
  startDate: Date;
  endDate: Date;
  key: string;
  selected: boolean;
}

export interface IFullAddress {
  address: string;
  latLng: {
    lat: number;
    lng: number;
  };
}

export interface IUser {
  _id: string;
  username: string;
  password?: string;
  email?: string;
  fullAddress?: IFullAddress;
  type: string;
  newsCheckBox?: boolean;
  admin?: boolean;
  profileImg?: string;
  pets?: string[];
  strategy: string;
  confirmedAccount?: boolean;
  careOrders?: ICareOrderModel[];
}

export interface IGeoSchema {
  type: string;
  coordinates: any[];
  address: string;
}

export interface ISitter {
  _id: string;
  username: string;
  password: string;
  location?: IGeoSchema;
  email: string;
  confirmedAccount?: boolean;
  type: string;
  newsCheckBox?: boolean;
  admin?: boolean;
  strategy: string;
  desc?: string;
  profileImg?: string;
  citas?: string[];
  price?: number;
  addressFiles?: string[];
}

export interface IBackendErrorResponse {
  name: string;
  message: string;
  code: number;
  status: string;
  cause?: any;
  layer: string;
}

export interface ICareOrder {
  _id?: string;
  orderId?: string;
  startDate: string;
  endDate: string;
  pets: string[];
}

export enum CareOrderStatus {
  NOT_CONFIRMED = "not_confirmed",
  CONFIRMED = "confirmed",
  ON_GOING = "on_going",
  FULLFILLED = "fullfilled",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export interface IPaymentInfo {
  status: PaymentStatus;
  totalPrice?: number;
  paymentId?: string;
  paymentDate?: Date;
  sitterIncome?: number;
  sitterIncomeDate?: Date;
  pimiIncome?: number;
}

export interface ICareOrderModel {
  _id?: string;
  ownerId?: string;
  pets?: PetType[] | string[];
  contactedSitters?: string[];
  confirmed?: boolean;
  status?: CareOrderStatus;
  dates: any[];
  pricePerDay?: number;
  sitter?: string;
  rate?: IRate;
  paymentInfo?: IPaymentInfo;
}

export enum PaymentStatus {
  NOT_CONFIRMED = "not_confirmed",
  PENDING = "pending",
  APPROVED = "approved",
  FAILED = "failed",
  ERROR = "error",
}

export interface IRate {
  rate: number;
  review?: string;
}
