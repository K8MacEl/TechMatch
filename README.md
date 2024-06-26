# Tech Match




Tech Match is a program that allows programmers and project makers to connect and post projects for hire. 


## Launch App and Getting Started



To view the Trello Board with the Project's Planning: https://trello.com/invite/b/sQMWW3vl/ATTI780da2363039fbd66fdf05f41f4cb7cfD0EF2EFB/sei-project-two-tech-match


<a href="https://imgur.com/2GX6N23"><img src="https://i.imgur.com/2GX6N23l.png" title="source: imgur.com" /></a>




## Technologies Used


This project uses Express, Node.js, and MongoDB as well as OAuth Middleware for the login requirements. Additionally, CSS and HTML were used for content.


This project is s CRUD project, the user may CREATE a profile as well as many projects, the user may READ profiles and projects, the user may UPDATE projects, and the user may DELETE their profile.




### Getting Started


<a href="https://imgur.com/jKCDpbj"><img src="https://i.imgur.com/jKCDpbjl.png" title="source: imgur.com" /></a>


In order to view any of the information the user is prompted to log in using a Google Authenticator. This protects the information of the users posting information and also encourages more authentic use of the app. By using a Google Authenticator rather than storing an email and password in the database ensures better security.


<a href="https://imgur.com/l4ogacC"><img src="https://i.imgur.com/l4ogacCl.png" title="source: imgur.com" /></a>


### Tech Match Concept
In the world of programming and project management we all find ourselves on one end of the below diagram, we have skills to build projects or projects to build. Often those two groups do not match up, until Tech Match!
<a href="https://imgur.com/SeunRy6"><img src="https://i.imgur.com/SeunRy6l.png" title="source: imgur.com" /></a>


### Basic User Experience


Once the user logs in for the first time, they will see their basic information which is pulled from Google. Then the user may create a customer profile and select if they would like to be a client or a programmer. They may also provide basic information and a link to either a GitHub or a website.


Then they may create and view projects. The projects have budgets and programming/skills assigned to them to allow for the user to find projects within their scope. The user may also view start dates and deadlines for projects.


The user of the project may edit the project if the needs change along the way. There is a many to one relationship as a user can have many projects. Additionally, there is one to one relationship with the user to the client profile as it's restricted to one profile per user. If a user tries to create a second profile with the same Google account, they will be redirected back to their profile. They may delete that profile and then create a new one if they wish.


The user may also view other profiles and connect with those users.


<a href="https://imgur.com/i6RizUr"><img src="https://i.imgur.com/i6RizUrl.png" title="source: imgur.com" /></a>


## IceBox Items/Next Steps


Embedding the projects within the user profiles.
Creating a review feature for users to review others.
Searching capabilities with filter options to find projects within set filters.
