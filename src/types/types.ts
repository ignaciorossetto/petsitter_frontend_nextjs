import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TDate } from "timeago.js"


export type NavBarPropType = {
    type?:string
}

export type MessagePropsType = {
    message: MessageType,
    scrollRef: React.MutableRefObject<any>,
  }

export type MessageType = {
    conversationId?: string,
    sender:string,
    text:string,
    createdAt?: TDate | undefined ,
    updatedAt?:string,
    _id?:string
}

export type ConversationType = {
    members:[string],
    _id:string
}

export type ConversationPropsType = {
    type?:string,
    key?:any,
    conv:ConversationType,
    setSelectedReceiver: React.Dispatch<string>,
    selectedConv: string,
    setSelectedConv:React.Dispatch<string>,
    receiverID: string[]
}

export type PetType = {
    _id: string,
    name: string,
    ownerId: string,
    ownerName: string,
    type: string,
    size: string,
    images: string[],
    breed: string,
    desc: string,
    age: string,
    sex: string,
    featured: boolean,
    available: boolean,
    dates?: string[],
    milisecondsDates?: number,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
  }

  export type CardProps = {
    petInfo:PetType,
    handleDeletePetBtn: (petId:string)=> {}
  }

  export type LoginFormPropsType = {
    type?: 'sitter'
  }

    export type AddressGoogleMapInputPropsType = {
    setAddress: React.Dispatch<AddressType>,
    register: UseFormRegister<any>,
    errors: FieldErrors<SitterSignUpFormType>,
    className?: string
    }

  export interface AddressType {
    address?: string;
    latLng?: {
      lat?: number;
      lng?: number;
    }
  
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
    setSubmittingForm: React.Dispatch<boolean>,
    setEmail: React.Dispatch<string>,
    setSubmittedForm: React.Dispatch<boolean>,
  }

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

export type JWTtype = string | null

export type GeoLocSittersInfoType = {
    lat: string;
    lng: string;
    radius: number;
}
export type LoginFormType = {
    email: string;
    password: string;
}

