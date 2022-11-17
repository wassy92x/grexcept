export namespace ObjectToJsonConverter {
    export function convert(rawObject: object): object {
        return _convertObjectToJson(rawObject, WeakSet ? new WeakSet() : new Set());
    }

    function _convertObjectToJson(rawObject: object, visitedObjects: WeakSet<object> | Set<object>): object {
        visitedObjects.add(rawObject);
        if (rawObject instanceof Map)
            return _convertMapToJson(rawObject, visitedObjects);
        else if (_isIterable(rawObject))
            return _convertIterableToJson(rawObject, visitedObjects);
        return _convertSimpleObjectToJson(rawObject, visitedObjects);
    }

    function _isIterable(o: any): o is Iterable<any> {
        return o && typeof o[Symbol.iterator] === 'function';
    }

    function _convertSimpleObjectToJson(rawObject: any, visitedObjects: WeakSet<object> | Set<object>): object {
        const objProperties = Reflect.ownKeys(rawObject);
        const result: any = {};
        for (const property of objProperties) {
            const propertyName = typeof property !== 'symbol' ? property : ((property as any).description ?? property.toString().slice(7, -1));
            const isPrivate = typeof property !== 'symbol' ? /^_|#.+/.test(propertyName.toString()) : false;
            if (isPrivate)
                continue;

            const value = rawObject[property];
            const typeOfValue = typeof value;
            if (typeOfValue === 'string' || typeOfValue === 'boolean' || typeOfValue === 'number' || value === null) {
                result[propertyName] = value;
            } else if (typeOfValue === 'object') {
                if (!visitedObjects.has(value))
                    result[propertyName] = _convertObjectToJson(value, visitedObjects);
            }
        }
        return result;
    }

    function _convertMapToJson(map: Map<any, any>, visitedObjects: WeakSet<object> | Set<object>): object {
        const result: any = {};
        for (let [key, value] of map) {
            let keyType = typeof key;
            if (keyType === 'symbol') {
                key = ((key as any).description ?? key.toString().slice(7, -1));
                keyType = 'string';
            }

            if (keyType !== 'string' && keyType !== 'number')
                continue;

            const valueType = typeof value;
            if (valueType === 'string' || valueType === 'boolean' || valueType === 'number' || value === null) {
                result[key] = value;
            } else if (valueType === 'object') {
                if (!visitedObjects.has(value))
                    result[key] = _convertObjectToJson(value, visitedObjects);
            }
        }
        return result;
    }

    function _convertIterableToJson(iterable: Iterable<any>, visitedObjects: WeakSet<object> | Set<object>): any[] {
        const result = [];
        for (const value of iterable) {
            const typeOfValue = typeof value;
            if (typeOfValue === 'string' || typeOfValue === 'boolean' || typeOfValue === 'number' || value === null) {
                result.push(value);
            } else if (typeOfValue === 'object') {
                if (!visitedObjects.has(value))
                    result.push(_convertObjectToJson(value, visitedObjects));
            }
        }
        return result;
    }
}