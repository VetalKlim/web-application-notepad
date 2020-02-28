export interface InterfaceAuth {
  password: string;
  email?: string;
  idToken?: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse { // интерфейс для хранения токена.
  localId?: string;
  idToken: string;
  expiresIn: string;
}

export interface FbUserInfo {
  name: string;
  idUser?: string;

}

export interface UserFirebase {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
