import "reflect-metadata";

const PARAM_METADATA_KEY = Symbol("param_metadata");
/* 
 Decorators:-
   - a function ( Higher Order Function ) that adds some extra functionality to another function
      - without changing the actual object/function
              - functions = objects

   - used with annotation

   - they are not yet supported natively in nodejs
   - Typescript features ( expermental )
   - also supported using bebal with plugin: babel/plugin-proposal-decorators



   - Types:-
      - Class
      - Method
      - Property
      - Method

*/


// class decorator
const ex1=()=>{

    function Logger(constructor: Function) {
        console.log(`Class ${constructor.name} was created.`);
    }
    
    @Logger
    class User {}


    //const user = new User()

}

// method
const ex2=()=>{
    function Log(target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            console.log(`Calling ${key} with arguments: ${JSON.stringify(args)} on target `, target);
            return originalMethod.apply(this, args);
        };
    
        return descriptor;
    }
    
    class UserService {
        @Log
        getUser(id: number) {
            return `User ${id}`;
        }
    }
    
    const service = new UserService();
    service.getUser(1); // Logs: Calling getUser with arguments: [1]
    
}


// property
const ex3=()=>{
    function ReadOnly(target: any, key: string) {
        Object.defineProperty(target, key, {
          writable: false,
        });
      }
      
      class AppConfig {
        @ReadOnly
        apiUrl = "https://api.example.com";
      }
      
      const config = new AppConfig();
      config.apiUrl = "new-url"; // Throws error in strict mode
}

// Parameter
const ex4=()=>{
    function ValidateParam(target: any, key: string, paramIndex: number) {
        console.log("validate", {target, key, paramIndex})
        // Logic to validate parameters
      }
      
      class AuthService {
        login(@ValidateParam username: string, password: string) {}
      }

      const authService = new AuthService()

      authService.login("user", "password")
}

const ex5=()=>{
    function QueryParam(paramName: string) {
        return function (target: Object, methodName: string, paramIndex: number) {
            const existingParams = Reflect.getMetadata("queryParams", target, methodName) || [];
            existingParams.push({ index: paramIndex, name: paramName });
            Reflect.defineMetadata("queryParams", existingParams, target, methodName);
        };
    }
    
    class UserController {
        getUser(@QueryParam("id") userId: string) {
            console.log(`Fetching user with ID: ${userId}`);
        }
    }
    
    // Simulating a request
    const controller = new UserController();
    controller.getUser("123"); // Logs: Fetching user with ID: 123
    
}

const start=()=>{
  ex5()
}
start()