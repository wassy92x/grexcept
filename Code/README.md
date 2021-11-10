# GreXcept

This repository includes some common exception classes for JavaScript, written in TypeScript
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
new ArgumentException(argumentName: string, message?: string, innerException?: Error)
new ArgumentException(argumentName: string, innerException?: Error)
```

### ArgumentNullException
Exception that will be thrown if a value is null or undefined.
```
import {ArgumentNullException} from 'grexcept';
new ArgumentNullException(argumentName: string, message?: string, innerException?: Error)
new ArgumentNullException(argumentName: string, innerException?: Error)
```

### ArgumentOutOfRangeException
Exception that will be thrown if a value is out of a range.
```
import {ArgumentOutOfRangeException} from 'grexcept';
new ArgumentOutOfRangeException(argumentName: string, actualValue: any, message?: string, innerException?: Error)
new ArgumentOutOfRangeException(argumentName: string, actualValue: any, innerException?: Error)
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
new InvalidOperationException(innerException?: Error)
new InvalidOperationException(message?: string, innerException?: Error)
```

### InvalidFormatException
Exception that will be thrown if an object or string doesn't fulfill the excepted format.
```
import {InvalidFormatException} from 'grexcept';
new InvalidFormatException(argumentName: string, message?: string, innerException?: Error)
new InvalidFormatException(argumentName: string, innerException?: Error)
```

### IOException
Exception that will be thrown if an input or output error occurred.
```
import {IOException} from 'grexcept';
new IOException(innerException?: Error)
new IOException(message?: string, innerException?: Error)
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
new NotImplementedException(innerException?: Error)
new NotImplementedException(message?: string, innerException?: Error)
```

### NotPermittedException
Exception that will be thrown if the callee is not permitted to execute this method or operation.
```
import {NotPermittedException} from 'grexcept';
new NotPermittedException(innerException?: Error)
new NotPermittedException(message?: string, innerException?: Error)
```

### NotSupportedException
Exception that will be thrown if the called method or operation is not supported.
```
import {NotSupportedException} from 'grexcept';
new NotSupportedException(innerException?: Error)
new NotSupportedException(message?: string, innerException?: Error)
```

### TimeoutException
```
import {TimeoutException} from 'grexcept';
new TimeoutException(timeout: number, message?: string, innerException?: Error)
new TimeoutException(timeout: number, innerException?: Error)
```

### ValidationException
Exception that will be thrown if a validation of some argument failed.
```
import {ValidationException} from 'grexcept';
new ValidationException(argumentName: string, message?: string, innerException?: Error)
new ValidationException(argumentName: string, innerException?: Error)
```
