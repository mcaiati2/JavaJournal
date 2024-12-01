# Project 3 Info:

## App Names:
  * JavaJournal
  * Cool Beans
  * Sip Society

## Conversion
  **Shop = Pet**
  **Coffee = Post**
  **Age = Rating**
  **Type = Location**

## To-Do
  * Adjust testing files
  * Rating conversion to float
  * Match optional with not optional in the typedefs/resolvers/queries/mutations/etc

## Features Ideas/Backlog
  * Drop-down selection for flavor notes
  * Star rating instead of field (coffee cup empty vs full)
  * Google API Location Field
  * Retype password for validation creation
  * Prevent duplicate shops
  * Auto capitalize inputs for consistency
  * Option to add logo for shop
  * ? Shop Image Logo (also add to Modal) - Coffee Object / Shop Object ?
  !['brewing info/find your roast'](image.png)


# Data We're Capturing
  * User Model
    * Username
    * Email
    * Password

  * Shop Model
   * Name
   * Rating
   * Location (api or field)
   * Associated Coffees

  * Coffee Model
    * Name
    * Flavor
    * Associated Shop
    * Comments
    * Photo Upload

## Log
11/26
App working
Coffee Model complete (Coffee.ts)
Changed db

11/27
Mutations.ts completed
Context.d.ts not changed 
interfaces > index.d.ts

## Debugging:

## Copilot Prompt:
"without changing any of my code, can you please add comments to each line explaining in great detail what that line is doing? please include comments for imports and exports. please write the comments to help a beginner programmer understand the code"