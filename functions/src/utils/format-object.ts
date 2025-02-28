export const snakeToCamel = (snakeCaseObj: { [key: string]: any }): { [key: string]: any } => {

    function toCamelCase(snakeCaseStr: string): string {
        return snakeCaseStr.replace(/(_\w)/g, (match) => match[1].toUpperCase());
    }

    const camelCaseObj: { [key: string]: any } = {};

    for (const key in snakeCaseObj) {
        if (snakeCaseObj.hasOwnProperty(key)) {
            const camelCaseKey = toCamelCase(key);
            camelCaseObj[camelCaseKey] = snakeCaseObj[key];
        }
    }

    return camelCaseObj;
}

export const camelToSnake = (camelCaseObj: { [key: string]: any }): { [key: string]: any } => {

    function toSnakeCase(camelCaseStr: string): string {
        return camelCaseStr.replace(/([A-Z])/g, '_$1').toLowerCase();
    }

    const snakeCaseObj: { [key: string]: any } = {};

    for (const key in camelCaseObj) {
        if (camelCaseObj.hasOwnProperty(key)) {
            const snakeCaseKey = toSnakeCase(key);
            snakeCaseObj[snakeCaseKey] = camelCaseObj[key];
        }
    }

    return snakeCaseObj;
}