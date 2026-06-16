export interface IEcuadorParroquias {
  [parroquiaId: string]: string;
}

export interface IEcuadorCanton {
  canton: string;
  parroquias: IEcuadorParroquias | null;
}

export interface IEcuadorCantones {
  [cantonId: string]: IEcuadorCanton;
}

export interface IEcuadorProvincia {
  provincia?: string;
  cantones: IEcuadorCantones;
}

export interface IEcuadorProvincias {
  [provinciaId: string]: IEcuadorProvincia;
}

export interface ILocationOption {
  id: string;
  name: string;
}

export interface ILocationPath {
  provinciaId: string;
  provinciaName: string;
  cantonId: string;
  cantonName: string;
  parroquiaId: string;
  parroquiaName: string;
}
