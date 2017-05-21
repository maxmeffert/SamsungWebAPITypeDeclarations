/**
 * http://developer.samsung.com/onlinedocs/samsung_webapi_guide_public_2.0/html/wapi_spec/webapis.html#full-webidl
 */

type FilterMatchFlag = "EXACTLY"| "FULLSTRING"| "CONTAINS"| "STARTSWITH"| "ENDSWITH"| "EXISTS" ;

type SortModeOrder = "ASC"| "DESC" ;

type CompositeFilterType = "UNION"| "INTERSECTION" ;

interface AbstractFilter {}

interface AttributeFilter extends AbstractFilter {
    attributeName: string;
    matchFlag: FilterMatchFlag;
    matchValue: any;
}

interface AttributeRangeFilter extends AbstractFilter {
    attributeName: string;
    initialValue: any;
    endValue: any;
}

interface CompositeFilter extends AbstractFilter {
    type: CompositeFilterType;
    filters: Array<AbstractFilter>;
}

interface SortMode {
    attributeName: string;    
    order: SortModeOrder|never; // setraises(WebAPIException);
}

interface SimpleCoordinates {
    latitude: number|never; // setraises(WebAPIException);
    longitude: number|never; // setraises(WebAPIException);
}

declare class WebAPIException {
    readonly code: number;
    readonly name: string;
    readonly message: string;
}

declare namespace WebAPIException {
    const INDEX_SIZE_ERR = 1;
    const DOMSTRING_SIZE_ERR = 2;
    const HIERARCHY_REQUEST_ERR = 3;
    const WRONG_DOCUMENT_ERR = 4;
    const INVALID_CHARACTER_ERR = 5;
    const NO_DATA_ALLOWED_ERR = 6;
    const NO_MODIFICATION_ALLOWED_ERR = 7;
    const NOT_FOUND_ERR = 8;
    const NOT_SUPPORTED_ERR = 9;
    const INUSE_ATTRIBUTE_ERR = 10;
    const INVALID_STATE_ERR = 11;
    const SYNTAX_ERR = 12;
    const INVALID_MODIFICATION_ERR = 13;
    const NAMESPACE_ERR = 14;
    const INVALID_ACCESS_ERR = 15;
    const VALIDATION_ERR = 16;
    const TYPE_MISMATCH_ERR = 17;
    const SECURITY_ERR = 18;
    const NETWORK_ERR = 19;
    const ABORT_ERR = 20;
    const URL_MISMATCH_ERR = 21;
    const QUOTA_EXCEEDED_ERR = 22;
    const TIMEOUT_ERR = 23;
    const INVALID_NODE_TYPE_ERR = 24;
    const DATA_CLONE_ERR = 25;
}

interface WebAPIError {
    readonly code: number;
    readonly name: string;
    readonly message: string;
}

interface SuccessCallback {
    (): void;
    // onsuccess(): void;
}

interface ErrorCallback {
    (error: WebAPIError): void
    // onerror(error: WebAPIError): void
}
