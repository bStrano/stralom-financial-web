interface FormatCurrencyOptionsInterface {
    prefix?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

const initialValues: FormatCurrencyOptionsInterface = {
    prefix: null,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}

export function formatCurrency(value: number, options = initialValues) {
    const {prefix, minimumFractionDigits, maximumFractionDigits} = options
    let formattedValue = value.toLocaleString('pt-br', {minimumFractionDigits, maximumFractionDigits})
    if (prefix) {
        formattedValue = prefix + formattedValue;
    }
    return formattedValue;
}


export function formatPercentage(value: number) {
    let formattedValue = value.toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return formattedValue + '%';
}
