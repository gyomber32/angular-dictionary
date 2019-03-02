/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { ErrorHandler } from '../core/error.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../../models/Dictionary';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `Dictionary` model.
 */
@Injectable()
export class DictionaryApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, errorHandler);
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} english The english word in the database.
   *
   * @param {string} hungarian The hungarian word in the database.
   *
   * @param {string} partsOfSpeech The parts of speech of the given word in the database.
   *
   * @param {string} synonym The synonym of the given word in the database.
   *
   * @param {string} example An example sentence with the given word in the database.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public addWord(english: any, hungarian: any, partsOfSpeech: any, synonym: any = {}, example: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/addWord";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof english !== 'undefined' && english !== null) _urlParams.english = english;
    if (typeof hungarian !== 'undefined' && hungarian !== null) _urlParams.hungarian = hungarian;
    if (typeof partsOfSpeech !== 'undefined' && partsOfSpeech !== null) _urlParams.partsOfSpeech = partsOfSpeech;
    if (typeof synonym !== 'undefined' && synonym !== null) _urlParams.synonym = synonym;
    if (typeof example !== 'undefined' && example !== null) _urlParams.example = example;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The words have been queried.
   */
  public getAllWords(customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/getAllWords";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} id The id of the word in the database.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The word has been queried.
   */
  public getOneWord(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/getOneWord";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} english The english word in the database.
   *
   * @param {string} partsOfSpeech The parts of speech of the given word in the database.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The word has been checked.
   */
  public checkWord(english: any, partsOfSpeech: any, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/checkWord";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof english !== 'undefined' && english !== null) _urlParams.english = english;
    if (typeof partsOfSpeech !== 'undefined' && partsOfSpeech !== null) _urlParams.partsOfSpeech = partsOfSpeech;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} id The id of the word in the database.
   *
   * @param {string} english The english word in the database.
   *
   * @param {string} hungarian The hungarian word in the database.
   *
   * @param {string} partsOfSpeech The parts of speech of the given word in the database.
   *
   * @param {string} synonym The synonym of the given word in the database.
   *
   * @param {string} example An example sentence with the given word in the database.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public modifyWord(id: any, english: any, hungarian: any, partsOfSpeech: any, synonym: any = {}, example: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "PUT";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/modifyWord";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof english !== 'undefined' && english !== null) _urlParams.english = english;
    if (typeof hungarian !== 'undefined' && hungarian !== null) _urlParams.hungarian = hungarian;
    if (typeof partsOfSpeech !== 'undefined' && partsOfSpeech !== null) _urlParams.partsOfSpeech = partsOfSpeech;
    if (typeof synonym !== 'undefined' && synonym !== null) _urlParams.synonym = synonym;
    if (typeof example !== 'undefined' && example !== null) _urlParams.example = example;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {number} id The id of the word in the database.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteWord(id: any, customHeaders?: Function): Observable<any> {
    let _method: string = "DELETE";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Dictionaries/deleteWord";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Dictionary`.
   */
  public getModelName() {
    return "Dictionary";
  }
}
