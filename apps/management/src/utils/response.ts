
export const successAction = (statusCode: number, data:any, message = 'Success') => {
    return { statusCode, data, message };
}

// Function to generate a fail response
export const failAction = (statusCode: number, errorMessage: string, message = 'Fail') => {
    return { statusCode, errorMessage, message };
}