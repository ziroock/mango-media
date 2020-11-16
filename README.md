# MANGO-MEDIA

## Project Intent & Functionality
### Intent
This project is created so I can further develop my web development skills.  
By using frameworks like React, Mongooese, Express and more. It is a great  
learning experience, because it gives me the opportunity to architect and  
then encode the envisioned feature.  
### Functionality
#### Invitations
   - Mongo Media (MM) provides an **invitations** property that allows users to    
   invite friends to join MM by email.    
   - To achieve this I used React Redux Form to create an input form and review.   
    The user can write down arbitrary amount of emails in CSV format. Then once  
    the review button gets clicked, a validation function checks the emails,   
    and given they have a valid format. The state of the input form gets preserved   
    and shown to the user on the review form. Once the user reviews their input,    
    they press send the invitations get sent.   
   - I used SendGrid API for their email services. Also, I used their webhook data   
   to monitor and record the total number of clicked invitations.
   - Each user has 3 trackers for the invitation:
        1. totalNumInvSent - Tracks the number of invitations sent by each user.    
        ( For now it counts faulty emails that are not received. **TODO: Fix this**)
        2. totalNumRegistered - Tracks the number of users that registered from an 
        invitation by the current user (the user that sent the invites)
        3. totalNumInvClicked - Tracks the number of users that opened the invitation    
        sent by the current user.
        
   - TODO: Need to think of away to carry invitationId and email, so I can make the
     invitation flow easier to count, so the user doesn't need to use the same email
     in which the invitation gets received.
     IMPORTANT: The to count a successful registration and avoid
     over counting the email entered needs to be the same email
     like the one in which the user received the invitation.
     
     
**TODO: Finish Section**

## How to run the project
### For the first time
1. Clone the project folder from the following repository:   
https://github.com/ziroock/mango-media.git
2. Make sure you have Node and NPM installed.
3. Run **npm install** inside the root folder to install the server side   
dependencies.
4. Run **npm install** inside the client folder to install the client side  
dependencies.
5. Create a file inside the *config* folder called *dev.js* with the following  
 content:  
 *module.exports = { mongoURI: 'mongoKey' }*  
 where the mongoKey is the key string to the data base you are going to be using.
6. To start the project inside the root folder run **npm run dev**.
7. To access the project type http://localhost:3000 in a new browser window.
8. To stop the server, and the client press **CTRL^C** twice inside terminal. 
 
### Once everything is set up
1. To start the project inside the root folder run **npm run dev**. 
2. To access the project type http://localhost:3000 in a new browser window.
3. To stop the server, and the client press **CTRL^C** twice inside terminal. 

## Future Changes & TODO List
###Future Changes
**TODO: Finish Section**
### TODO List
- Finish/Update README.md consistently   
- Access control on back end ( Created requireLogin check )
- Access control on front end
- Figure out how to store photos   
- Figure out how to let user change profile and cover photos   
- (DONE) Add the ability for users to send out invitations for people to join the site
- (DONE) Add the ability for users to track invitations sent and invitations accepted

## Versions used to implement the project
- Node v12.18.0
- NPM v6.14.4

## Time Spent
**TODO: Finish Section**

