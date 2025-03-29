export class loginParams{
    phoneNumber? : string | null
    password? : string | null
   
}

export class Patient {
    firstName?: string;
    phoneNumber?: string;
    age: number;
    isConsentChecked: boolean;
    dob?: Date;
    gender?: string;
    password?: string;

    pastHistory: string;
    allergies: string;
}

export class HealthProvider {
    firstName?: string;
    phoneNumber?: string;
    age: number;
    isConsentChecked: boolean;
    dob?: Date;
    gender?: string;
    password?: string;
    specializedVaccines?: string[];
    
}