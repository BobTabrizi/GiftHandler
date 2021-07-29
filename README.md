# Gift Handler

## Gift Registry Web Application in Development.

Technologies: React.JS, Redux, Express, Node.JS, PostgreSQL, AWS S3/RDS/EC2, NGINX, PM2.


### Instructions & Current Functionality

You can check out the live alpha build hosted on AWS EC2 here: http://54.193.8.100.
An example page can be seen without logging in here: http://54.193.8.100/groups/8/event/users/1

**Note: Final styling will be added shortly. Currently testing functionality.**

Register and login to create or join a registry group. 

Currently there are two different types of groups: Secret Santa and Wedding/Shower/Birthday registries.

**Note: Wedding/Shower/Birthday registries have a user limit of 1.**

### Create or join groups with a group name and a passcode. 
* A user can manage the groups they own or they are currently in through the Manage Group page. 
* Within the Manage Group page, creators of groups can edit group passcodes, kick members of the group, and delete the group.
* Admins have the option to randomly assign partners within the group. Each member of the group will have their assigned partner displayed on their dashboard.

### Add Items to your wishlist
* Each group has its own dashboard page in which each user can add, edit, and delete their registry items for that particular group.
* Items currently have the following properties for users to enter in: Name, Image, Price, Quantity, and Purchase Link.
* Users can upload images for their items or paste in an amazon link and have an image automatically retrieved for them.

### View group members and their wishlists
* Each user can set a profile picture on their profile page, which is displayed when users view groups that they are part of. 
* Users can view group members of groups they are in by visiting the Manage Group page and selecting a group in the list of groups they are in. 
* Each member is displayed with a link to their registry page for that particular group.












