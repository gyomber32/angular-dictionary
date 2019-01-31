/* tslint:disable */

declare var Object: any;
export interface DictionaryInterface {
  "id"?: number;
  "english"?: string;
  "hungarian"?: string;
  "partsOfSpeech"?: string;
  "synonym"?: string;
  "example"?: string;
}

export class Dictionary implements DictionaryInterface {
  "id": number;
  "english": string;
  "hungarian": string;
  "partsOfSpeech": string;
  "synonym": string;
  "example": string;
  constructor(data?: DictionaryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Dictionary`.
   */
  public static getModelName() {
    return "Dictionary";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Dictionary for dynamic purposes.
  **/
  public static factory(data: DictionaryInterface): Dictionary{
    return new Dictionary(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Dictionary',
      plural: 'Dictionaries',
      path: 'Dictionaries',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "english": {
          name: 'english',
          type: 'string'
        },
        "hungarian": {
          name: 'hungarian',
          type: 'string'
        },
        "partsOfSpeech": {
          name: 'partsOfSpeech',
          type: 'string'
        },
        "synonym": {
          name: 'synonym',
          type: 'string'
        },
        "example": {
          name: 'example',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
