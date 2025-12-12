export function formatDateTime(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;

    if(Number.isNaN(date.getTime())){
        return ''
    }


    return date.toLocaleDateString('en-NL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}