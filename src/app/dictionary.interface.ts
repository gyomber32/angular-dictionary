export interface DictionaryElement {
    _id: String;
    english: String;
    details: Details[];
    createdAt?: Date;
}

interface Details {
    _id: String;
    hungarian: String;
    partsOfSpeech: String;
    synonym?: String;
    example?: String;
}
