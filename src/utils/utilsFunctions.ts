export const formatPetAge = (age: string) => {
    switch (age) {
        case 'very-young':
            return 'Cachorr@';
        case 'young':
            return 'Joven';
        case 'adult':
            return 'Adult@';
        case 'elder':
            return 'Ancian@';
    }
}
export const formatPetSize = (size: string) => {
    switch (size) {
        case 'S':
            return 'Pequeño';
        case 'M':
            return 'Mediano';
        case 'L':
            return 'Grande';
    }
}


export const calculateAmountOfDays = (dates:any) => {
    const startDate = new Date(dates?.startDate)
    const endDate = new Date(dates?.endDate)
    // To calculate the time difference of two dates
    let Difference_In_Time = endDate.getTime() - startDate.getTime();
 
    let Difference_In_Days = 
        Math.round(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days
    }