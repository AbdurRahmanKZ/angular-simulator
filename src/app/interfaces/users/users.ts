export interface IUsers {
  id: number;
  name: string;
  username: string;
  mail: string;
  phone: number;
  site: string;
  adress: IUsersAdress;
  company: IUsersCompany
}

export interface IUsersAdress {
  city: string;
  street: string;
  suite: string;
  zipcode: number;
  geo: IUsersGeo;
}

export interface IUsersCompany {
  name: string;
  catchPhrase: string;
  bs: string
}

export interface IUsersGeo {
  ing: number;
}