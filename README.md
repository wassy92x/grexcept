
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
new Exception(message: string, cause?: Error)

Exception.fromObject(ex: any): Error
// wrapps object inside a exception object if object is not already a exception or error

Exception.isError(ex: any): ex is Error
// returns true for objects which implement the error-shape
```

### AggregateException
Exception that will be thrown if multiple errors occurred.
```
import {AggregateException} from 'grexcept';
new AggregateException(innerExceptions: Error | Error[], message?: string)
new AggregateException(innerExceptions: Error | Error[])
```

### ArgumentException
Exception that will be thrown if a value is invalid.
```
import {ArgumentException} from 'grexcept';
new ArgumentException(argumentName: PropertyKey, message?: string, cause?: Error)
new ArgumentException(argumentName: PropertyKey, cause?: Error)
```

### ArgumentNullException
Exception that will be thrown if a value is null or undefined.
```
import {ArgumentNullException} from 'grexcept';
new ArgumentNullException(argumentName: PropertyKey, message?: string, cause?: Error)
new ArgumentNullException(argumentName: PropertyKey, cause?: Error)
```

### ArgumentOutOfRangeException
Exception that will be thrown if a value is out of a range.
```
import {ArgumentOutOfRangeException} from 'grexcept';
new ArgumentOutOfRangeException(argumentName: PropertyKey, actualValue: any, message?: string, cause?: Error)
new ArgumentOutOfRangeException(argumentName: PropertyKey, actualValue: any, cause?: Error)
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
new InvalidOperationException(message?: string, cause?: Error)
new InvalidOperationException(cause?: Error)
```

### InvalidFormatException
Exception that will be thrown if an object or string doesn't fulfill the excepted format.
```
import {InvalidFormatException} from 'grexcept';
new InvalidFormatException(message?: string, cause?: Error)
new InvalidFormatException(cause?: Error)
```

### IOException
Exception that will be thrown if an input or output error occurred.
```
import {IOException} from 'grexcept';
new IOException(message?: string, cause?: Error)
new IOException(cause?: Error)
```

### NotFoundException
Exception that will be thrown if some resource or entity was not found.
```
import {NotFoundException} from 'grexcept';
new NotFoundException(entity: string | (new (...args: any[]) => any), message?: string, cause?: Error)
new NotFoundException(entity: string | (new (...args: any[]) => any), cause?: Error)
```

### NotImplementedException
Exception that will be thrown if some method or operation is not implemented.
```
import {NotImplementedException} from 'grexcept';
new NotImplementedException(message?: string, cause?: Error)
new NotImplementedException(cause?: Error)
```

### NotPermittedException
Exception that will be thrown if the callee is not permitted to execute this method or operation.
```
import {NotPermittedException} from 'grexcept';
new NotPermittedException(message?: string, cause?: Error)
new NotPermittedException(cause?: Error)
```

### NotSupportedException
Exception that will be thrown if the called method or operation is not supported.
```
import {NotSupportedException} from 'grexcept';
new NotSupportedException(message?: string, cause?: Error)
new NotSupportedException(cause?: Error)
```

### ObjectDisposedException
Exception that will be thrown if an operation is invalid because the object is already disposed.
```
import {ObjectDisposedException} from 'grexcept';
new ObjectDisposedException(objectName: string, message?: string, cause?: Error)
new ObjectDisposedException(objectName: string, cause?: Error)
```

### OperationAbortedException
```
import {OperationAbortedException} from 'grexcept';
new OperationAbortedException(reason?: string, cause?: Error)
new OperationAbortedException(cause?: Error)
```

### TimeoutException
Exception that will be thrown if a timeout has been reached and an operation was canceled.
```
import {TimeoutException} from 'grexcept';
new TimeoutException(timeout: number, reason?: string, cause?: Error)
new TimeoutException(timeout: number, cause?: Error)
```

### ValidationException
Exception that will be thrown if a validation of some argument failed.
```
import {ValidationException} from 'grexcept';
new ValidationException(message?: string, cause?: Error)
new ValidationException(cause?: Error)
```
