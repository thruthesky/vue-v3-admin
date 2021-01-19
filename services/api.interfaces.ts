export interface ApiUser {
  ID?: string;
  session_id?: string;
  user_email?: string;
  user_pass?: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  profile_photo_url?: string;
}

export interface ApiRegister {
  route?: "user.register";
}

export interface ApiLogin {
  route?: "user.login";
}

export interface ApiProfile extends ApiUser {
  route?: "user.profile";
}

export interface ApiUpdateProfile extends ApiUser {
  route?: "user.profileUpdate";
}


export interface ApiTranslationList {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ApiTranslationRequest {
  language?: string;
  code?: string;
  value?: string;
}

export interface ApiTranslationResponse {
  language: string;
  value: string;
}

export interface ApiAddTranslationLanguage extends ApiTranslationRequest {
  route?: "translation.addLanguage";
}

/// Add translations
export interface ApiAddTranslations {
  route?: 'translation.addTranslations',
  code: string,
  translations: {
    [key: string]: string;
  }
}

/// for updating translation code
export interface ApiChangeTranslationCode {
  route?: "translation.changeCode";
  oldCode: string;
  newCode: string;
}

/// for adding and updating
export interface ApiEditTranslation {
  route?: "translation.edit";
  language: string;
  code: string;
  value: string;
}

export interface ApiDeleteTranslation {
  route?: "translation.delete";
  code: string;
}
