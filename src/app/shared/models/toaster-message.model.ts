export interface ToasterMessage {
    severity: ToasterSeverity,
    message: string,
}

export enum ToasterSeverity {
    Success = 'success',
    Error = 'error',
}