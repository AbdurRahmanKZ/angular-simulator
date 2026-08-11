export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IUsersAddress;
  company: IUsersCompany;
}

export interface IUsersAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: IUsersGeo;
}

export interface IUsersCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUsersGeo {
  lat: string;
  lng: string;
}