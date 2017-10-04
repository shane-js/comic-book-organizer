export function isNumber() {
    return typeof this === 'number';
}

export function isNullOrUndefined() {
    return typeof this === 'undefined' || this === null;
}

export function isNullUndefinedOrEmptyString() {
    return this::isNullOrUndefined() || this === "" || this.length === 0 || !this.trim();
}


