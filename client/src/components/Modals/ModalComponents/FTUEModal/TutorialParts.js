/*---------------------------Part components-------------------------------*/

//Create Components for each page of the tutorial.
let PartOne = (
  <div>
    <h3>Create or Join a group by visiting the Manage Group Page.</h3>
    <img src={`/api/images/FTUE_S1_P1`} width={550} height={400}></img>
  </div>
);
let PartTwo = (
  <div>
    <h3>The Manage Group page can be reached using the navigation bar.</h3>
    <img src={`/api/images/FTUE_S1_P2`} width={550} height={400}></img>
  </div>
);
let PartThree = (
  <div>
    <h3>Select the Groups Tab.</h3>
    <img src={`/api/images/FTUE_S1_P3`} width={200} height={400}></img>
  </div>
);
let PartFour = (
  <div>
    <h3>Joining a Group.</h3>
    <h4>Join an existing group with a group name and passcode.</h4>
    <img src={`/api/images/FTUE_S2_P1`} width={650} height={375}></img>
  </div>
);
let PartFive = (
  <div>
    <h3>Create a Group (Part 1).</h3>
    <h4>First set the type of group.</h4>
    <img src={`/api/images/FTUE_S2_P2`} width={650} height={375}></img>
  </div>
);
let PartSix = (
  <div>
    <h3>Create a Group (Part 2).</h3>
    <h4>Then set the group name and passcode.</h4>
    <img src={`/api/images/FTUE_S2_P3`} width={550} height={375}></img>
  </div>
);
let PartSeven = (
  <div>
    <h3>Created Groups Settings (Part 1).</h3>
    <h4>You can access settings for your groups by clicking the gear icon.</h4>
    <img src={`/api/images/FTUE_S3_P1`} width={550} height={375}></img>
  </div>
);
let PartEight = (
  <div>
    <h3>Created Groups Settings (Part 2).</h3>
    <h4>
      Here you can change the passcode, view/kick members, and delete the group.
    </h4>
    <img src={`/api/images/FTUE_S3_P2`} width={450} height={375}></img>
  </div>
);
let PartNine = (
  <div>
    <h3>Unowned Groups</h3>
    <h4>You can leave groups by clicking the leave icon.</h4>
    <img src={`/api/images/FTUE_S3_P3`} width={550} height={375}></img>
  </div>
);
let PartTen = (
  <div>
    <h3>Dashboard (Part 1).</h3>
    <h4>
      On your dashboard, select a group from the list of groups you are in.
    </h4>
    <img src={`/api/images/FTUE_S4_P1`} width={500} height={375}></img>
  </div>
);
let PartEleven = (
  <div>
    <h3>Dashboard (Part 2).</h3>
    <h4>Once a group is selected, your items for that group will pop up.</h4>
    <img src={`/api/images/FTUE_S4_P2`} width={550} height={375}></img>
  </div>
);
let PartTwelve = (
  <div>
    <h3>Dashboard (Part 3).</h3>
    <h4>
      If you just joined/created a group, you can start adding items by clicking
      the add item card.
      <br />
      You will then see a pop up to add an item.
    </h4>
    <img src={`/api/images/FTUE_S4_P3`} width={550} height={350}></img>
  </div>
);
let PartThirteen = (
  <div>
    <h3>Dashboard (Part 4).</h3>
    <h4>
      You can edit any of your items by clicking on them on your dashboard.
      <br />
      You will see a similar pop up from when you added it originally.
    </h4>
    <img src={`/api/images/FTUE_S4_P4`} width={550} height={350}></img>
  </div>
);
let PartFourteen = (
  <div>
    <h3>Dashboard (Part 5).</h3>
    <h4>
      When a group is selected, the side bar allows you to see stats about your
      list, search for an item, and filter items by price range.
    </h4>
    <img src={`/api/images/FTUE_S4_P5`} width={200} height={350}></img>
  </div>
);
let PartFifteen = (
  <div>
    <h3>Group Members and Viewing Member Lists (Part 1).</h3>
    <h4>
      You can view all of the members in a group by clicking the group name
      link.
    </h4>
    <img src={`/api/images/FTUE_S5_P1`} width={550} height={350}></img>
  </div>
);
let PartSixteen = (
  <div>
    <h3>Group Members and Viewing Member Lists (Part 2).</h3>
    <h4>
      You are then taken to this page where you can view and click on members to
      see their items for that group.
    </h4>
    <img src={`/api/images/FTUE_S5_P2`} width={550} height={350}></img>
  </div>
);
let PartSeventeen = (
  <div>
    <h3>Group Members and Viewing Member Lists (Part 3).</h3>
    <h4>
      Once a member is clicked you will be taken to this page to see their items
      for that group.
    </h4>
    <img src={`/api/images/FTUE_S5_P3`} width={550} height={350}></img>
  </div>
);
let PartEighteen = (
  <div>
    <h3>Wedding/Birthday/Shower Lists.</h3>
    <h4>
      Weddings and other special events only contain groups of 1, and allow
      users to purchase items on their page.
      <br />
      Once an item is purchased, it will be set as unavailable to future
      visitors.
    </h4>
    <img src={`/api/images/FTUE_S5_P4`} width={550} height={350}></img>
  </div>
);

/*---------------------------Part Array-------------------------------*/
//Put each component into an array for navigation between components
export const PartArray = [
  PartOne,
  PartTwo,
  PartThree,
  PartFour,
  PartFive,
  PartSix,
  PartSeven,
  PartEight,
  PartNine,
  PartTen,
  PartEleven,
  PartTwelve,
  PartThirteen,
  PartFourteen,
  PartFifteen,
  PartSixteen,
  PartSeventeen,
  PartEighteen,
];
