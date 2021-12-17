
# GreXcept

![NPM Version](https://img.shields.io/npm/v/grexcept)
![MIT License](https://img.shields.io/npm/l/grexcept)
![Minified Size](https://img.shields.io/bundlephobia/min/grexcept)

Collection of common exception classes for JavaScript, written in TypeScript
and running in the browser and NodeJS.

## Installation

```
$ npm install --save grexcept
or
$ yarn add grexcept
```

## Usage
To view all details about the classes including their attributes, please see /Docs or
follow this link: [Docs](https://htmlpreview.github.io/?https://raw.githubusercontent.com/wassy92x/grexcept/main/Docs/index.html).

### Exception
Baseclass of all other exception classes.
```
import {Exception} from 'grexcept';
new Exception(message: string, innerException?: Error)

Exception.fromObject(ex: any): Error
// wrapps object inside a exception object if object is not already a exception or error

Exception.isError(ex: any): ex is Error
// returns true for objects which implement the error-shape
```

### AggregateException
Exception that will be thrown if multiple errors occurred.
```
import {AggregateException} from 'grexcept';
new AggregateException(innerException: Error | Error[], message?: string)
new AggregateException(innerException: Error | Error[])
```

### ArgumentException
Exception that will be thrown if a value is invalid.
```
import {ArgumentException} from 'grexcept';
new ArgumentException(argumentName: PropertyKey, message?: string, innerException?: Error)
new ArgumentException(argumentName: PropertyKey, innerException?: Error)
```

### ArgumentNullException
Exception that will be thrown if a value is null or undefined.
```
import {ArgumentNullException} from 'grexcept';
new ArgumentNullException(argumentName: PropertyKey, message?: string, innerException?: Error)
new ArgumentNullException(argumentName: PropertyKey, innerException?: Error)
```

### ArgumentOutOfRangeException
Exception that will be thrown if a value is out of a range.
```
import {ArgumentOutOfRangeException} from 'grexcept';
new ArgumentOutOfRangeException(argumentName: PropertyKey, actualValue: any, message?: string, innerException?: Error)
new ArgumentOutOfRangeException(argumentName: PropertyKey, actualValue: any, innerException?: Error)
```

### ChuckNorrisException
Exception that will be thrown if a plain object is thrown somewhere else.
```
import {ChuckNorrisException} from 'grexcept';
new ChuckNorrisException(exceptionObject: any)
```

### InvalidOperationException
Exception that will be thrown if a call of a method is invalid because of the current state of the object.
```
import {InvalidOperationException} from 'grexcept';
new InvalidOperationException(message?: string, innerException?: Error)
new InvalidOperationException(innerException?: Error)
```

### InvalidFormatException
Exception that will be thrown if an object or string doesn't fulfill the excepted format.
```
import {InvalidFormatException} from 'grexcept';
new InvalidFormatException(message?: string, innerException?: Error)
new InvalidFormatException(innerException?: Error)
```

### IOException
Exception that will be thrown if an input or output error occurred.
```
import {IOException} from 'grexcept';
new IOException(message?: string, innerException?: Error)
new IOException(innerException?: Error)
```

### NotFoundException
Exception that will be thrown if some resource or entity was not found.
```
import {NotFoundException} from 'grexcept';
new NotFoundException(entity: string | (new () => any), message?: string, innerException?: Error)
new NotFoundException(entity: string | (new () => any), innerException?: Error)
```

### NotImplementedException
Exception that will be thrown if some method or operation is not implemented.
```
import {NotImplementedException} from 'grexcept';
new NotImplementedException(message?: string, innerException?: Error)
new NotImplementedException(innerException?: Error)
```

### NotPermittedException
Exception that will be thrown if the callee is not permitted to execute this method or operation.
```
import {NotPermittedException} from 'grexcept';
new NotPermittedException(message?: string, innerException?: Error)
new NotPermittedException(innerException?: Error)
```

### NotSupportedException
Exception that will be thrown if the called method or operation is not supported.
```
import {NotSupportedException} from 'grexcept';
new NotSupportedException(message?: string, innerException?: Error)
new NotSupportedException(innerException?: Error)
```

### OperationAbortedException
```
import {OperationAbortedException} from 'grexcept';
new OperationAbortedException(reason?: string, innerException?: Error)
new OperationAbortedException(innerException?: Error)
```

### TimeoutException
Exception that will be thrown if a timeout has been reached and an operation was canceled.
```
import {TimeoutException} from 'grexcept';
new TimeoutException(timeout: number, reason?: string, innerException?: Error)
new TimeoutException(timeout: number, innerException?: Error)
```

### ValidationException
Exception that will be thrown if a validation of some argument failed.
```
import {ValidationException} from 'grexcept';
new ValidationException(message?: string, innerException?: Error)
new ValidationException(innerException?: Error)
```
