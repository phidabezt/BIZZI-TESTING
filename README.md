# BIZZI-TESITING
for intership interview

Use test.js to test

Problem 1:

Logic: 
+ First I take out all the brackets in the given input
+ I then check if the length of new input (with brackets only) is 0, if it is then return NO WORRIES
+ In the core function (isMatched), I use stack for my solution. The idea is simple, I first have a string with given brackets (opening brackets will be in the even indexes
and closing brackets will be in the odd indexes). Then loop through the new input...
  - If the current bracket's index is even, which means that we encounter an opening one, I push a corresponding closing bracket in the stack. 
  - If the current bracket's index is odd, which means that we encounter an closing one, I pop an element out of the stack, compare to the current bracket. If they aren't matched,
  then return UNMATCHED
  - If the loop end and the stack's length is 0, then return ALL-MATCHING. If not, return UNMATCHED

Performance:
+ Let the initial input's length is N and the alternative input's length is M.
+ I first loop through the initial input => O(N)
+ I then loop throungh the alternative input => O(M)

=> Current complexity: O(N + M)
+ Inside the second loop, there is "brackets" (a string store give brackets) that we have to check everytime we hit a bracket. But this is a constant length, and it's small => Doesn't matter that much
+ There is stack, which in my opinion is restricted array. And an array has O(1) complexity to access an element in it, and the fact all we do is just add new element, then pop the lasted one => This one too, doesn't matter that much

=> Final time complexity: O(N + M) 


Problem 2:

The main idea: Stream - An approach that has us consume data without being fully loaded. This will seperate the data into chunks, then process it chunk by chunk.

+ Stream has a method call Pipping, which connnect multiple streams. Here I have JSONStream parser for turning JSON file in to JS Object in streaming way. Pipe will be the connection between streamming reader and streamming parser.
+ To manipulate those chunk of data, I use function. But if I just call a normal function, it will not receive all of the chunks of data. I call mapSync to create a through stream from this asynchronous function. Which has it know that it's a part a streaming process. And inside this function, I just need to call the value of age to work with the problem.






