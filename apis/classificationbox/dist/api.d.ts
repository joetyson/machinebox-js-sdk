/**
 * !!GENERATED FILE!!
 *
 * WARNING:  Do not edit this file, changes will be overwritten.
 *
 * Classificationbox
 * ClassificationBox API descriptors (unofficial)
 *
 * OpenAPI spec version: 1.0.1
 */
/// <reference path="../custom.d.ts" />
import { Configuration } from './configuration';
import { AxiosPromise } from 'axios';
/**
 *
 * @export
 */
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: any;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export declare class BaseAPI {
    protected basePath: string;
    protected configuration: Configuration | undefined;
    constructor(configuration?: Configuration, basePath?: string);
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export declare class RequiredError extends Error {
    field: string;
    name: 'RequiredError';
    constructor(field: string, msg?: string);
}
/**
 *
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     *
     * @type {string}
     * @memberof InlineResponse200
     */
    build?: string;
    /**
     *
     * @type {boolean}
     * @memberof InlineResponse200
     */
    success?: boolean;
    /**
     *
     * @type {string}
     * @memberof InlineResponse200
     */
    name?: string;
    /**
     *
     * @type {number}
     * @memberof InlineResponse200
     */
    version?: number;
    /**
     *
     * @type {string}
     * @memberof InlineResponse200
     */
    plan?: string;
    /**
     *
     * @type {string}
     * @memberof InlineResponse200
     */
    status?: string;
}
/**
 *
 * @export
 * @interface NotFoundError
 */
export interface NotFoundError {
    /**
     *
     * @type {boolean}
     * @memberof NotFoundError
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof NotFoundError
     */
    error: string;
}
/**
 *
 * @export
 * @interface SuccessfulAPIResponse
 */
export interface SuccessfulAPIResponse {
    /**
     *
     * @type {boolean}
     * @memberof SuccessfulAPIResponse
     */
    successs?: boolean;
}
/**
 *
 * @export
 * @interface UnauthorizedError
 */
export interface UnauthorizedError {
    /**
     *
     * @type {boolean}
     * @memberof UnauthorizedError
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof UnauthorizedError
     */
    error: string;
}
/**
 *
 * @export
 * @interface UnexpectedError
 */
export interface UnexpectedError {
    /**
     *
     * @type {boolean}
     * @memberof UnexpectedError
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof UnexpectedError
     */
    error: string;
}
/**
 * MetadataApi - axios parameter creator
 * @export
 */
export declare const MetadataApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo(options?: any): RequestArgs;
};
/**
 * MetadataApi - functional programming interface
 * @export
 */
export declare const MetadataApiFp: (configuration?: Configuration) => {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo(options?: any): (basePath?: string) => AxiosPromise<InlineResponse200>;
};
/**
 * MetadataApi - factory interface
 * @export
 */
export declare const MetadataApiFactory: (configuration?: Configuration, basePath?: string) => {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBoxInfo(options?: any): AxiosPromise<InlineResponse200>;
};
/**
 * MetadataApi - interface
 * @export
 * @interface MetadataApi
 */
export interface MetadataApiInterface {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataApiInterface
     */
    getBoxInfo(options?: any): AxiosPromise<InlineResponse200>;
}
/**
 * MetadataApi - object-oriented interface
 * @export
 * @class MetadataApi
 * @extends {BaseAPI}
 */
export declare class MetadataApi extends BaseAPI implements MetadataApiInterface {
    /**
     * Returns some basic details about the box.
     * @summary GetBoxInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataApi
     */
    getBoxInfo(options?: any): AxiosPromise<InlineResponse200>;
}