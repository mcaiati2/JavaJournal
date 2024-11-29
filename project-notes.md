# Project 3 To-Do List:

# App Names:
  * JavaJournal
  * Cool Beans
  * Sip Society

# Data We're Capturing
  * User
  * Coffee Shop * ? Coffee Shop Location (api or field)
  * Coffee (Name, Type & Comments)
  * ? Rating  (coffee model)
  * ? Photo Upload (coffee model)
  **Shop = Pet**
  **Coffee = Post**

* Change placeholder name:
  - package.json (top level)
  - connection.ts (database name)
  - 

# Copilot Prompt:
"without changing any of my code, can you please add comments to each line explaining in great detail what that line is doing? please include comments for imports and exports. please write the comments to help a beginner programmer understand the code"

11/26
App working
Coffee Model complete (Coffee.ts)
Changed db

11/27
Mutations.ts completed
Context.d.ts not changed 
interfaces > index.d.ts


# Features We May Implement:
* drop down selection for flavor notes

# If we have errors:
ShopForm.tsx line 33 try catch (pet app had age)

# Debugging:

![alt text](image-1.png)

[GraphQL error]: Message: Variable "$shopId" of required type "ID!" was not provided., Location: [object Object], Path: undefined

- shopID variable, required by GET_COFFEES_FOR_SHOP query was not provided. Query is called without passing the necessary variable

    skip: !selectedShop









SOLVED:
[GraphQL error]: Message: Expected Iterable, but did not find one for field "Query.getUserShops"., Location: [object Object], Path: getUserShops
![commented out code](image.png) - this was in the example app, but wouldn't work without returning an empty array
