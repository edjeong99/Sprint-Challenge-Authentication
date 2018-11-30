<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   to keep info about user so user doesn't have to login for every request.
   persist authentication information across requests

2. What does bcrypt do to help us store passwords in a secure manner.
   it hash the password so even it's exposed, it can not be recognized easily

3. What does bcrypt do to slow down attackers?
   it hashes the password multiple times, so even attacker can find the password, it will take a long time/huge resource

4. What are the three parts of the JSON Web Token?

- header, payload, signature
